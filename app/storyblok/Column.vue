<script setup>
const props = defineProps({ blok: Object });
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const span = computed(() => clamp(Number(props.blok.span) || 12, 1, 12));
const offset = computed(() => clamp(Number(props.blok.offset) || 0, 0, 12 - span.value));
</script>

<template>
	<div
		v-editable="blok"
		class="col"
		:style="{ '--span': span, '--start': offset + 1, alignSelf: blok.align || 'start' }"
	>
		<StoryblokComponent v-for="b in blok.body" :key="b._uid" :blok="b" />
	</div>
</template>

<style scoped>
.col {
	position: relative;
	grid-column: var(--start) / span var(--span);
	display: grid;
	gap: 20px;
	min-width: 0;
}
@media (max-width: 760px) {
	.col {
		grid-column: 1 / -1;
	}
}
</style>
