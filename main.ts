import { serve } from "https://raw.githubusercontent.com/alephjs/aleph.js/main/server/mod.ts";
import { instantiate } from "./assets/deno.generated.js";
import presetUno from "https://esm.sh/@unocss/preset-uno@0.47.4";

import * as uno from "https://esm.sh/@unocss/core@0.47.4";
Reflect.set(globalThis, "UNOCSS_CORE", uno);

const { main } = await instantiate();

serve({
  unocss: {
    test: /\.rs$/,
    presets: [presetUno()] 
  },
  baseUrl: import.meta.url,
  middlewares: [
    {
      name: "Leptos",
      fetch(req, ctx) {
        const pathname = new URL(req.url).pathname;
        if (pathname.startsWith("/assets")) return ctx.next();
        return main(req);
      },
    },
  ],
});
