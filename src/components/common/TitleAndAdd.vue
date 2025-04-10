<script setup lang="ts">

import FlexRow from "@/components/common/FlexRow.vue";
import ViewTitle from "@/components/common/ViewTitle.vue";
import AddBtn from "@/components/common/btn/AddBtn.vue";
import { defineProps } from "vue";

defineProps({
  addDisabled: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <flex-row class="w-full gap-2 items-center">
    <view-title>
      <slot></slot>
    </view-title>
    <div class="text-white" v-if="addDisabled">
      <add-btn @click="$emit('tap')"/>
    </div>
  </flex-row>
</template>

<style scoped>

</style>
