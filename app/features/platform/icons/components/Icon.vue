<script setup lang="ts">
defineProps<{
  name: TIcons
}>()
</script>

<template>
  <NuxtIcon :key="name" :name="`icon:${name}`" />
</template>
