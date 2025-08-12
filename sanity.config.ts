import { defineConfig } from "sanity";
import { schemaTypes } from "./src/app/sanity/schemas";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

const config = defineConfig({
	projectId: "8n1tzft0",

	name: "default",

	dataset: "production",

	title: "public-speaker-website",

	apiVersion: "2025-08-07",

	basePath: "/admin",

	plugins: [structureTool(), visionTool()],

	schema: {
		types: schemaTypes,
	},
});

export default config;
