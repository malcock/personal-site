<script setup>
defineProps({ blok: Object, story: Object });
</script>

<template>
	<main v-editable="blok" class="wrap post">
		<p class="post__back"><NuxtLink to="/writing" class="label">← Writing</NuxtLink></p>
		<header class="post__head">
			<span class="post__bar" aria-hidden="true"></span>
			<time class="label" :datetime="blok.date?.slice(0, 10)">{{ formatDate(blok.date) }}</time>
			<h1 class="post__title display">{{ blok.title || story?.name }}</h1>
			<p v-if="blok.intro" class="post__intro">{{ blok.intro }}</p>
			<ul v-if="story?.tag_list?.length" class="chips">
				<li v-for="t in story.tag_list" :key="t" class="chip">{{ t }}</li>
			</ul>
		</header>
		<div v-if="blok.body" class="prose post__body"><StoryblokRichText :doc="blok.body" /></div>
	</main>
</template>

<style scoped>
.post {
	padding-top: clamp(32px, 5vw, 64px);
}
.post__back a {
	text-decoration: none;
}
.post__head {
	position: relative;
	isolation: isolate;
	display: grid;
	gap: 16px;
	padding-block: clamp(40px, 6vw, 72px) clamp(28px, 4vw, 48px);
	border-bottom: 3px solid var(--ink);
	margin-bottom: clamp(32px, 4vw, 48px);
}
.post__bar {
	position: absolute;
	z-index: -1;
	left: calc(-1 * var(--gutter) - 30px);
	top: clamp(70px, 9vw, 120px);
	width: min(52%, 440px);
	height: clamp(24px, 3.4vw, 42px);
	background: var(--red);
	transform: rotate(-6deg);
	transform-origin: left;
}
.post__title {
	font-size: clamp(2.6rem, 7vw, 5.6rem);
	max-width: 16ch;
}
.post__intro {
	font-size: var(--step-1);
	line-height: 1.45;
	max-width: 52ch;
}
.post__body {
	font-size: 1.1rem;
	line-height: 1.7;
	gap: 1.15em;
}
.post__body :deep(figure) {
	margin-block: 1em;
}
</style>
