<script setup>
const props = defineProps({ blok: Object });
const api = useStoryblokApi();
const config = useRuntimeConfig();
const route = useRoute();
const folder = computed(() => props.blok.source || 'writing');
const count = computed(() => Number(props.blok.count) || 3);
const onFolderPage = computed(() => route.path.replace(/\/$/, '') === `/${folder.value}`);

const { data: items } = await useAsyncData(
	`feed:${folder.value}:${count.value}`,
	async () => {
		const res = await api.get('cdn/stories', {
			starts_with: `${folder.value}/`,
			is_startpage: false,
			sort_by: 'content.date:desc',
			per_page: count.value,
			version: config.public.sbVersion,
		});
		return res.data.stories.map((s) => ({
			uuid: s.uuid,
			path: storyPath(s),
			title: s.content.title || s.name,
			date: s.content.date,
			intro: s.content.intro,
			status: s.content.status,
		}));
	},
	{ default: () => [] },
);
</script>

<template>
	<section v-editable="blok" class="sec wrap" :id="blok.anchor || undefined">
		<SectionHead :label="blok.label" :heading="blok.heading" />
		<ol v-if="items.length" class="feed">
			<li v-for="it in items" :key="it.uuid" class="feed__item">
				<time class="label" :datetime="it.date?.slice(0, 10)">{{ formatDate(it.date) }}</time>
				<div class="feed__main">
					<h3 class="feed__title display">
						<NuxtLink :to="it.path">{{ it.title }}</NuxtLink>
					</h3>
					<p v-if="it.intro" class="feed__intro">{{ it.intro }}</p>
				</div>
				<span v-if="it.status === 'wip'" class="chip feed__status">In progress</span>
			</li>
		</ol>
		<p v-else class="feed__empty">{{ blok.empty_text || 'Nothing here yet.' }}</p>
		<p v-if="blok.more_label && !onFolderPage" class="feed__more">
			<NuxtLink :to="`/${folder}`" class="chip">{{ blok.more_label }} →</NuxtLink>
		</p>
	</section>
</template>

<style scoped>
.feed {
	list-style: none;
	margin: 0;
	padding: 0;
	border-top: 3px solid var(--ink);
}
.feed__item {
	display: grid;
	grid-template-columns: 140px minmax(0, 1fr) auto;
	gap: 8px 24px;
	align-items: baseline;
	padding-block: 18px;
	border-bottom: 1px solid var(--rule);
}
.feed__main {
	display: grid;
	gap: 6px;
}
.feed__title {
	font-size: var(--step-2);
	font-stretch: 60%;
	text-transform: uppercase;
}
.feed__title a {
	text-decoration: none;
}
.feed__title a:hover {
	color: var(--red-ink);
}
.feed__intro {
	max-width: var(--measure);
	color: var(--ink-2);
}
.feed__empty {
	color: var(--ink-2);
	border-top: 3px solid var(--ink);
	padding-top: 16px;
}
.feed__more {
	margin-top: 20px;
}
@media (max-width: 640px) {
	.feed__item {
		grid-template-columns: 1fr;
	}
}
</style>
