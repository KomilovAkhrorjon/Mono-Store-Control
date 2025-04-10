<script setup lang="ts">

import {useCategoriesService} from "@/service/categories-service";
import MonoCard from "@/components/common/MonoCard.vue";
import FlexCol from "@/components/common/FlexCol.vue";
import FlexRow from "@/components/common/FlexRow.vue";
import {ref} from "vue";

const service = useCategoriesService();
const selectedFile = ref<File | null>(null);
function uploadFile(title: any, field: string){
  service.uploadFile(selectedFile.value);
}
</script>

<template>
  <div>
    <mono-card class="bg-chrome-bg">
      <flex-col class="gap-2 w-full">
        <flex-row class="text-white text-lg">
          id: {{ service.selectedCategory.value.id }}
        </flex-row>
        <flex-row v-for="title in service.selectedCategory.value.titles"
                  class="w-full"
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
        <flex-row v-for="keys in service.categoryFields.value"
                  class="w-full"
                  :key="keys.key">
          <q-checkbox v-if="keys.type === 'checkbox'"
                      class="text-white border-gray-300 rounded-full border w-full"
                      dark
                      color="teal"
                      v-model="service.selectedCategory.value[keys.key]"
                      :label="keys.label"/>
          <q-input
              v-if="keys.type !== 'checkbox'"
              v-model="service.selectedCategory.value[keys.key]"
              :label="keys.label"
              :type="keys.type"
              dense
              class="w-full"
              dark
              rounded
              outlined
          />
        </flex-row>
        <flex-row>
          <q-img
              :src="service.fileStorage + service.selectedCategory.value.icon"
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
              @update:model-value="uploadFile( 'banner')"
              label="Photo"
              dense
              dark
              class="w-full"
              rounded
              outlined
          />
        </flex-row>
        <flex-row>
          <q-btn
              flat
              @click="service.updateOrCreateCategory()"
              class="text-white bg-green-900 w-full capitalize"
              rounded>
            {{service.selectedCategory.value.id ? 'Update' : 'Save'}}
          </q-btn>
        </flex-row>
      </flex-col>
    </mono-card>
  </div>
</template>

<style scoped>

.q-dialog__inner--minimized > div {
  max-width: 350px;
}

</style>
