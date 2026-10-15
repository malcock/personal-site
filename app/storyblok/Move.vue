<script setup>
const props = defineProps({ blok: Object, step: Number });
const proof = computed(() => (props.blok.proof && typeof props.blok.proof === 'object' ? props.blok.proof : null));
</script>

<template>
	<li v-editable="blok" class="move">
		<span class="move__step display" aria-hidden="true">{{ step }}</span>
		<h3 class="move__title display">{{ blok.title }}</h3>
		<p class="move__text">{{ blok.text }}</p>
		<a v-if="proof" :href="`/#${caseAnchor(proof)}`" class="move__proof label">
			See it in {{ proof.content?.title || proof.name }} →
		</a>
	</li>
</template>

<style scoped>
.move {
	position: relative;
	display: grid;
	grid-template-rows: auto auto 1fr auto;
	gap: 12px;
	padding: 20px 20px 24px;
	border-right: 1px solid var(--ink);
	border-bottom: 1px solid var(--ink);
	overflow: hidden;
}
.move__step {
	font-size: 4.4rem;
	line-height: 0.75;
	color: var(--red);
	font-stretch: 50%;
}
.move__title {
	font-size: var(--step-2);
	font-stretch: 60%;
}
.move__text {
	font-size: 0.98rem;
}
.move__proof {
	color: var(--red-ink);
	text-decoration: none;
}
.move__proof:hover {
	text-decoration: underline;
}
</style>
