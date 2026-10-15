<script setup>
defineProps({ blok: Object });
</script>

<template>
	<aside v-editable="blok" class="refl">
		<h4 class="refl__heading display">{{ blok.heading || 'What happened next' }}</h4>
		<div v-if="blok.text" class="prose"><StoryblokRichText :doc="blok.text" /></div>
	</aside>
</template>

<style scoped>
.refl {
	display: grid;
	grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
	gap: 16px 32px;
	background: var(--ink);
	color: var(--paper);
	padding: clamp(20px, 3vw, 32px);
	--ink-2: #b4afa5;
	--red-ink: #ff8a7e;
}
.refl__heading {
	font-size: var(--step-2);
	font-stretch: 58%;
	color: var(--paper);
	border-top: 6px solid var(--red);
	padding-top: 12px;
	align-self: start;
}
@media (max-width: 700px) {
	.refl {
		grid-template-columns: 1fr;
	}
}
</style>
