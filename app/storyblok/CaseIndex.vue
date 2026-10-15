<script setup>
defineProps({ blok: Object });
</script>

<template>
	<section v-editable="blok" class="sec wrap" :id="blok.anchor || undefined">
		<SectionHead :label="blok.label" :heading="blok.heading" />
		<ul class="index">
			<StoryblokComponent v-for="item in blok.items" :key="item._uid" :blok="item" />
		</ul>
	</section>
</template>

<style scoped>
.index {
	list-style: none;
	margin: 0;
	padding: 0;
}
</style>
