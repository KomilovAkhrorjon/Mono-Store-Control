<script setup lang="ts">

import {onMounted} from "vue";
import {countryServiceInstance} from "@/service/country-service";
import MonoCard from "@/components/common/MonoCard.vue";
import FlexCol from "@/components/common/FlexCol.vue";
import FlexRow from "@/components/common/FlexRow.vue";
import CountryActionComponent from "@/components/countries/CountryActionComponent.vue";
import ViewTitle from "@/components/common/ViewTitle.vue";
import AddBtn from "@/components/common/btn/AddBtn.vue";

const service = countryServiceInstance;

onMounted(async () => {
  await service.loadAllData()
})

function openActionDialog(country: any) {

  country.titles = getTitles(country);

  service.selectedCountry.value = country;
  service.actionDialog.value = true;
}

function getTitles(country: any) {
  if (country.titles.length === 0) {
    let titles = [];

    for (let lang of service.getLangs()) {
      titles.push({
        title: '',
        lang: lang
      })
    }

    return titles;
  }

  let titles = [];

  for (let lang of service.getLangs()) {
    let title = country.titles.find((obj: any) => obj.lang === lang);
    if (title) {
      titles.push(title);
    } else {
      titles.push({
        title: '',
        lang: lang
      })
    }
  }

  return titles;
}

function addCountry() {
  service.selectedCountry.value = {
    id: null,
    code: '',
    titles: getTitles({titles: []}),
  }
  openActionDialog(service.selectedCountry.value);
}

</script>

<template>
  <flex-row class="w-full gap-2 text-white items-center">
    <view-title>
      Countries
    </view-title>
    <div>
      <add-btn @click="addCountry"/>
    </div>
  </flex-row>
  <mono-card class="max-w-3xl">
    <div v-if="!service.mainDataLoading.value"
         class="w-full">
      <flex-col class="w-full gap-2">
        <flex-row v-for="country in service.countries.value"
                  class="w-full"
                  :key="country.id">
          <q-btn
              dense
              flat
              size="md"
              class="w-full justify-start"
              @click="openActionDialog(country)"
              color="teal-5">
            <div class="w-full text-left q-btn--no-uppercase">
              {{ country.id }} - {{ service.getTitle(country['titles']) }}
            </div>
          </q-btn>
        </flex-row>
      </flex-col>
    </div>
  </mono-card>

  <q-dialog v-model="service.actionDialog.value">
    <CountryActionComponent/>
  </q-dialog>
</template>

<style scoped>

</style>
