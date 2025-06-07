import { serveDir } from "@std/http/file-server";
import * as esbuild from "esbuild";
import { jsToTsBuildStep } from "./build.ts";

async function handler(_req: Request): Promise<Response> {
  await jsToTsBuildStep();
  await esbuild.stop();

  const ENV_HOME = Deno.env.get("HOME");
  console.log("ENV_HOME", ENV_HOME);

  return serveDir(_req, {
    fsRoot: `${ENV_HOME}/Documents/Workspace/Learning-JS-TS/JavaScript-Crash-Course/3_Projects/Project_3_Data_Visualization/15_Visualizing_Search_From_Github_API/`,
  });
}

Deno.serve({ port: 1236 }, handler);
