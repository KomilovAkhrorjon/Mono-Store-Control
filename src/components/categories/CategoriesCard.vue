<script setup lang="ts">

import MonoCard from "@/components/common/MonoCard.vue";
import {onMounted} from "vue";
import {categoriesServiceInstance} from "@/service/categories-service";
import CategoryEditComponent from "@/components/categories/CategoryActionComponent.vue";
import CategoryListItem from "@/components/categories/CategoryListItem.vue";

const mockTitles = [
  {
    title: '',
    lang: 'UZ'
  },
  {
    title: '',
    lang: 'RU'
  },
  {
    title: '',
    lang: 'EN'
  }
]

const mockData = {
  id: null,
  parentId: 0,
  titles: mockTitles,
  isPublic: false,
  icon: '',
  priority: 0,
}

const service = categoriesServiceInstance;

onMounted(async () => {
  await service.getCategoryTree()
})

function editCategory(category: any) {
  service.selectedCategory.value = category
  if (service.selectedCategory.value.titles.length === 0) {
    console.log('titles is empty')
    service.selectedCategory.value.titles = mockTitles
  }
  service.formDialog.value = true;
}

function addNewForParent(parentId: number) {
  service.selectedCategory.value = {
    id: null,
    parentId: parentId,
    titles: [
      {
        title: '',
        lang: 'UZ'
      },
      {
        title: '',
        lang: 'RU'
      },
      {
        title: '',
        lang: 'EN'
      }],
    isPublic: false,
    icon: '',
    priority: 0,
  }
  service.formDialog.value = true
}

</script>

<template>
  <mono-card class="border-teal-800"
             v-if="service.mainDataLoading">
    <category-list-item
        :categoryTree="service.categoryTree.value"
        @edit="editCategory"
        @add="addNewForParent"
    />
  </mono-card>

  <q-dialog v-model="service.formDialog.value">
    <CategoryEditComponent/>
  </q-dialog>
</template>

<style scoped>

</style>
