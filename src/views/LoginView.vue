<script setup lang="ts">

import MonoCard from "@/components/common/MonoCard.vue";
import FlexRow from "@/components/common/FlexRow.vue";
import FlexCol from "@/components/common/FlexCol.vue";

import { ref } from "vue";
import {AuthService} from "@/service/auth-service";

let data = ref({
  username: "",
  password: ""
});


let service = new AuthService();

function submit() {
  service.login(data.value);
}

</script>

<template>

  <flex-row class="h-[100vh] bg-chrome-bg justify-center items-center">
    <flex-col>
      <mono-card class="bg-teal-800">
        <flex-col class="gap-3">
          <flex-row>
            <h1 class="text-white text-2xl text-center w-full">
              Login
            </h1>
          </flex-row>
          <flex-row>
            <q-input color="teal-7"
                     bg-color="white"
                     label-color="teal-7"
                     type="text"
                     outlined
                     dense
                     rounded
                     v-model="data.username"
                     label="Login">
            </q-input>
          </flex-row>
          <flex-row>
            <q-input color="teal-7"
                     bg-color="white"
                     label-color="teal-7"
                     type="password"
                     outlined
                     dense
                     rounded
                     v-model="data.password"
                     label="Password">
            </q-input>
          </flex-row>
          <flex-row>
            <q-btn
                flat
                rounded
                class="bg-mg-900 capitalize w-full"
                color="white"
                @click="submit"
                label="submit" />
          </flex-row>
        </flex-col>
      </mono-card>
    </flex-col>
  </flex-row>

</template>

<style scoped>

</style>
