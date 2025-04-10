<script setup lang="ts">

import FlexCol from "@/components/common/FlexCol.vue";
import TitleAndAdd from "@/components/common/TitleAndAdd.vue";
import MonoCard from "@/components/common/MonoCard.vue";
import FlexRow from "@/components/common/FlexRow.vue";
import ListBtn from "@/components/common/btn/ListBtn.vue";
import {sliderServiceInstance} from "@/service/slider-service";

import {onMounted} from "vue";
import SliderAction from "@/components/slider/SliderAction.vue";

const service = sliderServiceInstance;

onMounted(async () => {
  await service.loadSliders()
})

</script>

<template>
  <flex-col class="w-full gap-2">
    <title-and-add @tap="service.openSliderForEdit(service.mockSlider)">
      Sliders
    </title-and-add>
    <mono-card v-if="!service.mainDataLoading.value" class="max-w-3xl">
      <flex-col class="gap-2 w-full">
        <flex-row v-for="slider in service.sliders.value"
                  class="w-full"
                  :key="slider">
          <list-btn @tap="service.openSliderForEdit(slider)">
            {{ slider.id }} - {{ service.getTitle(slider.titles) }}
          </list-btn>
        </flex-row>
      </flex-col>
    </mono-card>
  </flex-col>
  <q-dialog v-model="service.sliderAction.value">
    <SliderAction/>
  </q-dialog>
</template>

<style scoped>

</style>
