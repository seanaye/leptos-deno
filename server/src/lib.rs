use std::sync::RwLock;

use app::*;
use futures::{Stream, StreamExt};
use futures_util::TryStreamExt;
use gloo_net::http;
use js_sys::Uint8Array;
use leptos::{ssr::render_to_stream_with_prefix_undisposed_with_context, *};
use leptos_meta::*;
use wasm_bindgen::prelude::*;

async fn build_stream_response(
    app_stream: impl Stream<Item = String> + 'static,
    runtime: RuntimeId,
    scope: ScopeId,
) -> Result<web_sys::Response, JsError> {
    let pkg_path = "/assets/client";
    let head = format!(
        r#"<!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <meta charset="utf-8"/>
                            <meta name="viewport" content="width=device-width, initial-scale=1"/>
                            <link rel="modulepreload" href="{pkg_path}.generated.js">
                            <link rel="preload" href="{pkg_path}_bg.wasm" as="fetch" type="application/wasm" crossorigin="">
                            <script type="module">
                                import {{ instantiate }} from "{pkg_path}.generated.js"; 
                                const {{ hydrate }} = await instantiate(); 
                                hydrate();
                            </script>
                        </head>
                        <body>"#
    );

    let tail = "</body></html>";

    let stream = futures::stream::once(async move { head.clone() })
        .chain(app_stream)
        .chain(futures::stream::once(async move {
            runtime.dispose();
            tail.to_string()
        }))
        .inspect(|html| gloo_console::log!("{}", html))
        .map(|html| Result::Ok(html.into_bytes()))
        .map_ok(|chunk| {
            let array = Uint8Array::new_with_length(chunk.len() as _);
            array.copy_from(&chunk);

            array.into()
        });

    // Get the first and second in the stream, which renders the app shell, and thus allows Resources to run
    // let first_chunk = stream.next().await;
    // let second_chunk = stream.next().await;

    // let complete_stream =
    //     futures::stream::iter([first_chunk.unwrap(), second_chunk.unwrap()]).chain(stream);

    let js_stream: web_sys::ReadableStream = wasm_streams::ReadableStream::from_stream(stream)
        .into_raw()
        .unchecked_into();

    http::Response::builder()
        .header("Content-Type", "text/html")
        .body(Some(http::ResponseBody::Stream(js_stream)))
        .map_err(|e| JsError::new(e.to_string().as_str()))
        .map(web_sys::Response::from)
}

#[wasm_bindgen]
pub async fn main(req: web_sys::Request) -> Result<web_sys::Response, JsError> {
    console_error_panic_hook::set_once();
    type Result<T> = std::result::Result<T, JsValue>;

    let local = tokio::task::LocalSet::new();

    local
        .run_until(async move {
            tokio::task::spawn_local(async move {
                let (stream, runtime, scope) = render_to_stream_with_prefix_undisposed_with_context(
                    |cx| view! {cx, <App/>}.into_view(cx),
                    move |cx| generate_head_metadata(cx).into(),
                    |_cx| {},
                );
                build_stream_response(stream, runtime, scope).await
            })
            .await
            .expect("an error occurred")
        })
        .await
}
