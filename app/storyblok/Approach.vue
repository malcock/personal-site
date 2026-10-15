<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section v-editable="blok" class="sec wrap" :id="blok.anchor || undefined">
		<SectionHead :label="blok.label" :heading="blok.heading" />
		<p v-if="blok.intro" class="sec-intro">{{ blok.intro }}</p>
		<ol class="moves">
			<StoryblokComponent v-for="(m, i) in blok.moves" :key="m._uid" :blok="m" :step="i + 1" />
		</ol>
	</section>
</template>

<style scoped>
.moves {
	list-style: none;
	margin: 0;
	padding: 0;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
	gap: 0;
	border-top: 3px solid var(--ink);
	border-left: 1px solid var(--ink);
}
</style>
