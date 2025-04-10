<script setup lang="ts">

import SpecificationsCard from "@/components/specification/SpecificationsCard.vue";
</script>

<template>
  <div class="bg-chrome-bg p-4 rounded-2xl border-mg-600 border">
    <SpecificationsCard @selected="($ev: any) => $emit('selected', $ev)"
                        :specification-select="true"/>
  </div>
</template>

<style scoped>
@media (min-width: 600px) {
  .q-dialog__inner--minimized > div {
    max-width: 100vw;
  }
}

.q-dialog__inner > div {
  border-radius: 1rem;
}
</style>
