<script setup>
const props = defineProps({ blok: Object });
const href = computed(() => linkHref(props.blok.link));
const external = computed(() => isExternal(href.value) || props.blok.link?.target === '_blank');
</script>

<template>
	<a
		v-editable="blok"
		:href="href"
		:target="external ? '_blank' : undefined"
		:rel="external ? 'noopener' : undefined"
		>{{ blok.label }}<span v-if="external" aria-hidden="true"> ↗</span></a
	>
</template>
