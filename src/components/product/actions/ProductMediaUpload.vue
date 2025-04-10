<script setup lang="ts">

import MonoCard from "@/components/common/MonoCard.vue";
import FlexRow from "@/components/common/FlexRow.vue";
import {defineProps, ref} from "vue";
import {useProductService} from "@/service/product-service";
import FlexCol from "@/components/common/FlexCol.vue";

defineProps(['product'])
const service = useProductService();
const currentFile = ref<File | null>(null);
</script>

<template>
  <mono-card class="bg-chrome-bg w-full h-full gap-4 text-white">
    <flex-row class="w-full justify-between">
      <div></div>
      <div>
        <q-btn icon="close" v-close-popup color="teal-5" outline round flat/>
      </div>
    </flex-row>
    <template v-for="media in product.mediaList"
              :key="media">
      <flex-col class="gap-2">
        <q-img
            :src="service.fileStorage + media.url"
            class="w-52"
            :alt="media.realName">
          <q-btn
              class="absolute all-pointer-events drop-shadow-md"
              name="info"
              color="red"
              icon="remove"
              outline
              round
              @click="$emit('removeMedia', media)"
              dense
              style="top: 8px; right: 8px">
          </q-btn>
          <template v-slot:loading>
            <div class="text-white">
              <q-spinner-ios/>
            </div>
          </template>
        </q-img>
        <flex-row>
          <q-input
              v-model="media.orderNumber"
              :label="media.size"
              dense
              dark
              type="number"
              class="w-full"
              rounded
              outlined/>
        </flex-row>
      </flex-col>
    </template>
    <flex-row>
      <q-file
          v-model="currentFile"
          @update:model-value="$emit('uploadMedia', currentFile)"
          label="Image"
          dense
          dark
          class="w-full"
          rounded
          outlined
      />
    </flex-row>
  </mono-card>
</template>

<style scoped>

</style>
