import { createRequestHandler } from "@remix-run/netlify";

export const handler = createRequestHandler({
	getLoadContext() {
		// This is where you can provide any additional context to your loaders.
	},
});
