use leptos::*;

mod components;

pub use components::*;

#[component]
pub fn App(cx: Scope) -> impl IntoView {
    view! { cx,
        <div>
        <Counter initial_value=1 step=1 />
        <Article />
        </div>
    }
}
