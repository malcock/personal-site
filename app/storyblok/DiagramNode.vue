<script setup>
// Diagram renders its nodes itself; this exists so a stray node still renders sensibly.
defineProps({ blok: Object });
</script>

<template>
	<div v-editable="blok">
		<strong>{{ blok.label }}</strong>
		<p v-if="blok.note">{{ blok.note }}</p>
	</div>
</template>
