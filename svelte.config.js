import sveltePreprocess from 'svelte-preprocess'
import presetEnv from 'postcss-preset-env'

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess({
    postcss: {
      plugins: [presetEnv({ stage: 0 })],
    },
  }),
}
