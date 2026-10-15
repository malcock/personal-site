<script setup>
defineProps({ blok: Object });
</script>

<template>
	<div v-editable="blok" class="facts">
		<h3 class="label">{{ blok.title }}</h3>
		<ul>
			<li v-for="(line, i) in lines(blok.items)" :key="i">{{ line }}</li>
		</ul>
	</div>
</template>

<style scoped>
.facts {
	border-top: 3px solid var(--ink);
	padding-top: 10px;
	display: grid;
	gap: 10px;
}
.facts h3 {
	font-family: var(--mono);
	line-height: 1.3;
}
.facts ul {
	list-style: none;
	margin: 0;
	padding: 0;
	display: grid;
	gap: 8px;
	font-size: 0.94rem;
}
</style>
