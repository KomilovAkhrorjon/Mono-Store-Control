<script setup lang="ts">

import FlexRow from "@/components/common/FlexRow.vue"
import FlexCol from "@/components/common/FlexCol.vue";
import {giftServiceInstance} from "@/service/gift-service";
import {onMounted} from "vue";
import GiftTypeActionComponent from "@/components/gift/actions/GiftTypeActionComponent.vue";
import GiftCategoryActionComponent from "@/components/gift/actions/GiftCategoryActionComponent.vue";
import TitleAndAdd from "@/components/common/TitleAndAdd.vue";
import ListAndEditBtn from "@/components/common/btn/ListAndEditBtn.vue";
import ListBtn from "@/components/common/btn/ListBtn.vue";
import YScrollableContainer from "@/components/common/container/YScrollableContainer.vue";

const service = giftServiceInstance;

onMounted(async () => {
  await service.loadGiftTypes()
})

</script>

<template>
  <flex-row class="grid-cols-3 gap-4 text-white w-full">
    <flex-col class="w-max">
      <title-and-add @tap="service.openGiftTypeAction(service.giftTypeForEdit.value)">
        Gift Types
      </title-and-add>
      <y-scrollable-container>
        <flex-row v-for="i in service.giftTypes.value"
                  :key="i.id"
                  class="w-full justify-between">
          <list-and-edit-btn @select="service.selectGiftType(i)"
                             @edit="service.openGiftTypeAction(i)"
                             :is-selected="service.selectedGiftType.value?.id === i.id">
            {{ service.getTitle(i.titles) }}
          </list-and-edit-btn>
        </flex-row>
      </y-scrollable-container>
    </flex-col>
    <flex-col v-if="service.selectedGiftType.value.id !== 0" class="">
      <title-and-add @tap="service.openGiftCategoryAction(service.giftCategoryMock)">
        Gift Categories
      </title-and-add>
      <y-scrollable-container>
        <flex-col>
          <flex-row v-for="i in service.giftCategories.value"
                    :key="i.id"
                    class="w-full justify-between pr-1">
            <list-and-edit-btn @select="service.selectGiftCategory(i)"
                               @edit="service.openGiftCategoryAction(i)"
                               :is-selected="service.selectedGiftCategory.value?.id == i.id">
              {{ service.getTitle(i.titles) }}
            </list-and-edit-btn>
          </flex-row>
        </flex-col>
      </y-scrollable-container>
    </flex-col>
    <flex-col v-if="service.selectedGiftCategory.value?.id !== 0 && !service.mainDataLoading.value">
      <title-and-add :add-disabled="false">
        Category Products
        <q-btn icon="save"
               @click="service.saveCategoryProducts()"
               round>
        </q-btn>
      </title-and-add>
      <y-scrollable-container>
        <flex-row class="w-full justify-between"
                  v-for="product in service.getAllProducts()"
                  :key="product.id">
          <list-btn @tap="service.changeProductSelection(product)"
                    :class="service.isSelected(product.id) ? '':'pl-8'">
            <q-icon v-if="service.isSelected(product.id)"
                    color="white"
                    name="done"/>
            {{product.id}} - {{ product.title }}
          </list-btn>
        </flex-row>
      </y-scrollable-container>
    </flex-col>
  </flex-row>

  <q-dialog v-model="service.actionDialog.value">
    <GiftTypeActionComponent/>
  </q-dialog>

  <q-dialog v-model="service.giftCategoryAction.value">
    <GiftCategoryActionComponent/>
  </q-dialog>
</template>

<style scoped>
</style>
