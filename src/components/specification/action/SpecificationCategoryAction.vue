<script setup lang="ts">

import MonoCard from "@/components/common/MonoCard.vue";
import FlexRow from "@/components/common/FlexRow.vue";
import FlexCol from "@/components/common/FlexCol.vue";
import ActionTitle from "@/components/common/ActionTitle.vue";
import {useSpecificationService} from "@/service/specification-service";

const service = useSpecificationService();
</script>

<template>
  <div>
    <mono-card class="bg-chrome-bg min-w-max">
      <flex-col class="gap-2">
        <action-title>
          id : {{ service.specificationCategoryForEdit.value?.id }}
        </action-title>
        <template
            v-for="title in service.getAllTitles(service.specificationCategoryForEdit.value.titles)"
            :key="title">
          <q-input
              v-model="title.title"
              :label="'Title ' + title.lang"
              dense
              dark
              class="w-full"
              rounded
              outlined
          />
          <q-input
              v-model="title.description"
              :label="'Description ' + title.lang"
              dense
              dark
              class="w-full"
              rounded
              outlined
          />
        </template>
        <q-checkbox
            v-model="service.specificationCategoryForEdit.value['isActive']"
            label="Is active"
            type="checkbox"
            dense
            dark
            color="teal-5"
            class="w-full text-white ml-2"
            rounded
            outlined
        />
        <flex-row class="w-full justify-end">
          <q-btn
              dense
              outline
              rounded
              class="px-4"
              color="teal-5"
              @click="service.saveSpecificationCategory()">
            Save
          </q-btn>
        </flex-row>
      </flex-col>
    </mono-card>
  </div>
</template>

<style scoped>

</style>
