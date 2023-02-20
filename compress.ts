// script to compress the generated .wasm files
import { compress } from "https://deno.land/x/lz4/mod.ts"
import { expandGlob } from "https://deno.land/std@0.175.0/fs/expand_glob.ts";

for await (const { path } of expandGlob(new URL("assets/**.wasm", import.meta.url))) {
  const data = await Deno.readFile(path)
  const originalSize = data.byteLength
  const tempFile = await Deno.makeTempFile()
  const compressed = compress(data)
  const compressedSize = compressed.byteLength
  await Deno.writeFile(tempFile, compressed)
  await Deno.rename(tempFile, path)
  console.log(`Compressed ${path} from ${originalSize}B to ${compressedSize}B`)
}
