<script setup lang="ts">
import {onMounted} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {Routes} from "@/router/routes";

let store = useStore();
let router = useRouter();

onMounted(() => {
  store.commit("authenticate", localStorage.getItem("token"))
  
  if (!localStorage.getItem("token")) {
    router.push(Routes.LOGIN)
  }

});
</script>
<template>
  <router-view/>
</template>
