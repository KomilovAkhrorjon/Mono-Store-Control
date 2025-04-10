<script setup lang="ts">

import FlexRow from "@/components/common/FlexRow.vue";
import FlexCol from "@/components/common/FlexCol.vue";
import TitleAndAdd from "@/components/common/TitleAndAdd.vue";

import {onMounted, defineProps, defineEmits} from "vue";
import YScrollableContainer from "@/components/common/container/YScrollableContainer.vue";
import {specificationServiceInstance} from "@/service/specification-service";
import ListAndEditBtn from "@/components/common/btn/ListAndEditBtn.vue";
import ListBtn from "@/components/common/btn/ListBtn.vue";
import SpecificationCategoryAction
  from "@/components/specification/action/SpecificationCategoryAction.vue";
import SpecificationAction from "@/components/specification/action/SpecificationAction.vue";

const props = defineProps({
  specificationSelect: {
    type: Boolean,
    default: false,
    required: false
  }
})

const emits = defineEmits(["selected"]);

const service = specificationServiceInstance;

onMounted(async () => {
  await service.loadSpecificationCategories()
})

function specificationEvent(specification: any) {
  if (props.specificationSelect) {
    console.log(specification)
    emits('selected', specification)
  } else {
    service.openSpecificationForEdit(specification)
  }
}

</script>

<template>
  <flex-row class="gap-2 transition-all">
    <flex-col class="w-max">
      <title-and-add
          @tap="service.openSpecificationCategoryForEdit(service.mockSpecificationCategory)">
        Specification categories
      </title-and-add>
      <y-scrollable-container v-if="!service.loadingSpecification.value">
        <flex-row v-for="i in service.specificationCategories.value" :key="i">
          <list-and-edit-btn @select="service.loadSpecifications(i)"
                             @edit="service.openSpecificationCategoryForEdit(i)"
                             :is-selected="service.selectedSpecificationCategory.value === i">
            {{ i.id }} - {{ service.getTitle(i.titles) }}
          </list-and-edit-btn>
        </flex-row>
      </y-scrollable-container>
    </flex-col>
    <flex-col v-if="service.selectedSpecificationCategory.value.id != 0">
      <title-and-add
          @tap="service.openSpecificationForEdit(service.mockSpecification)">
        Specifications
      </title-and-add>
      <y-scrollable-container>
        <flex-col>
          <flex-row v-for="i in service.specifications.value" :key="i.id">
            <list-btn @tap="specificationEvent(i)">
              {{ i.id }} - {{ service.getTitle(i.titles) }}
            </list-btn>
          </flex-row>
        </flex-col>
      </y-scrollable-container>
    </flex-col>
  </flex-row>

  <q-dialog v-model="service.specificationCategoryAction.value">
    <SpecificationCategoryAction/>
  </q-dialog>

  <q-dialog v-model="service.specificationAction.value">
    <SpecificationAction/>
  </q-dialog>
</template>

<style scoped>

</style>
