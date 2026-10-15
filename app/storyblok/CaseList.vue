<script setup>
const props = defineProps({ blok: Object });
// Unresolved references arrive as UUID strings (e.g. an unpublished case); skip them.
const cases = computed(() => (props.blok.cases ?? []).filter((c) => c && typeof c === 'object'));
</script>

<template>
	<section v-editable="blok" class="sec wrap" :id="blok.anchor || undefined">
		<SectionHead :label="blok.label" :heading="blok.heading" />
		<p v-if="blok.intro" class="sec-intro">{{ blok.intro }}</p>
		<div class="case-list">
			<CaseCard v-for="(c, i) in cases" :key="c.uuid" :story="c" :index="i" />
		</div>
	</section>
</template>

<style scoped>
.case-list {
	border-top: 3px solid var(--ink);
}
</style>
