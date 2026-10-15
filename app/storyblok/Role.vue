<script setup>
// Roles normally render inside the Record timeline. This view is for previewing one in the Visual Editor.
defineProps({ blok: Object });
</script>

<template>
	<main v-editable="blok" class="wrap" style="padding-block: 64px">
		<p class="label">{{ blok.start }}–{{ blok.end || 'Now' }} · Preview of a record entry</p>
		<h1 class="display" style="font-size: var(--step-3)">{{ blok.org }}</h1>
		<p>{{ blok.title }}</p>
		<p>{{ blok.essence }}</p>
		<div v-if="blok.highlights" class="prose"><StoryblokRichText :doc="blok.highlights" /></div>
	</main>
</template>
