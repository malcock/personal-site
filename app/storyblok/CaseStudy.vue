<script setup>
defineProps({ blok: Object, story: Object });
</script>

<template>
	<main class="wrap case-page">
		<p class="case-page__back"><NuxtLink :to="'/#work'" class="label">← All work</NuxtLink></p>
		<CaseCard :story="{ ...story, content: blok }" standalone />
	</main>
</template>

<style scoped>
.case-page {
	padding-top: clamp(32px, 5vw, 64px);
}
.case-page__back a {
	text-decoration: none;
}
</style>
