/** Display names for the "disciplines" datasource, keyed by value. */
export function useDisciplines() {
  const api = useStoryblokApi();
  const config = useRuntimeConfig();
  const { data } = useAsyncData(
    "datasource:disciplines",
    async () => {
      const res = await api.get("cdn/datasource_entries", {
        datasource: "disciplines",
        per_page: 100,
        version: config.public.sbVersion,
      } as Record<string, unknown>);
      const map: Record<string, string> = {};
      for (const e of res.data.datasource_entries as { name: string; value: string }[]) map[e.value] = e.name;
      return map;
    },
    { default: () => ({}) as Record<string, string> },
  );
  return (value: string) => data.value?.[value] ?? value.replace(/-/g, " ");
}
