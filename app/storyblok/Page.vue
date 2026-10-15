<script setup>
const props = defineProps({ blok: Object, story: Object });
const isHome = computed(() => props.story?.full_slug === 'home');
const opensWithHero = computed(() => props.blok?.body?.[0]?.component === 'hero_statement');
</script>

<template>
	<main v-editable="blok" :class="{ home: isHome }">
		<header v-if="!opensWithHero" class="wrap page-title">
			<span class="page-title__bar" aria-hidden="true"></span>
			<h1 class="display">{{ story?.name }}</h1>
			<p v-if="blok.seo_description" class="page-title__lede">{{ blok.seo_description }}</p>
		</header>
		<StoryblokComponent v-for="b in blok.body" :key="b._uid" :blok="b" />
	</main>
</template>

<style scoped>
.page-title {
	position: relative;
	padding-block: clamp(56px, 8vw, 104px) 0;
	display: grid;
	gap: 16px;
	isolation: isolate;
}
.page-title h1 {
	font-size: var(--step-4);
}
.page-title__lede {
	font-size: var(--step-1);
	max-width: 52ch;
}
.page-title__bar {
	position: absolute;
	left: calc(var(--gutter) - 40px);
	top: clamp(96px, 11vw, 150px);
	width: min(60%, 520px);
	height: clamp(28px, 4vw, 52px);
	background: var(--red);
	transform: rotate(-6deg);
	transform-origin: left;
	z-index: -1;
}
</style>
