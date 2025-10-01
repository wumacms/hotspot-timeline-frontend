<script setup>
defineProps({
  msg: String,
})
</script>

<template>
  <h1 class="text-3xl font-bold text-purple-800 text-center bg-purple-100 p-4">
    {{ msg }}
  </h1>
</template>

<style scoped></style>
