<script setup lang="ts">

import {useProductService} from "@/service/product-service";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import MonoCard from "@/components/common/MonoCard.vue";
import FlexRow from "@/components/common/FlexRow.vue";
import FlexCol from "@/components/common/FlexCol.vue";
import {Url} from "@/util/urls";

const service = useProductService();
const route = useRoute();
const product = ref();
const id = route.params['id'];
const specificationsByCategory = ref()
let skuList = ref()

onMounted(async () => {
      await service.loadFullProduct(parseInt(id?.toString())).then(res => {
        product.value = res.data
        makeSkuList()
        product.value.skuList = product.value.skuList.map(
            (item: any) =>
                item.specifications =
                    item.specifications.sort((a: any, b: any) => a - b)
        )
      })
    }
)

function logProduct() {
  console.log(product.value)
}

function logSkulist() {
  console.log(skuList.value)
}

function makeSkuList() {

  const idList: any[] = []

  const result = product.value.specifications.reduce((acc, item) => {
    const categoryId = item.category.id;
    if (!acc[categoryId]) {
      acc[categoryId] = [];
      idList.push(categoryId)
    }
    acc[categoryId].push(item);
    return acc;
  }, {} as Record<number, any[]>);

  specificationsByCategory.value = makeIdList(result,
      {parents: [], mainData: []},
      idList,
      0
  ).mainData.sort((a: any, b: any) => a.id - b.id)

  skuList.value = specificationsByCategory.value.map((item: any) => {

    const sku = product.value.skuList.filter((i: any) =>
        i.specifications.length === item.map((i: any) => i.id).length &&
        i.specifications.every((itm: any) => item.map((i: any) => i.id).includes(itm))
    )

    if (sku.length > 0) {
      return {
        name: getSkuInfo(item),
        ...sku[0]
      }
    } else {
      return {
        sku: '',
        name: getSkuInfo(item),
        warehouseId: null,
        specifications: item.map((i: any) => i.id)
      }
    }
  })
}

function makeIdList(
    result: any,
    data: { parents: [], mainData: [] },
    idList: any[],
    index: number): any {
  for (const resultElement of result[idList[index]?.toString()]) {
    if (index === idList.length - 1) {
      data.mainData.push([...data.parents, resultElement])
    } else {
      makeIdList(
          result,
          {
            parents: [...data.parents, resultElement],
            mainData: data.mainData
          },
          idList,
          index + 1)
    }
  }
  return data
}

function getSkuInfo(skuList: any[]) {
  let name = '';
  for (const skuListElement of skuList) {
    name += service.getTitleByLang(skuListElement.titles, 'UZ').title + ' - '
  }
  return name
}

async function getWarehouseInfo(sku: any) {
  if (sku.warehouseId === null || sku.warehouseId === '') return

  const warehouseInfo = await service.http.get(`${Url.PRODUCT_SKU}/${sku.warehouseId}`)
  sku.sku = warehouseInfo.data.sku
}

</script>

<template>
  <mono-card class="text-white" v-if="product">
    <flex-col class="gap-4 w-full">
      <flex-row class="w-full">
        <q-btn @click="logProduct"
               class="text-white"
               label="Log product"/>
        <q-btn @click="logSkulist" class="text-white" label="make"/>
        <q-btn @click="$router.go(-1)" class="text-white" label="Back"/>
      </flex-row>
      <flex-row v-for="sku in skuList"
                :key="sku"
                class="gap-2 w-full items-center">
        {{ sku.name }}
        <q-input v-model="sku.warehouseId"
                 label="Warehouse ID"
                 dense
                 dark
                 @focusout="getWarehouseInfo(sku)"
                 type="number"
                 class=""
                 outlined/>
        {{ sku.sku }}
        <q-separator class="w-full" dark/>
      </flex-row>
    </flex-col>
  </mono-card>
  <flex-row>
    <q-btn @click="service.saveSkuList(skuList, id)"
           class="text-white mt-4"
           outline
           color="teal-5"
           rounded
           label="Save"/>
  </flex-row>
</template>

<style scoped>

</style>
