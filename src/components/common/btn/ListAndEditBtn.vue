<script setup lang="ts">

import { defineProps } from 'vue'

const props = defineProps({
  isSelected: Boolean
})

</script>

<template>
  <q-btn
      dense
      flat
      size="md"
      class="w-[90%]"
      :disable="isSelected"
      :class="isSelected ? 'bg-mg-900':''"
      @click="$emit('select')"
      color="teal-5">
    <div class="w-full text-left q-btn--no-uppercase px-2">
      <slot></slot>
    </div>
  </q-btn>
  <q-btn
      dense
      flat
      size="md"
      class="w-[10%]"
      icon="edit"
      @click="$emit('edit')"
      color="teal-5">
  </q-btn>
</template>

<style scoped>

</style>
