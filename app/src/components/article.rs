use leptos::*;


pub async fn fetch_api(cx: Scope, path: &str) -> Option<String> {
    let abort_controller = web_sys::AbortController::new().ok();
    // let abort_signal = abort_controller.as_ref().map(|a| a.signal());
    gloo_console::log!("inside fetch call");

    let res = gloo_net::http::Request::get(path)
        // .abort_signal(abort_signal.as_ref())
        .send()
        .await;

    gloo_console::log!("after request");

    let json = res
        .ok()?
        .text()
        .await
        .ok()?;
    gloo_console::log!("after fetch call {json:?}");

    // abort in-flight requests if the Scope is disposed
    // i.e., if we've navigated away from this page
    leptos::on_cleanup(cx, move || {
        if let Some(abort_controller) = abort_controller {
            abort_controller.abort()
        }
    });

    Some(json)
}



#[component]
pub fn Article(cx: Scope) -> impl IntoView {
    println!("got here");
    let resource = create_resource(cx, move || {}, move |_| async move {
        fetch_api(cx, "https://api.sampleapis.com/futurama/info").await
    });


    view! { cx,
        <Suspense fallback=move|| view!{cx, <div>"Loading"</div>}>
            <div>
                {
                    move || resource.read(cx).map(|strs|
                        strs.iter()
                            .map(|s| view!{ cx, 
                                <p key={s}>{s}</p>}
                            )
                            .collect::<Vec<_>>()
                    )
                }
            </div>
        </Suspense>
    }
}
