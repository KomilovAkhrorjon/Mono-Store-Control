<script setup lang="ts">

import MonoCard from "@/components/common/MonoCard.vue";
</script>

<template>
  <mono-card class="text-white pr-2 w-max">
    <div class="max-h-[74vh] overflow-y-scroll w-max">
      <slot></slot>
    </div>
  </mono-card>
</template>

<style scoped>

</style>
