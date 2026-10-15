<script setup>
const props = defineProps({ blok: Object, story: Object });
const repo = computed(() => linkHref(props.blok.repo));
const live = computed(() => linkHref(props.blok.live));
const statusLabel = { live: 'Live', wip: 'In progress', archived: 'Archived' };
</script>

<template>
	<main v-editable="blok" class="wrap exp">
		<p class="exp__back"><NuxtLink to="/lab" class="label">← Lab</NuxtLink></p>
		<header class="exp__head construct">
			<span class="exp__ring" aria-hidden="true"></span>
			<p class="label">
				<time :datetime="blok.date?.slice(0, 10)">{{ formatDate(blok.date) }}</time>
				· {{ statusLabel[blok.status] || 'Live' }}
			</p>
			<h1 class="exp__title display">{{ blok.title || story?.name }}</h1>
			<p v-if="blok.question" class="exp__q"><span class="label">Asks</span> {{ blok.question }}</p>
			<p v-if="blok.intro" class="exp__intro">{{ blok.intro }}</p>
			<ul v-if="repo || live" class="chips">
				<li v-if="live"><a class="chip" :href="live" target="_blank" rel="noopener">Open it ↗</a></li>
				<li v-if="repo"><a class="chip" :href="repo" target="_blank" rel="noopener">Source ↗</a></li>
			</ul>
		</header>
		<div v-if="blok.body" class="prose exp__body"><StoryblokRichText :doc="blok.body" /></div>
	</main>
</template>

<style scoped>
.exp {
	padding-top: clamp(32px, 5vw, 64px);
}
.exp__back a {
	text-decoration: none;
}
.exp__head {
	position: relative;
	display: grid;
	gap: 16px;
	padding-block: clamp(40px, 6vw, 72px) clamp(28px, 4vw, 48px);
	border-bottom: 3px solid var(--ink);
	margin-bottom: clamp(32px, 4vw, 48px);
}
.exp__ring {
	position: absolute;
	right: 4%;
	top: 30px;
	width: clamp(70px, 12vw, 160px);
	aspect-ratio: 1;
	border-radius: 50%;
	border: clamp(10px, 1.8vw, 22px) solid var(--red);
	z-index: -1;
}
.exp__title {
	font-size: clamp(2.6rem, 7vw, 5.6rem);
	max-width: 16ch;
}
.exp__q {
	font-family: var(--display);
	font-weight: 700;
	font-stretch: 75%;
	font-size: var(--step-2);
	line-height: 1.1;
	max-width: 30ch;
	background: var(--paper);
}
.exp__intro {
	font-size: var(--step-1);
	line-height: 1.45;
	max-width: 52ch;
	background: var(--paper);
}
.exp__body {
	font-size: 1.1rem;
	line-height: 1.7;
}
</style>
