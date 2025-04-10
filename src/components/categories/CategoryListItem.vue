<script setup lang="ts">

import FlexCol from "@/components/common/FlexCol.vue";
import AddBtn from "@/components/common/btn/AddBtn.vue";
import EditBtn from "@/components/common/btn/EditBtn.vue";

import {defineProps} from 'vue';
import FlexRow from "@/components/common/FlexRow.vue";
import SelectBtn from "@/components/common/btn/SelectBtn.vue";

defineProps(
    {
      categoryTree: {
        type: Array,
        required: true
      },
      edit: {
        type: Boolean,
        default: true,
        required: false
      },
      add: {
        type: Boolean,
        default: true,
        required: false
      },
      select: {
        type: Boolean,
        default: false,
        required: false
      }
    }
)

function getTitle(category: any) {
  if (!category.titles) {
    return '';
  }
  return category.titles.map((title: any) => title['title'] + ' (' + title.lang + ') ').join(' / ');
}
</script>

<template>
  <flex-col class="text-mg-100 gap-2">
    <div v-for="category in categoryTree"
         class="w-full"
         :key="category.id">
      <q-expansion-item expand-icon-toggle
                        expand-separator
                        dense
                        dark
                        class="border-l p-1.5 w-full gap-2">
        <template #header>
          <flex-row class="gap-2 items-center">
            {{ category.id }} - {{ getTitle(category) }}
            <edit-btn v-if="edit" @click="$emit('edit', category)"/>
            <add-btn v-if="add" @click="$emit('add', category.id)"/>
            <select-btn v-if="select" @click="$emit('select', category)"/>
          </flex-row>
        </template>
        <flex-col v-if="category.children"
                  class="ml-4 gap-2 my-1">
          <category-list-item
              :categoryTree="category.children"
              :edit="edit"
              :add="add"
              :select="select"
              @edit="($event1) => $emit('edit', $event1)"
              @add="($event2) => $emit('add', $event2)"
              @select="($event3) => $emit('select', $event3)"
          />
        </flex-col>
      </q-expansion-item>
    </div>
  </flex-col>
</template>

<style scoped>

</style>
