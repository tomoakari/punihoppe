import adapter from '@sveltejs/adapter-auto'; // デフォルト
// import adapter from '@sveltejs/adapter-node'; // node.jsを追加
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			"$components": "src/lib/components",
			"$components/*": "src/lib/components",
			"$util": "src/lib/util",
			"$util/*": "src/lib/util",
			"$server": "src/lib/server",
			"$server/*": "src/lib/server",
			"$stores": "src/stores/",
			"$stores/*": "src/stores"
		},
	}
};

export default config;
