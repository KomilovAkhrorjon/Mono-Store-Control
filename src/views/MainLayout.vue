<script setup lang="ts">
import {ref} from "vue";
import {Routes} from "@/router/routes";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const route = useRoute()

const drawer = ref(false);
const miniState = ref(true)

const menuList = ref([
  {
    title: "Products",
    icon: "inventory_2",
    name: "products",
    route: Routes.PRODUCTS
  },
  {
    title: "Sliders",
    icon: "slideshow",
    name: "sliders",
    route: Routes.SLIDERS
  },
  {
    title: "Specifications",
    name: "specifications",
    icon: "format_list_numbered",
    route: Routes.SPECIFICATIONS
  },
  {
    title: 'Gifts',
    name: 'gifts',
    icon: 'redeem',
    route: Routes.GIFTS
  },
  {
    title: 'Feature',
    name: 'feature',
    icon: 'star_rate',
    route: Routes.FEATURE
  },
  {
    title: 'Brands',
    name: 'brand',
    icon: 'copyright',
    route: Routes.BRAND
  },
  {
    title: 'Countries',
    name: 'countries',
    icon: 'location_on',
    route: Routes.COUNTRIES
  },
  {
    title: 'Categories',
    name: 'categories',
    icon: 'account_tree',
    route: Routes.CATEGORIES
  }
])

function push(route: string) {
  router.push(route)
}
</script>

<template>
  <q-layout view="lHh Lpr lff" container class="h-[100vh] bg-chrome-bg">
    <q-header class="bg-mg-900">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu"/>
        <q-toolbar-title>mono</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="drawer"
        show-if-above

        :mini="miniState"
        @mouseenter="miniState = false"
        @mouseleave="miniState = true"
        mini-to-overlay

        :width="200"
        :breakpoint="600"
        class="bg-green-950 text-white border-r-transparent"
    >
      <q-scroll-area class="fit border-r-0"
                     :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>
          <q-item
              v-for="menu in menuList"
              clickable
              :active="route.name === menu.name"
              active-class="text-teal-7"
              @click="push(menu.route)"
              :key="menu.route"
              v-ripple>
            <q-item-section avatar>
              <q-icon :name="menu.icon"/>
            </q-item-section>
            <q-item-section>
              {{ menu.title }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <router-view/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>

</style>
