<script setup>
defineProps({ blok: Object });
</script>

<template>
	<figure v-editable="blok" class="metric">
		<p class="metric__fig display">{{ blok.figure }}</p>
		<figcaption>
			<span class="metric__label">{{ blok.label }}</span>
			<span v-if="blok.caveat" class="metric__caveat">{{ blok.caveat }}</span>
		</figcaption>
	</figure>
</template>

<style scoped>
.metric {
	margin: 0;
	display: grid;
	grid-template-columns: auto minmax(0, 1fr);
	gap: 8px 24px;
	align-items: end;
	border-top: 3px solid currentColor;
	padding-top: 12px;
}
.metric__fig {
	font-size: clamp(3.2rem, 9vw, 6.4rem);
	line-height: 0.8;
	color: var(--red);
	font-stretch: 50%;
}
figcaption {
	display: grid;
	gap: 6px;
	padding-bottom: 4px;
}
.metric__label {
	font-weight: 600;
	font-size: var(--step-1);
	line-height: 1.25;
}
.metric__caveat {
	font-size: var(--step--1);
	color: var(--ink-2);
	max-width: 48ch;
}
@media (max-width: 560px) {
	.metric {
		grid-template-columns: 1fr;
	}
}
</style>
