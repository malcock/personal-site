<script setup>
const currentYear = new Date().getFullYear();
</script>
<template>
	<slot></slot>
	<footer>All rights reserved © {{ currentYear }} wibbles</footer>
</template>
