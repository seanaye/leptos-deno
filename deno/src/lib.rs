use app::*;
use futures::StreamExt;
use futures_util::TryStreamExt;
use js_sys::Uint8Array;
use leptos::{ssr::render_to_stream, *};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub async fn main(_url: String) -> Result<web_sys::ReadableStream, JsError> {
    type Result<T> = std::result::Result<T, JsValue>;

    let stream = render_to_stream(|cx| view! { cx, <App /> }.into_view(cx))
        .inspect(|html| println!("{html}"))
        .map(|html| Result::Ok(html.into_bytes()))
        .map_ok(|chunk| {
            let array = Uint8Array::new_with_length(chunk.len() as _);
            array.copy_from(&chunk);

            array.into()
        });

    Ok(wasm_streams::ReadableStream::from_stream(stream)
        .into_raw()
        .unchecked_into())
}
