<script setup lang="ts">

</script>

<template>
  <q-btn
      dense
      flat
      size="md"
      @click="$emit('tap')"
      class="w-full"
      color="teal-5">
    <div class="w-full text-left q-btn--no-uppercase px-2">
      <slot></slot>
    </div>
  </q-btn>
</template>

<style scoped>

</style>
