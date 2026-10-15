<script setup>
defineProps({ blok: Object });
</script>

<template>
	<div v-editable="blok" class="spec">
		<dt class="label">{{ blok.label }}</dt>
		<dd>{{ blok.value }}</dd>
	</div>
</template>

<style scoped>
.spec {
	padding: 12px 16px 14px 0;
	display: grid;
	gap: 4px;
	align-content: start;
}
dd {
	margin: 0;
	font-weight: 500;
}
</style>
