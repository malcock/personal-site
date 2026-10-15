<script setup>
defineProps({
	label: String,
	heading: String,
	as: { type: String, default: 'h2' },
});
</script>

<template>
	<div v-if="label || heading" class="sec-head">
		<component :is="as" v-if="heading">{{ heading }}</component>
		<span v-if="label" class="label">{{ label }}</span>
	</div>
</template>
