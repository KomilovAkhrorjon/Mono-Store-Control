<script setup lang="ts">

import MonoCard from "@/components/common/MonoCard.vue";
import {useCountryService} from "@/service/country-service";
import FlexCol from "@/components/common/FlexCol.vue";
import FlexRow from "@/components/common/FlexRow.vue";
import ActionTitle from "@/components/common/ActionTitle.vue";

const service = useCountryService();
</script>

<template>
  <div>
    <mono-card class="bg-chrome-bg">
      <flex-col class="gap-2 w-full">
        <action-title>
          id: {{ service.selectedCountry.value.id }}
        </action-title>
        <flex-row v-for="title in service.selectedCountry.value.titles"
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
        <flex-row v-for="keys in service.countrKeys.value"
                  class="w-full"
                  :key="keys.key">
          <q-checkbox v-if="keys.type === 'checkbox'"
                      class="text-white border-gray-300 rounded-full border w-full"
                      dark
                      color="teal"
                      v-model="service.selectedCountry.value[keys.key]"
                      :label="keys.label"/>
          <q-input
              v-if="keys.type !== 'checkbox'"
              v-model="service.selectedCountry.value[keys.key]"
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
          <q-btn
              flat
              @click="service.saveOrCreateCountry()"
              class="text-white bg-green-900 w-full capitalize"
              rounded>
            {{service.selectedCountry.value.id ? 'Update' : 'Save'}}
          </q-btn>
        </flex-row>
      </flex-col>
    </mono-card>
  </div>
</template>

<style scoped>

</style>
