<script setup>
const props = defineProps({ blok: Object });
const roles = computed(() => (props.blok.roles ?? []).filter((r) => r && typeof r === 'object'));
const kindLabel = { employed: '', freelance: 'Freelance', fractional: 'Fractional', founder: 'Founder', education: 'Education' };
</script>

<template>
	<section v-editable="blok" class="sec wrap" :id="blok.anchor || undefined">
		<SectionHead :label="blok.label" :heading="blok.heading" />
		<p v-if="blok.intro" class="sec-intro">{{ blok.intro }}</p>
		<div class="record">
			<ol class="roles" :class="{ construct: blok.show_grid }">
				<li v-for="r in roles" :key="r.uuid" class="role" v-editable="r.content">
					<p class="role__when display">
						<span>{{ r.content.start }}</span
						><span class="role__dash" aria-hidden="true"></span
						><span>{{ r.content.end || 'Now' }}</span>
					</p>
					<div class="role__main">
						<h3 class="role__org display">{{ r.content.org }}</h3>
						<p class="role__title">
							{{ r.content.title }}
							<span v-if="kindLabel[r.content.kind]" class="chip">{{ kindLabel[r.content.kind] }}</span>
						</p>
						<p v-if="r.content.essence" class="role__essence">{{ r.content.essence }}</p>
						<div v-if="r.content.highlights?.content?.length" class="prose role__hl"><StoryblokRichText :doc="r.content.highlights" /></div>
						<p v-if="r.content.tools" class="role__tools mono">{{ r.content.tools }}</p>
						<ul v-if="r.content.cases?.length" class="chips role__cases" aria-label="Cases from this role">
							<template v-for="c in r.content.cases" :key="c.uuid || c">
								<li v-if="typeof c === 'object'">
									<a class="chip" :href="`/#${caseAnchor(c)}`">Case: {{ c.content?.title || c.name }}</a>
								</li>
							</template>
						</ul>
					</div>
				</li>
			</ol>
			<aside v-if="blok.extras?.length" class="extras" aria-label="Alongside">
				<StoryblokComponent v-for="x in blok.extras" :key="x._uid" :blok="x" />
			</aside>
		</div>
	</section>
</template>

<style scoped>
.record {
	display: grid;
	grid-template-columns: minmax(0, 9fr) minmax(0, 3fr);
	gap: 40px;
	align-items: start;
}
.roles {
	list-style: none;
	margin: 0;
	padding: 0;
	border-top: 3px solid var(--ink);
}
.role {
	display: grid;
	grid-template-columns: minmax(0, 2fr) minmax(0, 7fr);
	gap: 12px 24px;
	padding-block: 22px;
	border-bottom: 1px solid var(--ink);
}
.role__when {
	font-size: var(--step-2);
	font-stretch: 50%;
	line-height: 0.9;
	display: flex;
	flex-direction: column;
	gap: 6px;
	align-items: flex-start;
}
.role__when span:last-child {
	color: var(--red);
}
.role__dash {
	width: 28px;
	height: 5px;
	background: var(--ink);
	transform: rotate(-18deg);
}
.role__main {
	display: grid;
	gap: 10px;
	max-width: var(--measure);
	background: var(--paper);
	padding-right: 8px;
}
.role__org {
	font-size: var(--step-2);
	font-stretch: 58%;
}
.role__title {
	font-weight: 500;
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	align-items: center;
}
.role__essence {
	font-size: 1.08rem;
	line-height: 1.5;
}
.role__hl {
	font-size: 0.96rem;
}
.role__tools {
	font-size: 0.78rem;
	color: var(--ink-2);
}
.role__cases .chip {
	color: var(--red-ink);
}
.extras {
	display: grid;
	gap: 28px;
	position: sticky;
	top: 80px;
}
@media (max-width: 900px) {
	.record {
		grid-template-columns: 1fr;
	}
	.extras {
		position: static;
	}
}
@media (max-width: 560px) {
	.role {
		grid-template-columns: 1fr;
	}
	.role__when {
		flex-direction: row;
		align-items: center;
	}
}
</style>
