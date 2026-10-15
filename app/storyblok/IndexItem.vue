<script setup>
const props = defineProps({ blok: Object });
const discipline = useDisciplines();
const href = computed(() => linkHref(props.blok.link));
const external = computed(() => isExternal(href.value));
</script>

<template>
	<li v-editable="blok" class="item">
		<span class="item__years label">{{ blok.years }}</span>
		<h3 class="item__title display">
			<a v-if="href" :href="href" :target="external ? '_blank' : undefined" :rel="external ? 'noopener' : undefined"
				>{{ blok.title }}<span aria-hidden="true">{{ external ? ' ↗' : ' →' }}</span></a
			>
			<template v-else>{{ blok.title }}</template>
		</h3>
		<p class="item__line">{{ blok.line }}</p>
		<ul v-if="blok.tags?.length" class="chips item__tags">
			<li v-for="t in blok.tags" :key="t" class="chip">{{ discipline(t) }}</li>
		</ul>
	</li>
</template>

<style scoped>
.item {
	display: grid;
	grid-template-columns: 110px minmax(0, 3fr) minmax(0, 5fr) minmax(0, 3fr);
	gap: 8px 24px;
	align-items: baseline;
	padding-block: 16px;
	border-bottom: 1px solid var(--rule);
}
.item:first-child {
	border-top: 3px solid var(--ink);
}
.item__title {
	font-size: var(--step-1);
	font-weight: 820;
	font-stretch: 62%;
}
.item__title a {
	text-decoration: none;
}
.item__title a span {
	color: var(--red);
}
.item__tags {
	justify-content: flex-end;
}
@media (max-width: 900px) {
	.item {
		grid-template-columns: 90px minmax(0, 1fr);
	}
	.item__line,
	.item__tags {
		grid-column: 2;
		justify-content: flex-start;
	}
}
</style>
