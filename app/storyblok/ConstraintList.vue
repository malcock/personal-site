<script setup>
defineProps({ blok: Object });
</script>

<template>
	<div v-editable="blok" class="cons">
		<h4 class="label">{{ blok.heading || 'Constraints' }}</h4>
		<ul>
			<li v-for="(line, i) in lines(blok.items)" :key="i">{{ line }}</li>
		</ul>
	</div>
</template>

<style scoped>
.cons {
	display: grid;
	gap: 12px;
}
.cons h4 {
	font-family: var(--mono);
	line-height: 1.3;
}
.cons ul {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}
.cons li {
	border: 2px solid currentColor;
	padding: 8px 12px;
	font-weight: 500;
	font-size: 0.95rem;
	position: relative;
}
.cons li::before {
	content: '';
	display: inline-block;
	width: 8px;
	height: 8px;
	background: var(--red);
	margin-right: 8px;
	vertical-align: 1px;
}
</style>
