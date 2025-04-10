<script setup lang="ts">

import ActionTitle from "@/components/common/ActionTitle.vue";
import MonoCard from "@/components/common/MonoCard.vue";
import FlexCol from "@/components/common/FlexCol.vue";
import FlexRow from "@/components/common/FlexRow.vue";

import {useSpecificationService} from "@/service/specification-service";

const service = useSpecificationService();

</script>

<template>
  <div>
    <mono-card class="bg-chrome-bg min-w-max">
      <flex-col class="gap-2">
        <action-title>
          id : {{ service.specificationForEdit.value?.id }}
        </action-title>
        <template
            v-for="title in service.getAllTitles(service.specificationForEdit.value.titles)"
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
        <flex-row class="w-full justify-end">
          <q-btn
              dense
              outline
              rounded
              class="px-4"
              color="teal-5"
              @click="service.saveSpecification()">
            Save
          </q-btn>
        </flex-row>
      </flex-col>
    </mono-card>
  </div>
</template>

<style scoped>

</style>
