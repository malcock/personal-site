<script setup>
defineProps({ blok: Object });
const gaps = { 0: '0px', s: '12px', m: 'clamp(16px, 2.5vw, 28px)', l: 'clamp(28px, 4vw, 56px)' };
</script>

<template>
	<div
		v-editable="blok"
		class="grid"
		:class="{ construct: blok.show_grid }"
		:style="{ '--gap': gaps[blok.gap ?? 'm'] ?? gaps.m }"
	>
		<StoryblokComponent v-for="col in blok.columns" :key="col._uid" :blok="col" />
	</div>
</template>

<style scoped>
.grid {
	position: relative;
	display: grid;
	grid-template-columns: repeat(12, minmax(0, 1fr));
	column-gap: var(--gap);
	row-gap: clamp(20px, 3vw, 36px);
}
.grid.construct {
	padding-block: 16px;
}
</style>
