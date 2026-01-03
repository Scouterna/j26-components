import { globSync } from "glob";
import StyleDictionary from "style-dictionary";
import { fixBaseValues } from "./fix-base-values.mjs";
import { fixCalc } from "./fix-calc.mjs";
import { fixType } from "./fix-type.mjs";

const source = globSync("./tokens/**/*.json", {
  ignore: ["**/**/$*.json", "Misc.json"],
});

const sd = new StyleDictionary({
  source,
  log: {
    verbosity: "verbose",
  },
  platforms: {
    css: {
      transformGroup: "css",
      options: {
        formatting: {
          commentPosition: "above",
        },
      },
      files: [
        {
          format: "css/variables",
          destination: "dist/tokens.css",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    javascript: {
      transformGroup: "js",
      files: [
        {
          format: "javascript/esm",
          destination: "dist/tokens.js",
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();

await fixBaseValues("./dist/tokens.css");
await fixCalc("./dist/tokens.css");
await fixType("./dist/tokens.css", "./dist/tokens.js");
