use leptos::*;
use web_sys::console;


/// A simple counter component.
///
/// You can use doc comments like this to document your component.
#[component]
pub fn Counter(
    cx: Scope,
    /// The starting value for the counter
    initial_value: i32,
    /// The change that should be applied each time the button is clicked.
    step: i32,
) -> impl IntoView {
    gloo_console::log!("test");

    let (value, set_value) = create_signal(cx, initial_value);

    let resource2 = create_resource(cx, move || {}, move |_| async move {
        let s = 5000u32;
        gloo_timers::future::TimeoutFuture::new(s).await;
        format!("waited {s} seconds")
        // "test".to_string()
    });

    view! { cx,
        <div>
            <button on:click=move |_| set_value(0)>"Clear"</button>
            <br /><button on:click=move |_| set_value.update(|value| {
                *value -= step;
                console::log_2(&"Dec".into(), &value.to_string().into());
            })>"-"{step}</button>
            <br /><span>"Value Direct: [" {value} "]"</span>
            <br /><button on:click=move |_| set_value.update(|value| {
                *value += step;
                console::log_2(&"Inc".into(), &value.to_string().into());
            })>"+"{step}</button>
            <Suspense fallback=move || view!{cx, <div>"Loading the resource"</div>}>
                {
                    move || resource2.read(cx)
                }
            </Suspense>
        </div>
    }
}
