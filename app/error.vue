<script setup>
const props = defineProps({ error: Object });
const missing = computed(() => props.error?.statusCode === 404);
useHead({ title: missing.value ? 'Not found · Martin Alcock' : 'Error · Martin Alcock' });
</script>

<template>
	<NuxtLayout>
		<main class="wrap err">
			<span class="err__bar" aria-hidden="true"></span>
			<p class="label">{{ error?.statusCode }}</p>
			<h1 class="display">{{ missing ? 'Nothing built here' : 'Something broke' }}</h1>
			<p>{{ missing ? "This page doesn't exist, or it moved." : 'Try again in a moment.' }}</p>
			<NuxtLink to="/" class="chip">Back to the work</NuxtLink>
		</main>
	</NuxtLayout>
</template>

<style scoped>
.err {
	position: relative;
	display: grid;
	gap: 16px;
	justify-items: start;
	padding-block: 120px 40px;
	overflow: hidden;
}
.err h1 {
	font-size: var(--step-4);
}
.err__bar {
	position: absolute;
	right: -10%;
	top: 90px;
	width: 55%;
	height: 48px;
	background: var(--red);
	transform: rotate(-14deg);
	z-index: -1;
}
</style>
