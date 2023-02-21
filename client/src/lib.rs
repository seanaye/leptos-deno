use app::*;
use leptos::*;

use wasm_bindgen::prelude::*;
use web_sys::console;

#[wasm_bindgen]
pub fn hydrate() {
    console_error_panic_hook::set_once();
    _ = console_log::init_with_level(log::Level::Debug);
    // Verify wasm hydrate binding was called on the client
    console::log_1(&"Preparing to mount client...".into());

    mount_to_body(|cx| {
        view! { cx,  <App /> }
    });
}
