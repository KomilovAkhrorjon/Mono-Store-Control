<script setup lang="ts">

import MonoCard from "@/components/common/MonoCard.vue";
import FlexCol from "@/components/common/FlexCol.vue";
import ActionTitle from "@/components/common/ActionTitle.vue";
import FlexRow from "@/components/common/FlexRow.vue";
import {useFeatureService} from "@/service/feature-service";

let service = useFeatureService();

</script>

<template>
  <div>
    <mono-card class="bg-chrome-bg">
      <flex-col class="gap-2 w-full">
        <action-title>
          Feature
          {{
            service.selectedFeature.value.id ?
                'Update id: ' + service.selectedFeature.value.id
                : 'Create'
          }}
        </action-title>
        <template v-for="title in service.selectedFeature.value.titles"
                  :key="title.lang">
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
            <q-input
                v-model="title.description"
                :label="'Description ' + title.lang"
                dense
                dark
                class="w-full"
                rounded
                outlined
            />
          </flex-row>
        </template>
        <flex-row>
          <q-btn
              flat
              @click="service.selectedFeature.value.id ? service.update() : service.save()"
              class="text-white bg-green-900 w-full capitalize"
              rounded>
            {{service.selectedFeature.value.id ? 'Update' : 'Save'}}
          </q-btn>
        </flex-row>
      </flex-col>
    </mono-card>
  </div>
</template>

<style scoped>

</style>
