<script setup>
const props = defineProps({ blok: Object });
const sizes = { s: 'clamp(32px, 5vw, 56px)', m: 'clamp(56px, 9vw, 120px)', l: 'clamp(96px, 16vw, 240px)' };
const thickness = { s: '8px', m: 'clamp(14px, 2vw, 24px)', l: 'clamp(28px, 4.5vw, 64px)' };
const style = computed(() => ({
	'--angle': `${Number(props.blok.angle) || 0}deg`,
	'--len': `${Number(props.blok.length) || 70}%`,
	'--size': sizes[props.blok.size] ?? sizes.m,
	'--thick': thickness[props.blok.size] ?? thickness.m,
	'--fill': `var(--${props.blok.colour || 'red'})`,
}));
</script>

<template>
	<div
		v-editable="blok"
		class="shape"
		:class="[`shape--${blok.kind || 'bar'}`, `at-${blok.placement || 'flow'}`]"
		:style="style"
		aria-hidden="true"
	></div>
</template>

<style scoped>
.shape {
	pointer-events: none;
	transform: rotate(var(--angle));
}
.shape--bar {
	width: var(--len);
	height: var(--thick);
	background: var(--fill);
}
.shape--line {
	width: var(--len);
	height: 3px;
	background: var(--fill);
}
.shape--disc,
.shape--ring,
.shape--square,
.shape--wedge {
	width: var(--size);
	aspect-ratio: 1;
}
.shape--disc {
	border-radius: 50%;
	background: var(--fill);
}
.shape--ring {
	border-radius: 50%;
	border: 3px solid var(--fill);
}
.shape--square {
	background: var(--fill);
}
.shape--wedge {
	background: var(--fill);
	clip-path: polygon(0 0, 100% 0, 100% 100%);
}
.at-flow {
	position: relative;
	transform-origin: left center;
}
[class*='at-']:not(.at-flow) {
	position: absolute;
	z-index: -1;
}
.at-tl {
	top: 0;
	left: -4%;
	transform-origin: left center;
}
.at-tr {
	top: 0;
	right: -4%;
	transform-origin: right center;
}
.at-bl {
	bottom: 0;
	left: -4%;
	transform-origin: left center;
}
.at-br {
	bottom: 0;
	right: -4%;
	transform-origin: right center;
}
.at-c {
	top: 50%;
	left: 50%;
	translate: -50% -50%;
}
</style>
