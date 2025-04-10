<script setup lang="ts">

import MonoCard from "@/components/common/MonoCard.vue";
import {onMounted} from "vue";
import {productServiceInstance} from "@/service/product-service";
import TitleAndAdd from "@/components/common/TitleAndAdd.vue";
import ListBtn from "@/components/common/btn/ListBtn.vue";
import {useRouter} from "vue-router";
import {Routes} from "@/router/routes";

const service = productServiceInstance;
const router = useRouter()

onMounted(async () => {
  await service.loadProductList()
})

function editProduct(id: number) {
  router.push(`${Routes.PRODUCT_MAIN}${id}`)
}
</script>
<template>
  <title-and-add @tap="editProduct(0)">
    Products
  </title-and-add>
  <div class="flex flex-auto gap-2 text-white justify-center">
    <mono-card v-for="product in service.productList.value"
               class="w-fit max-w-64"
               :key="product">
      <list-btn @tap="editProduct(product.id)"
                class="flex flex-col w-fit rounded-xl gap-2">
        <q-img
            :src="service.fileStorage + product.medias[1]?.url"
            class="w-52 rounded-xl">
          <template v-slot:loading>
            <div class="text-white">
              <q-spinner-ios/>
            </div>
          </template>
        </q-img>
       <div>
         {{ product.id }} - {{ product.title }}
       </div>
      </list-btn>
    </mono-card>
  </div>
</template>

<style scoped>

</style>
