import { serve } from "https://raw.githubusercontent.com/alephjs/aleph.js/main/server/mod.ts";
import { instantiate } from "./assets/deno.generated.js";
import presetUno from "https://esm.sh/@unocss/preset-uno@0.47.4";
import { decompress } from "https://deno.land/x/lz4@v0.1.2/mod.ts";
import * as uno from "https://esm.sh/@unocss/core@0.47.4";
Reflect.set(globalThis, "UNOCSS_CORE", uno);

const { main } = await instantiate({ decompress });

serve({
  unocss: {
    test: /\.rs$/,
    presets: [presetUno()],
  },
  ssr(ctx) {
    console.log(ctx.routing, ctx.headCollection);
    return main(ctx.url.toString());
  },
  baseUrl: import.meta.url,
  middlewares: [
    {
      name: "Decompress Wasm",
      async fetch(req, ctx) {
        const pathname = new URL(req.url).pathname;
        const next = await ctx.next();
        if (!pathname.startsWith("/assets")) return next;
        if (next.headers.get("Content-Type") !== "application/wasm") {
          console.log(next)
          return next;
        }
        // this may seem counter intuitive
        // but it is gzip compressed again by deploy
        // this allows us to reduce disk space used in GH and deploy
        // while also avoiding runtime decompresssion on client
        const decompressed = decompress(
          new Uint8Array(await next.arrayBuffer()),
        );
        return new Response(decompressed, {
          headers: next.headers,
        });
      },
    },
  ],
});
