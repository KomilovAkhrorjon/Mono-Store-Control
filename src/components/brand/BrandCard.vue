<script setup lang="ts">

import MonoCard from "@/components/common/MonoCard.vue";
import {brandServiceInstance} from "@/service/brand-service";
import {onMounted} from "vue";
import FlexCol from "@/components/common/FlexCol.vue";
import FlexRow from "@/components/common/FlexRow.vue";
import BrandActionComponent from "@/components/brand/BrandActionComponent.vue";
import ViewTitle from "@/components/common/ViewTitle.vue";
import AddBtn from "@/components/common/btn/AddBtn.vue";

const service = brandServiceInstance;

onMounted(() => {
  service.loadAllData();
});

function openActionDialog(brand: any) {
  service.selectedBrand.value = brand;
  service.actionDialog.value = true;
}

function addBrand() {
  openActionDialog({
    id: '',
    title: '',
    description: '',
    image: '',
    url: ''
  });
}

</script>

<template>
  <flex-row class="gap-4 items-center">
    <view-title>
      Brands
    </view-title>
    <div class="text-white">
      <add-btn @click="addBrand"/>
    </div>
  </flex-row>
  <mono-card class="text-white max-w-3xl">
    <flex-col v-if="!service.mainDataLoading.value"
              class="gap-2 w-full">
      <flex-row v-for="brand in service.brands.value"
                class="w-full"
                :key="brand.id">
        <q-btn
            class="w-full q-btn--no-uppercase"
            dense
            flat
            size="md"
            @click="openActionDialog(brand)"
            color="teal-5">
          <div class="w-full text-left">
            {{ brand.id }} - {{ brand.title }}
          </div>
        </q-btn>
      </flex-row>
    </flex-col>
  </mono-card>
  <q-dialog v-model="service.actionDialog.value">
    <BrandActionComponent/>
  </q-dialog>

</template>

<style scoped>

</style>
