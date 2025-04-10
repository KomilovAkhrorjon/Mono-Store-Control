<script setup lang="ts">

import MonoCard from "@/components/common/MonoCard.vue";
import FlexCol from "@/components/common/FlexCol.vue";
import ActionTitle from "@/components/common/ActionTitle.vue";
import FlexRow from "@/components/common/FlexRow.vue";
import {useGiftService} from "@/service/gift-service";

import {ref} from "vue";

const selectedFile = ref<File | null>(null);
const service = useGiftService();

function uploadFile(title: any, field: string){
  service.uploadFile(selectedFile.value).then(res => {
    title[field] = res.data.url;
  });
}

</script>

<template>
  <div>
    <mono-card class="bg-chrome-bg">
      <flex-row class="gap-2">
        <action-title class="w-full">
          id : {{ service.giftCategoryForEdit.value?.id }}
        </action-title>
        <flex-col v-for="title in service.getAllTitles(service.giftCategoryForEdit.value.titles)"
                  class="gap-2"
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
          <flex-row>
            <q-img
                :src="service.fileStorage + title.photo"
                class="w-52">
              <template v-slot:loading>
                <div class="text-white">
                  <q-spinner-ios/>
                </div>
              </template>
            </q-img>
          </flex-row>
          <flex-row>
            <q-file
                v-model="selectedFile"
                @update:model-value="uploadFile(title, 'photo')"
                label="Photo"
                dense
                dark
                class="w-full"
                rounded
                outlined
            />
          </flex-row>
          <flex-row>
            <q-img
                :src="service.fileStorage + title.banner"
                class="w-52">
              <template v-slot:loading>
                <div class="text-white">
                  <q-spinner-ios/>
                </div>
              </template>
            </q-img>
          </flex-row>
          <flex-row>
            <q-file
                v-model="selectedFile"
                @update:model-value="uploadFile(title, 'banner')"
                label="Photo"
                dense
                dark
                class="w-full"
                rounded
                outlined
            />
          </flex-row>
        </flex-col>
        <flex-col class="justify-center content-center items-center gap-4">
          <q-checkbox
              v-model="service.giftCategoryForEdit.value['isActive']"
              label="Is active"
              type="checkbox"
              dense
              dark
              class="w-full text-white ml-2"
              rounded
              outlined
          />
          <q-input
              v-model="service.giftCategoryForEdit.value['link']"
              :label="'Link'"
              dense
              dark
              class="w-full"
              rounded
              outlined
          />
          <q-input
              v-model="service.giftCategoryForEdit.value['orderNo']"
              label="Order"
              dense
              dark
              class="w-full"
              rounded
              outlined
          />
        </flex-col>
        <flex-row class="w-full justify-end">
          <q-btn @click="service.saveGiftCategory()"
                 outline
                 rounded
                 color="teal-5"
          >
            Save
          </q-btn>
        </flex-row>
      </flex-row>
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
