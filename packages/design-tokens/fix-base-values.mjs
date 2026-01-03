import { readFile, writeFile } from "node:fs/promises";

/**
 * Fixes CSS variable definitions that use arithmetic without `calc()`.
 */
export async function fixBaseValues(cssPath) {
  const content = await readFile(cssPath, "utf-8");

  const fixedContent = content
    .replaceAll(/--fontsize-base: .*;/g, "--fontsize-base: 1rem;")
    .replaceAll(/--spacing-base: .*;/g, "--spacing-base: 0.25rem;");

  await writeFile(cssPath, fixedContent);
}
