<script setup lang="ts">

import FlexRow from "@/components/common/FlexRow.vue";
import ViewTitle from "@/components/common/ViewTitle.vue";
import AddBtn from "@/components/common/btn/AddBtn.vue";
import MonoCard from "@/components/common/MonoCard.vue";
import FlexCol from "@/components/common/FlexCol.vue";
import {onMounted, defineEmits, defineProps} from "vue";

import {featureServiceInstance} from "@/service/feature-service";
import FeatureActionComponent from "@/components/feature/FeatureActionComponent.vue";

const service = featureServiceInstance;

const props = defineProps({
  select: {
    type: Boolean,
    default: false,
    required: false
  }
})

const emits = defineEmits(["selected"]);

onMounted(async () => {
  await service.loadAllData()
})

function openActionDialog(feature: any) {

  feature.titles = getTitles(feature);

  service.selectedFeature.value = feature;
  service.actionDialog.value = true;
}

function addFeature() {
  openActionDialog({
    id: null,
    titles: []
  });
}

function getTitles(feature: any) {
  if (feature.titles.length === 0) {
    let titles = [];

    for (let lang of service.getLangs()) {
      titles.push({
        title: '',
        description: '',
        lang: lang
      })
    }

    return titles;
  }

  let titles = [];

  for (let lang of service.getLangs()) {
    let title = feature.titles.find((obj: any) => obj.lang === lang);
    if (title) {
      titles.push(title);
    } else {
      titles.push({
        title: '',
        description: '',
        lang: lang
      })
    }
  }

  return titles;
}

function selectFeature(feature: any) {
  if (props.select) {
    emits('selected', feature)
  } else {
    openActionDialog(feature)
  }
}
</script>

<template>
  <flex-row class="w-full gap-2 items-center">
    <view-title>
      Features
    </view-title>
    <div class="text-white">
      <add-btn @click="addFeature"/>
    </div>
  </flex-row>
  <mono-card class="text-white max-w-3xl">
    <div v-if="!service.mainDataLoading.value"
         class="w-full">
      <flex-col class="w-full gap-2">
        <flex-row v-for="feature in service.features.value"
                  class="w-full"
                  :key="feature.id">
          <q-btn
              dense
              flat
              size="md"
              class="w-full justify-start"
              @click="selectFeature(feature)"
              color="teal-5">
            <div class="w-full text-left q-btn--no-uppercase">
              {{ feature.id }} - {{ service.getTitle(feature['titles']) }}
            </div>
          </q-btn>
        </flex-row>
      </flex-col>
    </div>
  </mono-card>
  <q-dialog v-model="service.actionDialog.value">
    <FeatureActionComponent/>
  </q-dialog>
</template>

<style scoped>

</style>
