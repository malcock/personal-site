<script setup>
defineProps({ blok: Object });
</script>

<template>
	<div class="test-box" v-editable="blok">
		<p class="test-box__text">{{ blok.field }}</p>
		<div class="test-box__accent" aria-hidden="true"></div>
	</div>
</template>

<style scoped>
.test-box {
	position: relative;
	box-sizing: border-box;
	width: 243px;
	min-height: 146px;
	padding: 15px 43px 15px 23px;
	background: #d9d9d9;
}

.test-box__text {
	margin: 0;
	font-family: Inter, sans-serif;
	font-size: 12px;
	font-weight: 400;
	line-height: normal;
	color: #000;
	word-break: break-word;
}

.test-box__accent {
	position: absolute;
	top: 63px;
	right: 11px;
	width: 45px;
	height: 42px;
	background: #761f1f;
}
</style>
