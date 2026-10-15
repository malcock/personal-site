<script setup>
const props = defineProps({ blok: Object });
const angle = computed(() => Number(props.blok.slab_angle ?? -8) || 0);
</script>

<template>
	<section v-editable="blok" class="hero wrap" id="top">
		<span class="hero__slab" :style="{ '--angle': `${angle}deg` }" aria-hidden="true"></span>
		<span class="hero__disc" aria-hidden="true"></span>
		<p v-if="blok.eyebrow" class="label hero__eyebrow">{{ blok.eyebrow }}</p>
		<h1 class="hero__statement" v-html="emphasise(blok.statement)"></h1>
		<div class="hero__foot">
			<p v-if="blok.sub" class="hero__sub">{{ blok.sub }}</p>
			<div class="hero__meta">
				<p v-if="blok.availability" class="hero__avail"><span class="hero__dot" aria-hidden="true"></span>{{ blok.availability }}</p>
				<ul v-if="blok.links?.length" class="chips">
					<li v-for="l in blok.links" :key="l._uid"><StoryblokComponent :blok="l" class="chip" /></li>
				</ul>
			</div>
		</div>
	</section>
</template>

<style scoped>
.hero {
	position: relative;
	isolation: isolate;
	padding-block: clamp(48px, 8vw, 112px) clamp(24px, 4vw, 48px);
	display: grid;
	gap: clamp(20px, 3vw, 32px);
}
.hero__statement {
	font-size: var(--step-4);
	font-weight: 900;
	font-stretch: 52%;
	text-transform: uppercase;
	line-height: 0.86;
	max-width: 13ch;
	letter-spacing: -0.005em;
}
.hero__slab {
	position: absolute;
	z-index: -1;
	left: calc(-1 * var(--gutter) - 60px);
	top: clamp(150px, 20vw, 290px);
	width: min(78%, 900px);
	height: clamp(36px, 6vw, 84px);
	background: var(--red);
	transform: rotate(var(--angle));
	transform-origin: left center;
	animation: slab 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
@keyframes slab {
	from {
		transform: rotate(0deg) scaleX(0.4);
	}
}
.hero__disc {
	position: absolute;
	z-index: -1;
	right: var(--gutter);
	top: clamp(40px, 6vw, 80px);
	width: clamp(64px, 11vw, 150px);
	aspect-ratio: 1;
	border-radius: 50%;
	border: 3px solid var(--ink);
}
.hero__foot {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: 20px 24px;
	border-top: 3px solid var(--ink);
	padding-top: 16px;
}
.hero__sub {
	grid-column: 1 / span 7;
	font-size: var(--step-1);
	line-height: 1.45;
	max-width: 52ch;
}
.hero__meta {
	grid-column: 9 / span 4;
	display: grid;
	gap: 14px;
	align-content: start;
}
.hero__avail {
	font: 500 0.78rem/1.4 var(--mono);
	text-transform: uppercase;
	letter-spacing: 0.08em;
	display: flex;
	gap: 8px;
	align-items: baseline;
}
.hero__dot {
	flex: none;
	width: 9px;
	height: 9px;
	border-radius: 50%;
	background: var(--red);
}
@media (max-width: 820px) {
	.hero__sub,
	.hero__meta {
		grid-column: 1 / -1;
	}
	.hero__disc {
		display: none;
	}
}
</style>
