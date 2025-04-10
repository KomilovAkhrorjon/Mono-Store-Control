<script setup lang="ts">

import MonoCard from "@/components/common/MonoCard.vue";
import ActionTitle from "@/components/common/ActionTitle.vue";

import {useSliderService} from "@/service/slider-service";
import FlexCol from "@/components/common/FlexCol.vue";
import FlexRow from "@/components/common/FlexRow.vue";

const service = useSliderService();
</script>

<template>
  <div>
    <mono-card class="bg-chrome-bg">
      <flex-row class="w-full">
        <action-title>
          id: {{ service.sliderForEdit.value.id }}
        </action-title>
      </flex-row>
      <flex-row class="w-full gap-2">
        <flex-col class="gap-2 min-w-4xl">
          <flex-row>
            <q-input
                v-model="service.sliderForEdit.value.link"
                label="Link"
                dense
                dark
                class="w-full"
                rounded
                outlined
            />
          </flex-row>
          <flex-row>
            <q-input
                v-model="service.sliderForEdit.value.orderNo"
                label="Order"
                dense
                dark
                type="number"
                class="w-full"
                rounded
                outlined
            />
          </flex-row>
          <flex-row>
            <q-input
                v-model="service.sliderForEdit.value.place"
                label="Place"
                dense
                dark
                class="w-full"
                rounded
                outlined
            />
          </flex-row>
          <flex-row>
            <q-checkbox
                v-model="service.sliderForEdit.value['isActive']"
                label="Is active"
                type="checkbox"
                dense
                dark
                color="teal-5"
                class="w-full text-white ml-2"
                rounded
                outlined
            />
          </flex-row>
          <flex-row class="w-full text-white">
            <q-input dense
                     v-model="service.sliderForEdit.value.color"
                     label="Color"
                     dark
                     class="w-full rounded-3xl"
                     rounded
                     outlined
                     :style="{background:service.sliderForEdit.value.color}">
              <q-menu>
                <q-color v-model="service.sliderForEdit.value.color"
                         no-header
                         no-footer
                         formatModel="hex"
                         dark
                         class="w-16"/>
              </q-menu>
            </q-input>
          </flex-row>
        </flex-col>
        <flex-col v-for="title in service.sliderForEdit.value.titles"
                  class="gap-2 max-w-3xl"
                  :key="title">
          <flex-row>
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
            <q-img
                :src="service.fileStorage + service.getMedia(title.mediaList).url"
                class="w-52"
                :alt="service.getMedia(title.mediaList).realName">
              <template v-slot:loading>
                <div class="text-white">
                  <q-spinner-ios/>
                </div>
              </template>
            </q-img>
          </flex-row>
          <flex-row>
            <q-file
                v-model="service.getFile(title.lang).file"
                @update:model-value="service.uploadMedia(title)"
                label="Image"
                dense
                dark
                class="w-full"
                rounded
                outlined
            />
          </flex-row>
        </flex-col>
      </flex-row>
      <flex-row class="justify-end w-full">
        <q-btn
            outline
            color="teal-5"
            @click="service.saveSlider()"
            class="text-white px-6 capitalize"
            rounded>
          Save
        </q-btn>
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
