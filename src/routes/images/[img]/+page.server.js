import { resolve } from "node:path";
import { readdir } from "node:fs/promises";

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const imgs = await readdir(resolve("./static/img"));

  return {
    imgs
  };
}
