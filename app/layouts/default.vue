<script setup>
const route = useRoute();
const onHome = computed(() => route.path === '/');
const nav = [
	{ label: 'Work', href: '/#work' },
	{ label: 'Record', href: '/#record' },
	{ label: 'Writing', href: '/writing' },
	{ label: 'Lab', href: '/lab' },
	{ label: 'Contact', href: '/#contact' },
];
const year = new Date().getFullYear();
</script>

<template>
	<a class="skip" href="#content">Skip to content</a>
	<header class="masthead">
		<div class="wrap masthead__inner">
			<NuxtLink to="/" class="masthead__name" :aria-current="onHome ? 'page' : undefined">
				<span class="masthead__mark" aria-hidden="true"></span>Martin Alcock
			</NuxtLink>
			<nav aria-label="Main">
				<ul>
					<li v-for="item in nav" :key="item.href">
						<NuxtLink :to="item.href">{{ item.label }}</NuxtLink>
					</li>
				</ul>
			</nav>
		</div>
	</header>
	<div id="content">
		<slot />
	</div>
	<footer class="foot">
		<div class="wrap foot__inner">
			<span class="label">© {{ year }} Martin Alcock · Sheffield</span>
			<span class="label">Built with Nuxt and Storyblok. Flat HTML on Cloudflare.</span>
		</div>
	</footer>
</template>

<style scoped>
.skip {
	position: absolute;
	left: -9999px;
	top: 8px;
	z-index: 100;
	background: var(--ink);
	color: var(--paper);
	padding: 8px 12px;
}
.skip:focus {
	left: 8px;
}
.masthead {
	position: sticky;
	top: 0;
	z-index: 50;
	background: color-mix(in srgb, var(--paper) 92%, transparent);
	backdrop-filter: blur(6px);
	border-bottom: 1px solid var(--ink);
}
.masthead__inner {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16px;
	min-height: 56px;
	flex-wrap: wrap;
}
.masthead__name {
	display: inline-flex;
	align-items: center;
	gap: 10px;
	font: 800 1.15rem/1 var(--display);
	font-stretch: 62%;
	text-transform: uppercase;
	letter-spacing: 0.02em;
	text-decoration: none;
}
.masthead__mark {
	width: 22px;
	height: 7px;
	background: var(--red);
	transform: rotate(-20deg);
}
nav ul {
	display: flex;
	flex-wrap: wrap;
	gap: 4px 20px;
	list-style: none;
	margin: 0;
	padding: 0;
}
nav a {
	font: 500 0.74rem/1 var(--mono);
	text-transform: uppercase;
	letter-spacing: 0.12em;
	text-decoration: none;
	padding-block: 8px;
	display: inline-block;
}
nav a.router-link-active:not([href*='#']) {
	box-shadow: inset 0 -3px 0 var(--red);
}
@media (max-width: 520px) {
	.masthead {
		position: static;
	}
	.masthead__inner {
		padding-block: 10px;
	}
	nav ul {
		gap: 0 14px;
	}
}
.foot {
	margin-top: clamp(80px, 10vw, 140px);
	border-top: 3px solid var(--ink);
}
.foot__inner {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 8px 24px;
	padding-block: 18px 32px;
}
</style>
