<script setup>
const props = defineProps({
	story: { type: Object, required: true },
	index: { type: Number, default: 0 },
	/** Standalone permalink page: reasoning shown open, title as h1. */
	standalone: Boolean,
});
const c = computed(() => props.story.content ?? {});
const discipline = useDisciplines();
const number = computed(() => String(props.index + 1).padStart(2, '0'));
const meta = computed(() => [c.value.client, c.value.role, c.value.period].filter(Boolean));
const hasBody = computed(() => (c.value.body?.length ?? 0) > 0);
</script>

<template>
	<article
		v-editable="c"
		class="case"
		:class="[`case--${c.accent || 'bar'}`, { 'case--standalone': standalone }]"
		:id="standalone ? undefined : caseAnchor(story)"
	>
		<span class="case__accent" aria-hidden="true"></span>
		<div class="case__num display" aria-hidden="true">{{ standalone ? '' : number }}</div>
		<header class="case__head">
			<component :is="standalone ? 'h1' : 'h3'" class="case__title display">{{ c.title || story.name }}</component>
			<p v-if="meta.length" class="label">{{ meta.join(' · ') }}</p>
		</header>

		<dl class="case__reframe">
			<div>
				<dt class="label">Asked for</dt>
				<dd class="case__asked">{{ c.asked }}</dd>
			</div>
			<div>
				<dt class="label">Actually</dt>
				<dd class="case__actually">{{ c.actually }}</dd>
			</div>
		</dl>

		<div class="case__outcome">
			<p v-if="c.outcome_figure" class="case__figure display">{{ c.outcome_figure }}</p>
			<p v-if="c.outcome_label" class="case__olabel">{{ c.outcome_label }}</p>
		</div>

		<div class="case__summary">
			<p v-if="c.summary">{{ c.summary }}</p>
			<ul v-if="c.disciplines?.length" class="chips" aria-label="Disciplines">
				<li v-for="d in c.disciplines" :key="d" class="chip">{{ discipline(d) }}</li>
			</ul>
		</div>

		<div v-if="hasBody && standalone" class="case__body">
			<StoryblokComponent v-for="b in c.body" :key="b._uid" :blok="b" />
		</div>
		<details v-else-if="hasBody" class="case__more">
			<summary>
				<span class="case__toggle" aria-hidden="true"></span>
				<span>The reasoning</span>
			</summary>
			<div class="case__body">
				<StoryblokComponent v-for="b in c.body" :key="b._uid" :blok="b" />
				<p class="case__perma">
					<NuxtLink :to="storyPath(story)" class="chip">Permalink for this case</NuxtLink>
				</p>
			</div>
		</details>
	</article>
</template>

<style scoped>
.case {
	position: relative;
	display: grid;
	grid-template-columns: repeat(12, minmax(0, 1fr));
	gap: 20px 24px;
	padding-block: clamp(28px, 4vw, 48px);
	border-bottom: 1px solid var(--ink);
	isolation: isolate;
}
.case__accent {
	position: absolute;
	z-index: -1;
	pointer-events: none;
	opacity: 0.9;
}
.case--bar .case__accent {
	right: -4%;
	top: 34px;
	width: 26%;
	height: 14px;
	background: var(--red);
	transform: rotate(-16deg);
}
.case--disc .case__accent {
	right: 3%;
	top: 26px;
	width: clamp(40px, 6vw, 72px);
	aspect-ratio: 1;
	border-radius: 50%;
	background: var(--red);
}
.case--wedge .case__accent {
	right: 2%;
	top: 20px;
	width: clamp(60px, 9vw, 110px);
	aspect-ratio: 1;
	background: var(--red);
	clip-path: polygon(0 0, 100% 0, 100% 100%);
}
.case--square .case__accent {
	right: 4%;
	top: 28px;
	width: clamp(34px, 5vw, 56px);
	aspect-ratio: 1;
	background: var(--ink);
	transform: rotate(12deg);
}
.case__num {
	grid-column: 1 / span 1;
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 0.8;
	color: var(--red);
	font-stretch: 50%;
}
.case__head {
	grid-column: 2 / span 9;
	display: grid;
	gap: 8px;
	align-content: start;
}
.case__title {
	font-size: var(--step-3);
	line-height: 0.9;
}
.case__reframe {
	grid-column: 2 / span 6;
	margin: 0;
	display: grid;
	gap: 14px;
}
.case__reframe dd {
	margin: 4px 0 0;
}
.case__asked {
	font-size: var(--step-1);
	color: var(--ink-2);
	text-decoration: line-through;
	text-decoration-color: var(--red);
	text-decoration-thickness: 3px;
}
.case__actually {
	font-size: var(--step-1);
	line-height: 1.4;
	font-weight: 500;
	max-width: 46ch;
}
.case__outcome {
	grid-column: 9 / span 4;
	align-self: start;
	border-top: 3px solid var(--ink);
	padding-top: 10px;
	display: grid;
	gap: 6px;
}
.case__figure {
	font-size: clamp(2.6rem, 6vw, 4.4rem);
	line-height: 0.85;
	color: var(--red);
	font-stretch: 52%;
}
.case__olabel {
	font-size: var(--step--1);
	max-width: 30ch;
}
.case__summary {
	grid-column: 2 / span 8;
	display: grid;
	gap: 14px;
	max-width: var(--measure);
}
.case__more {
	grid-column: 2 / -1;
}
.case__more > summary {
	list-style: none;
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	gap: 12px;
	font: 500 0.8rem/1 var(--mono);
	text-transform: uppercase;
	letter-spacing: 0.12em;
	padding: 12px 16px 12px 0;
	border-bottom: 3px solid var(--ink);
}
.case__more > summary::-webkit-details-marker {
	display: none;
}
.case__more > summary:hover {
	color: var(--red-ink);
}
.case__toggle {
	position: relative;
	width: 18px;
	height: 18px;
	background: var(--red);
	transition: transform 0.25s ease;
}
.case__toggle::after {
	content: '';
	position: absolute;
	inset: 7px 3px;
	background: var(--paper);
}
.case__toggle::before {
	content: '';
	position: absolute;
	inset: 3px 7px;
	background: var(--paper);
	transition: transform 0.25s ease;
}
.case__more[open] .case__toggle {
	transform: rotate(-45deg);
}
.case__more[open] .case__toggle::before {
	transform: scaleY(0);
}
.case__body {
	display: grid;
	gap: clamp(28px, 4vw, 44px);
	padding-top: clamp(24px, 3vw, 36px);
}
.case--standalone .case__body {
	grid-column: 2 / -1;
}
.case--standalone {
	border-bottom: 0;
}
.case--standalone .case__head {
	grid-column: 1 / span 10;
}
.case--standalone .case__title {
	font-size: var(--step-4);
}
.case__perma {
	margin-top: 8px;
}
@media (max-width: 820px) {
	.case__num {
		grid-column: 1 / -1;
	}
	.case__head,
	.case__reframe,
	.case__outcome,
	.case__summary,
	.case__more,
	.case--standalone .case__body {
		grid-column: 1 / -1;
	}
}
</style>
