<script setup>
defineProps({ blok: Object });
</script>

<template>
	<div v-editable="blok" class="opts">
		<h4 class="label">{{ blok.heading || 'Options weighed' }}</h4>
		<ol class="opts__list">
			<StoryblokComponent v-for="o in blok.options" :key="o._uid" :blok="o" />
		</ol>
	</div>
</template>

<style scoped>
.opts {
	display: grid;
	gap: 12px;
}
.opts h4 {
	font-family: var(--mono);
	line-height: 1.3;
}
.opts__list {
	list-style: none;
	margin: 0;
	padding: 0;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
	gap: 12px;
}
</style>
