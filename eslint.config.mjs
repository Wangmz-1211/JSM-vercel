// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

const eslintConfig = [
  {
    ignores: [".next/", "node_modules/", ".trunk/", "next.config.js", "postcss.config.js"],
  },
  js.configs.recommended,
  // ...compat.extends("next/core-web-vitals"), // Disabled due to circular dependency in ESLint 9/Next 16
];

export default eslintConfig;