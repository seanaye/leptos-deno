
const url = new URL("./assets/client.generated.js", import.meta.url);
const text = await Deno.readTextFile(url)
const next = text.replace(/import \{ microtask(.*?);/g, "function microtask(f) { queueMicrotask(f) };")
await Deno.writeTextFile(url, next);

