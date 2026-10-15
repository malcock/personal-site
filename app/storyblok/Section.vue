<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section
		v-editable="blok"
		class="sec free"
		:class="blok.tone && blok.tone !== 'paper' ? `tone-${blok.tone}` : ''"
		:id="blok.anchor || undefined"
	>
		<div class="wrap free__inner">
			<SectionHead :label="blok.label" :heading="blok.heading" />
			<StoryblokComponent v-for="b in blok.body" :key="b._uid" :blok="b" />
		</div>
	</section>
</template>

<style scoped>
.free {
	overflow: hidden;
}
.free__inner {
	position: relative;
	isolation: isolate;
	display: grid;
	gap: clamp(24px, 3vw, 40px);
}
.free__inner > :deep(.sec-head) {
	margin-bottom: 0;
}
</style>
