import { defineConfig } from "tsup";

export default defineConfig({
	clean: true,
	dts: true,
	entry: ["src/**/*.ts", "!src/**/*.test.*"],
	format: ["cjs", "esm"],
	outDir: "dist",
	sourcemap: true,
});
