<script setup>
defineProps({ blok: Object });
</script>

<template>
	<figure v-editable="blok" class="code">
		<pre :data-lang="blok.language || undefined"><code>{{ blok.code }}</code></pre>
		<figcaption v-if="blok.caption" class="label">{{ blok.caption }}</figcaption>
	</figure>
</template>

<style scoped>
.code {
	margin: 0;
	display: grid;
	gap: 8px;
	min-width: 0;
}
pre {
	margin: 0;
	overflow-x: auto;
	background: var(--ink);
	color: var(--paper);
	padding: 18px 20px;
	font: 0.86rem/1.6 var(--mono);
	border-left: 6px solid var(--red);
	position: relative;
}
pre[data-lang]::before {
	content: attr(data-lang);
	position: absolute;
	right: 10px;
	top: 6px;
	font-size: 0.66rem;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: #8f8a80;
}
</style>
