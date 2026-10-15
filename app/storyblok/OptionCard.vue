<script setup>
defineProps({ blok: Object });
</script>

<template>
	<li v-editable="blok" class="opt" :class="{ 'opt--chosen': blok.chosen }">
		<p v-if="blok.chosen" class="opt__tag label">Chosen</p>
		<h5 class="opt__title display">{{ blok.title }}</h5>
		<p class="opt__text">{{ blok.text }}</p>
	</li>
</template>

<style scoped>
.opt {
	position: relative;
	display: grid;
	gap: 8px;
	align-content: start;
	padding: 14px 16px 16px;
	border: 1px solid currentColor;
	color: var(--ink-2);
}
.opt__title {
	font-size: var(--step-1);
	font-stretch: 65%;
	color: var(--ink);
}
.opt__text {
	font-size: 0.94rem;
}
.opt--chosen {
	border: 3px solid var(--red);
	color: var(--ink);
	background: color-mix(in srgb, var(--paper) 60%, white);
}
.opt__tag {
	color: var(--red-ink);
}
</style>
