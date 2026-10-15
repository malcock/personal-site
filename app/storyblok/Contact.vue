<script setup>
const props = defineProps({ blok: Object });
const copied = ref(false);
async function copy() {
	try {
		await navigator.clipboard.writeText(props.blok.email);
		copied.value = true;
		setTimeout(() => (copied.value = false), 2000);
	} catch {
		copied.value = false;
	}
}
</script>

<template>
	<section v-editable="blok" class="contact tone-ink" :id="blok.anchor || undefined">
		<span class="contact__bar" aria-hidden="true"></span>
		<div class="wrap contact__inner">
			<h2 class="contact__heading display">{{ blok.heading }}</h2>
			<p v-if="blok.text" class="contact__text">{{ blok.text }}</p>
			<p v-if="blok.email" class="contact__email">
				<a :href="`mailto:${blok.email}`" class="display">{{ blok.email }}</a>
				<button type="button" class="chip contact__copy" @click="copy">{{ copied ? 'Copied' : 'Copy' }}</button>
			</p>
			<ul v-if="blok.links?.length" class="chips">
				<li v-for="l in blok.links" :key="l._uid"><StoryblokComponent :blok="l" class="chip" /></li>
			</ul>
		</div>
	</section>
</template>

<style scoped>
.contact {
	position: relative;
	overflow: hidden;
	isolation: isolate;
	padding-top: clamp(56px, 8vw, 104px);
}
.contact__bar {
	position: absolute;
	z-index: -1;
	right: -8%;
	top: 30px;
	width: 50%;
	height: clamp(30px, 5vw, 64px);
	background: var(--red);
	transform: rotate(-12deg);
}
.contact__inner {
	display: grid;
	gap: 24px;
	justify-items: start;
}
.contact__heading {
	font-size: var(--step-4);
	max-width: 12ch;
}
.contact__text {
	font-size: var(--step-1);
	max-width: 50ch;
	line-height: 1.45;
}
.contact__email {
	display: flex;
	flex-wrap: wrap;
	gap: 12px 20px;
	align-items: center;
	max-width: 100%;
}
.contact__email a {
	font-size: clamp(1.6rem, 5vw, 3.4rem);
	font-stretch: 60%;
	text-transform: none;
	text-decoration-color: var(--red);
	text-decoration-thickness: 4px;
	overflow-wrap: anywhere;
}
.contact__email a:hover {
	color: var(--paper);
	text-decoration-color: var(--paper);
}
.contact__copy {
	background: transparent;
	color: inherit;
	cursor: pointer;
}
.contact__copy:hover {
	background: var(--red);
	border-color: var(--red);
}
.contact :deep(.chip:hover) {
	color: var(--paper);
}
</style>
