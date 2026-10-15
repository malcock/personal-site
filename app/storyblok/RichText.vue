<script setup>
defineProps({ blok: Object });
</script>

<template>
	<div v-editable="blok" class="prose" :class="blok.size && blok.size !== 'body' ? `prose--${blok.size}` : ''">
		<StoryblokRichText v-if="blok.text" :doc="blok.text" />
	</div>
</template>
