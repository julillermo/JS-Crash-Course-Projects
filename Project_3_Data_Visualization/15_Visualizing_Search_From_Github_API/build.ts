import * as esbuild from "esbuild";

export async function jsToTsBuildStep() {
  await esbuild.build({
    entryPoints: ["./script.ts"],
    bundle: true,
    outdir: "js",
    minify: true,
  });

  // NOTE: the esbuild documentation recommends using await esbuild.stop()
  //  right after the command when running esbuild in Deno
  // Call this everytime the jsToTsBuildStep gets called in different parts
  //  of the code base
}

await jsToTsBuildStep();
await esbuild.stop();
