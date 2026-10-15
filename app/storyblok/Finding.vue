<script setup>
defineProps({ blok: Object });
</script>

<template>
	<figure v-editable="blok" class="finding">
		<span class="finding__wedge" aria-hidden="true"></span>
		<p class="label">{{ blok.label || 'What I saw' }}</p>
		<blockquote class="finding__quote">{{ blok.quote }}</blockquote>
		<figcaption v-if="blok.attribution" class="label">{{ blok.attribution }}</figcaption>
	</figure>
</template>

<style scoped>
.finding {
	position: relative;
	margin: 0;
	display: grid;
	gap: 12px;
	padding-left: clamp(36px, 6vw, 84px);
	max-width: 62rem;
}
.finding__wedge {
	position: absolute;
	left: 0;
	top: 4px;
	width: clamp(22px, 3.6vw, 52px);
	aspect-ratio: 1;
	background: var(--red);
	clip-path: polygon(0 0, 100% 0, 0 100%);
}
.finding__quote {
	margin: 0;
	font-family: var(--display);
	font-weight: 700;
	font-stretch: 75%;
	font-size: var(--step-2);
	line-height: 1.12;
	text-wrap: balance;
}
</style>
