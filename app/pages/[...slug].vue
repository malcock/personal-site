<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const parts = route.params.slug || [];
const path = parts.filter(Boolean).join('/') || 'home';

// Role stories feed the record timeline; they are not pages.
if (path.startsWith('record/')) {
	throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true });
}

const api = {
	version: config.public.sbVersion,
	resolve_relations: RESOLVE_RELATIONS,
	resolve_links: 'url',
};

let story;
try {
	({ story } = await useAsyncStoryblok(path, { api, bridge: { resolveRelations: RESOLVE_RELATIONS } }));
} catch {
	story = ref(null);
}

// Folder start pages (writing/, lab/) are requested by folder path.
if (!story.value && !path.endsWith('/') && path !== 'home') {
	try {
		({ story } = await useAsyncStoryblok(`${path}/`, { api, bridge: { resolveRelations: RESOLVE_RELATIONS } }));
	} catch {
		story = ref(null);
	}
}

if (!story.value) {
	throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true });
}

const content = computed(() => story.value?.content ?? {});
const title = computed(() => {
	const c = content.value;
	const own = c.seo_title || c.title;
	if (path === 'home') return own || 'Martin Alcock';
	return `${own || story.value?.name} · Martin Alcock`;
});
const description = computed(
	() => content.value.seo_description || content.value.summary || content.value.intro || '',
);

useSeoMeta({
	title,
	description,
	ogTitle: title,
	ogDescription: description,
	ogType: path === 'home' ? 'website' : 'article',
	ogUrl: `${config.public.siteUrl}${storyPath(story.value) ?? '/'}`,
	twitterCard: 'summary',
});
useHead({ link: [{ rel: 'canonical', href: `${config.public.siteUrl}${storyPath(story.value) ?? '/'}` }] });
</script>

<template>
	<StoryblokComponent v-if="story" :blok="story.content" :story="story" />
</template>
