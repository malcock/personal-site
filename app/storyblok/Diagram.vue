<script setup>
const props = defineProps({ blok: Object });
const kind = computed(() => props.blok.kind || 'steps');
const nodes = computed(() => props.blok.nodes ?? []);
const before = computed(() => nodes.value.filter((n) => n.side !== 'after'));
const after = computed(() => nodes.value.filter((n) => n.side === 'after'));
</script>

<template>
	<figure v-editable="blok" class="dia" :class="`dia--${kind}`">
		<h4 v-if="blok.heading" class="label dia__heading">{{ blok.heading }}</h4>

		<ol v-if="kind === 'steps'" class="dia__steps">
			<li v-for="(n, i) in nodes" :key="n._uid" v-editable="n" class="node" :class="{ 'node--em': n.emphasis }">
				<span class="node__i display" aria-hidden="true">{{ i + 1 }}</span>
				<strong class="node__label">{{ n.label }}</strong>
				<span v-if="n.note" class="node__note">{{ n.note }}</span>
			</li>
		</ol>

		<div v-else-if="kind === 'before_after'" class="dia__ba">
			<div class="dia__side">
				<p class="label">Before</p>
				<ul>
					<li v-for="n in before" :key="n._uid" v-editable="n" class="node" :class="{ 'node--em': n.emphasis }">
						<strong class="node__label">{{ n.label }}</strong>
						<span v-if="n.note" class="node__note">{{ n.note }}</span>
					</li>
				</ul>
			</div>
			<span class="dia__arrow" aria-hidden="true"></span>
			<div class="dia__side dia__side--after">
				<p class="label">After</p>
				<ul>
					<li v-for="n in after" :key="n._uid" v-editable="n" class="node" :class="{ 'node--em': n.emphasis }">
						<strong class="node__label">{{ n.label }}</strong>
						<span v-if="n.note" class="node__note">{{ n.note }}</span>
					</li>
				</ul>
			</div>
		</div>

		<ol v-else class="dia__funnel">
			<li
				v-for="(n, i) in nodes"
				:key="n._uid"
				v-editable="n"
				class="node"
				:class="{ 'node--em': n.emphasis }"
				:style="{ '--w': `${100 - (i * 60) / Math.max(nodes.length - 1, 1)}%` }"
			>
				<strong class="node__label">{{ n.label }}</strong>
				<span v-if="n.note" class="node__note">{{ n.note }}</span>
			</li>
		</ol>

		<figcaption v-if="blok.caption" class="dia__cap">{{ blok.caption }}</figcaption>
	</figure>
</template>

<style scoped>
.dia {
	margin: 0;
	display: grid;
	gap: 14px;
}
.dia__heading {
	font-family: var(--mono);
	line-height: 1.3;
}
.dia ol,
.dia ul {
	list-style: none;
	margin: 0;
	padding: 0;
}
.node {
	display: grid;
	gap: 4px;
	align-content: start;
}
.node__label {
	font-family: var(--display);
	font-weight: 800;
	font-stretch: 65%;
	text-transform: uppercase;
	font-size: 1.15rem;
	line-height: 1.05;
}
.node__note {
	font-size: 0.9rem;
	color: var(--ink-2);
}

/* steps: a stepped staircase of blocks joined by a rising diagonal */
.dia__steps {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr));
	gap: 0;
	counter-reset: s;
}
.dia__steps .node {
	position: relative;
	padding: 14px 16px 16px;
	border-left: 3px solid var(--ink);
}
.dia__steps .node:nth-child(2n) {
	margin-top: 20px;
}
.dia__steps .node__i {
	font-size: 2.2rem;
	line-height: 0.8;
	font-stretch: 50%;
	color: var(--ink-2);
}
.dia__steps .node--em {
	border-left-color: var(--red);
	background: var(--red);
	color: var(--paper);
}
.dia__steps .node--em .node__i,
.dia__steps .node--em .node__note {
	color: var(--paper);
}

/* before / after */
.dia__ba {
	display: grid;
	grid-template-columns: minmax(0, 1fr) 64px minmax(0, 1fr);
	gap: 16px;
	align-items: stretch;
}
.dia__side {
	display: grid;
	gap: 10px;
	align-content: start;
	padding: 14px 16px 16px;
	border: 1px solid currentColor;
}
.dia__side ul {
	display: grid;
	gap: 12px;
}
.dia__side--after {
	border: 3px solid var(--ink);
}
.dia__side .node--em .node__label {
	color: var(--red);
}
.dia__arrow {
	align-self: center;
	height: 14px;
	background: var(--red);
	clip-path: polygon(0 30%, 70% 30%, 70% 0, 100% 50%, 70% 100%, 70% 70%, 0 70%);
}
@media (max-width: 640px) {
	.dia__ba {
		grid-template-columns: 1fr;
	}
	.dia__arrow {
		width: 14px;
		height: 40px;
		justify-self: center;
		clip-path: polygon(30% 0, 70% 0, 70% 70%, 100% 70%, 50% 100%, 0 70%, 30% 70%);
	}
}

/* funnel: bars narrowing toward the decision */
.dia__funnel {
	display: grid;
	gap: 6px;
}
.dia__funnel .node {
	width: var(--w);
	min-width: min(100%, 220px);
	padding: 10px 14px;
	background: var(--paper-2);
	border-left: 6px solid var(--ink);
}
.dia__funnel .node--em {
	background: var(--red);
	border-left-color: var(--ink);
	color: var(--paper);
}
.dia__funnel .node--em .node__note {
	color: var(--paper);
}
.dia__cap {
	font-size: var(--step--1);
	color: var(--ink-2);
}
</style>
