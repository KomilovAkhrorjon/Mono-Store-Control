<script setup lang="ts">

import {useBrandService} from "@/service/brand-service";
import MonoCard from "@/components/common/MonoCard.vue";
import FlexCol from "@/components/common/FlexCol.vue";
import FlexRow from "@/components/common/FlexRow.vue";
import {ref} from "vue";

const service = useBrandService();
const selectedFile = ref < File | null > (null);

</script>

<template>
  <div>
    <mono-card class="text-white bg-chrome-bg">
      <flex-col class="gap-2">
        <flex-row class="text-lg">
          id: {{ service.selectedBrand.value.id }}
        </flex-row>
        <flex-row v-for="title in service.brandKeys.value"
                  class="w-full"
                  :key="title.key">
          <q-input
              v-model="service.selectedBrand.value[title.key]"
              :label="title.label"
              dense
              dark
              class="w-full"
              rounded
              outlined
              :type="title.type"
          />
        </flex-row>
        <flex-row>
          <q-img
              :src="service.fileStorage + service.selectedBrand.value.logo"
              class="w-52"
              :alt="service.selectedBrand.value.id">
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
              @update:model-value="service.uploadLogo(selectedFile)"
              label="Image"
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
              @click="service.saveOrCreateBrand()"
              class="text-white bg-green-900 w-full capitalize"
              rounded>
            {{service.selectedBrand.value.id ? 'Update' : 'Save'}}
          </q-btn>
        </flex-row>
      </flex-col>
    </mono-card>
  </div>
</template>

<style scoped>

</style>
