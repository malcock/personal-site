<script setup>
defineProps({ blok: Object });
</script>

<template>
	<dl v-editable="blok" class="strip">
		<StoryblokComponent v-for="s in blok.items" :key="s._uid" :blok="s" />
	</dl>
</template>

<style scoped>
.strip {
	margin: 0;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 150px), 1fr));
	border-top: 1px solid currentColor;
	border-bottom: 1px solid currentColor;
}
</style>
