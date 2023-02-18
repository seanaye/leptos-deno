import { serve } from "https://deno.land/std/http/server.ts"
import { serveDir } from "https://deno.land/std/http/file_server.ts";
import { decompress } from "https://deno.land/x/lz4/mod.ts"
import { instantiate } from "./lib/deno.generated.js"

const { main } = await instantiate({ decompress })

serve((req) => {
  const pathname = new URL(req.url).pathname
  if (pathname.startsWith("/lib/client")) {
    return serveDir(req)
  }
  return main(req)
})
