<script setup lang="ts">

import MonoCard from "@/components/common/MonoCard.vue";
import FlexCol from "@/components/common/FlexCol.vue";
import ActionTitle from "@/components/common/ActionTitle.vue";
import {useGiftService} from "@/service/gift-service";
import FlexRow from "@/components/common/FlexRow.vue";

const service = useGiftService();

</script>

<template>
  <div>
    <mono-card class="bg-chrome-bg">
      <flex-col class="gap-2">
        <action-title class="w-full">
          id : {{ service.giftTypeForEdit.value?.id }}
        </action-title>
        <flex-row v-for="title in service.getAllTitles(service.giftTypeForEdit.value.titles)"
                  class=""
                  :key="title.lang">
          <q-input
              v-model="title.title"
              :label="'Title ' + title.lang"
              dense
              dark
              class="w-full"
              rounded
              outlined
          />
        </flex-row>
        <flex-row>
          <q-input
              v-model="service.giftTypeForEdit.value['type']"
              label="Type"
              dense
              dark
              class="w-full"
              rounded
              outlined
          />
        </flex-row>
        <flex-row>
          <q-checkbox
              v-model="service.giftTypeForEdit.value['isActive']"
              label="Is active"
              type="checkbox"
              dense
              dark
              class="w-full text-white ml-2"
              rounded
              outlined
          />
        </flex-row>
        <flex-row class="w-full justify-end">
          <q-btn @click="service.saveGiftType()"
                 outline
                 rounded
                 class="w-full"
                 color="teal-5">
            Save
          </q-btn>
        </flex-row>
      </flex-col>
    </mono-card>
  </div>
</template>

<style scoped>
@media (min-width: 600px) {
  .q-dialog__inner--minimized > div {
    max-width: max-content;
    min-width: max-content;
    width: max-content;
  }
}
</style>
