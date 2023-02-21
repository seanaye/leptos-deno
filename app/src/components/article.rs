use leptos::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, PartialEq, Eq, Clone)]
pub struct Story {
    pub id: usize,
    pub title: String,
    pub points: Option<i32>,
    pub user: Option<String>,
    pub time: usize,
    pub time_ago: String,
    #[serde(alias = "type")]
    pub story_type: String,
    pub url: String,
    #[serde(default)]
    pub domain: String,
    #[serde(default)]
    pub comments: Option<Vec<Comment>>,
    pub comments_count: Option<usize>,
}

#[derive(Debug, Deserialize, Serialize, PartialEq, Eq, Clone)]
pub struct Comment {
    pub id: usize,
    pub level: usize,
    pub user: Option<String>,
    pub time: usize,
    pub time_ago: String,
    pub content: Option<String>,
    pub comments: Vec<Comment>,
}

pub async fn fetch_api<T>(cx: Scope, path: &str) -> Option<T>
where
    T: Serializable,
{
    let abort_controller = web_sys::AbortController::new().ok();
    let abort_signal = abort_controller.as_ref().map(|a| a.signal());
    gloo_console::log!("inside fetch call");

    let json = gloo_net::http::Request::get(path)
        .abort_signal(abort_signal.as_ref())
        .send()
        .await
        .map_err(|e| gloo_console::log!("{e:?}"))
        .map(|v| {
            gloo_console::log!("{v:?}", v.status());
            v
        })
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
    T::from_json(&json).ok()
}

pub fn story(path: &str) -> String {
    format!("https://node-hnapi.herokuapp.com/{path}")
}

async fn get(_: ()) -> Vec<String> {
    vec!["text".to_owned()]
}

#[component]
pub fn Article(cx: Scope) -> impl IntoView {
    println!("got here");
    let resource = create_resource(cx, move || {}, get);

    view! { cx,
        <div>
            {
                move || resource.read(cx).map(|strs|
                    strs.iter()
                        .map(|s| view!{ cx, <p>{s}</p>})
                        .collect::<Vec<_>>()
                )
            }
        </div>
    }
}
