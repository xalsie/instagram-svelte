import { error } from "@sveltejs/kit";
import { resolve } from "node:path";
import { readdir } from "node:fs/promises";

/** @type {import('./$types').PageLoad} */
export async function load() {
  try {
    const dir = await readdir(resolve("./static/img"));
    return {
      images: dir
    };
  } catch (e) {
    throw error(404, "Not found");
  }
}
