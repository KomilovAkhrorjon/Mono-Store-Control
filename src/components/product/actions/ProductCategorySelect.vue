<script setup lang="ts">

import CategoryListItem from "@/components/categories/CategoryListItem.vue";
import {defineProps, defineEmits} from "vue";
import MonoCard from "@/components/common/MonoCard.vue";

defineProps(
    {
      categoryTree: {
        type: Array,
        required: true
      }
    }
)

const emit = defineEmits(['select'])

function selectCategory(category: any) {
  emit('select', category)
}
</script>
<template>
  <div>
    <mono-card class="bg-chrome-bg">
      <category-list-item :edit="false"
                          :add="false"
                          :select="true"
                          @select="selectCategory"
                          :category-tree="categoryTree">
      </category-list-item>
    </mono-card>
  </div>
</template>

<style scoped>

</style>
