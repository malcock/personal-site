/**
 * Storyblok blok names are snake_case (case_list); Nuxt registers components as PascalCase (CaseList).
 * StoryblokComponent renders the kebab-case form correctly but first checks the raw name and logs a
 * false "could not be found" error. Registering snake_case aliases silences that check.
 */
export default defineNuxtPlugin({
  name: "storyblok-aliases",
  enforce: "post",
  setup({ vueApp }) {
    const registry = vueApp._context.components;
    for (const [name, component] of Object.entries(registry)) {
      if (!/^[A-Z][a-z0-9]+[A-Z]/.test(name) || name.startsWith("Lazy")) continue;
      const snake = name.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
      if (!registry[snake]) vueApp.component(snake, component);
    }
  },
});
