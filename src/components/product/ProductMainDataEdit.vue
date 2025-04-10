<script setup lang="ts">

import {useProductService} from "@/service/product-service";
import {onMounted, ref, watch} from "vue";
import MonoCard from "@/components/common/MonoCard.vue";
import {useRoute} from "vue-router";
import FlexRow from "@/components/common/FlexRow.vue";
import {useCategoriesService} from "@/service/categories-service";
import FlexCol from "@/components/common/FlexCol.vue";
import ListBtn from "@/components/common/btn/ListBtn.vue";
import ProductCategorySelect from "@/components/product/actions/ProductCategorySelect.vue";
import {useCountryService} from "@/service/country-service";
import {useBrandService} from "@/service/brand-service";
import ProductSpecificationSelect
  from "@/components/product/actions/ProductSpecificationSelect.vue";
import ProductFeatureSelect from "@/components/product/actions/ProductFeatureSelect.vue";
import {Url} from "@/util/urls";
import ProductDescription from "@/components/product/actions/ProductDescription.vue";
import ProductMediaUpload from "@/components/product/actions/ProductMediaUpload.vue";
import router from "@/router";
import {Routes} from "@/router/routes";

const service = useProductService();
const categoryService = useCategoriesService()
const route = useRoute();
const dataLoading = ref(true);
const categorySelectState = ref(false);
const categoryMultilang = ref(true)
const specificationAddState = ref(false)
const fueatureAddState = ref(false)
const countryService = useCountryService()
const brandService = useBrandService()
const descriptionDialog = ref(false)

const id = route.params['id'];

const product = ref({
  id: 0,
  titles: [
    {
      title: '',
      lang: 'UZ'
    },
    {
      title: '',
      lang: 'RU'
    },
    {
      title: '',
      lang: 'EN'
    }
  ],
  warehouseId: 0,
  categoryId: 0,
  category: {id: 0},
  country: {id: 0, titles: [], code: ''},
  brand: {id: 0, titles: []},
  model: '',
  attributes: [{id: 0, description: '', lang: ''}],
  specifications: [],
  features: [],
  status: '',
  descriptions: [{}],
  mediaList: []
});
const productStatuses = ref(['ACTIVE', 'INACTIVE', 'DELETED'])

onMounted(async () => {
  await loadData()
})

async function loadData() {
  if (id != '0') {
    await service.loadFullProduct(parseInt(id.toString())).then(res => {
      product.value = res.data;
    });
  }

  product.value.titles = service.getAllTitles(product.value.titles)
  product.value.descriptions = service.getAllDescriptions(product.value.descriptions)

  await categoryService.getCategoryTree();
  await countryService.loadAllData();
  await brandService.loadAllData();

  dataLoading.value = false;
}

function openCategorySelect() {
  categorySelectState.value = true;
}

async function selectCategory(category: any) {
  await categoryService.getOneLevelCategory(category.id).then(res => {
    product.value['categoryId'] = category.id
    product.value['category'] = res.data
    categorySelectState.value = false;
    categoryMultilang.value = false
  })
}

function getCategoryName(category: any, title: string): string {
  if (!category) return title
  const actualTitle = (categoryMultilang.value ? service.getTitleByLang(category.titles, 'UZ')?.title : category.title)
  if (category.parent !== null) {
    const newTitle = title ? actualTitle + ' > ' + title : actualTitle
    return getCategoryName(category.parent, newTitle)
  }
  return actualTitle + ' > ' + title
}

function addAttribute() {
  product.value.attributes.push({description: '', lang: "UZ"})
  product.value.attributes.push({description: '', lang: "RU"})
  product.value.attributes.push({description: '', lang: "EN"})
}

function logProduct() {
  console.log(product.value)
}

function addSpecificationAction() {
  specificationAddState.value = true
}

function addSpecification(specification: any) {
  if (!product.value.specifications.find((spec: any) => spec.id === specification.id))
    product.value.specifications.push(specification)
  specificationAddState.value = false
}

function removeSpecification(specification: any) {
  const index = product.value.specifications.indexOf(specification)
  product.value.specifications.splice(index, 1)
}

function addFeatureAction() {
  fueatureAddState.value = true
}

function addFeature(feature: any) {
  if (!product.value.features.find((spec: any) => spec.id === feature.id))
    product.value.features.push(feature)
  fueatureAddState.value = false
}

function removeFeature(feature: any) {
  const index = product.value.features.indexOf(feature)
  product.value.features.splice(index, 1)
}

function removeAttribute(attribute: any) {
  const index = product.value.attributes.indexOf(attribute)
  product.value.attributes.splice(index, 1)
}

async function saveProduct() {

  const prod = product.value

  const data = {
    id: prod.id,
    warehouseId: prod.warehouseId,
    model: prod.model,
    categoryId: prod.category.id,
    countryId: prod.country.id,
    brandId: prod.brand.id,
    attributes: prod.attributes,
    titles: prod.titles,
    status: prod.status,
    specifications: prod.specifications.map((spec: any) => spec.id),
    features: prod.features.map((feature: any) => feature.id),
    descriptions: prod.descriptions,
    mediaList: prod.mediaList
  }

  await service.saveProduct(data).then(res => {
    if (id == '0') {
      router.push(Routes.PRODUCT_MAIN + res.data.id)
    }
  })
}

function openDescriptionDialog() {
  descriptionDialog.value = true
}

function uploadMedia(media: any) {
  const formData = new FormData();
  formData.append('file', media);
  service.http.post(Url.PRODUCT + '/upload', formData)
  .then(response => {
    product.value.mediaList?.push(...response.data);
  })
}

function removeMedia(media: any) {
  const index = product.value.mediaList.indexOf(media)
  product.value.mediaList.splice(index, 1)

}

function editSku() {
  router.push(Routes.PRODUCT_SKU + id)
}

watch(route, async () => {
  if (id != '0') {
    await loadData()
  }
})
</script>

<template>
  <template v-if="!dataLoading">
    <flex-row class="w-full gap-2 relative">
      <flex-col class="w-[80%]">
        <mono-card class="text-white gap-4"
                   v-if="!dataLoading">
          <flex-col class="gap-2">
            <flex-row class="w-full">
              <q-input dark
                       dense
                       label="Warehouse ID"
                       type="number"
                       outlined
                       class="w-full"
                       color="teal-7"
                       v-model="product.warehouseId">
              </q-input>
            </flex-row>
            <list-btn @tap="openCategorySelect()">
              {{ product.category.id }} - {{ getCategoryName(product.category, '') }}
            </list-btn>
            <flex-row v-for="title in service.getAllTitles(product.titles)"
                      class="w-full"
                      :key="title">
              <q-input dark
                       dense
                       :label="`Title ${ title.lang }`"
                       outlined
                       class="w-full"
                       color="teal-7"
                       v-model="title.title">
              </q-input>
            </flex-row>
            <flex-row>
              <q-select outlined
                        color="teal-5"
                        dark
                        dense
                        class="w-full"
                        :display-value="`${product.country ? service.getTitle(product.country.titles) : '*none*'}`"
                        v-model="product.country"
                        :options="countryService.countries.value"
                        label="Country">
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    {{ service.getTitle(scope.opt.titles) }}
                  </q-item>
                </template>
              </q-select>
            </flex-row>
            <flex-row>
              <q-select outlined
                        color="teal-5"
                        dark
                        dense
                        class="w-full"
                        :display-value="`${product.brand ? product.brand.title : '*none*'}`"
                        v-model="product.brand"
                        :options="brandService.brands.value"
                        label="Brand">
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    {{ scope.opt.title }}
                  </q-item>
                </template>
              </q-select>
            </flex-row>
            <flex-row>
              <q-select outlined
                        color="teal-5"
                        dark
                        dense
                        class="w-full"
                        :display-value="`${product.status ? product.status : '*none*'}`"
                        v-model="product.status"
                        :options="productStatuses"
                        label="Status">
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    {{ scope.opt }}
                  </q-item>
                </template>
              </q-select>
            </flex-row>
            <flex-row class="w-full">
              <q-input dark
                       dense
                       label="model"
                       outlined
                       class="w-full"
                       color="teal-7"
                       v-model="product.model">
              </q-input>
            </flex-row>
            <flex-row class="w-full"
                      v-for="attribute in product.attributes"
                      :key="attribute">
              <q-input dark
                       dense
                       :label="`Attribute ${ attribute.lang }`"
                       outlined
                       class="w-full"
                       color="teal-7"
                       v-model="attribute.description">
                <template v-slot:append>
                  <q-btn round
                         dense
                         flat
                         @click="removeAttribute(attribute)"
                         icon="delete"/>
                </template>
              </q-input>
            </flex-row>
            <flex-row class="w-full">
              <q-btn
                  color="teal-5"
                  dark
                  class="w-full"
                  dense
                  rounded
                  outline
                  @click="addAttribute">
                Add Attribute
              </q-btn>
            </flex-row>
          </flex-col>
          <flex-col class="gap-2 border-l-mg-700 border-l">
            <list-btn class="w-full"
                      v-for="specification in product.specifications"
                      @tap="removeSpecification(specification)"
                      :key="specification">
              {{ specification.id }} - {{ service.getTitle(specification.category.titles) }}
              <span class="text-white font-bold">:</span>
              {{ service.getTitle(specification.titles) }}
            </list-btn>
            <flex-row class="w-full justify-end">
              <q-btn
                  color="teal-5"
                  dark
                  class="px-4"
                  dense
                  rounded
                  outline
                  @click="addSpecificationAction">
                Add specification
              </q-btn>
            </flex-row>
            <list-btn class="w-full"
                      v-for="feature in product.features"
                      @tap="removeFeature(feature)"
                      :key="feature">
              {{ feature.id }} - {{ service.getTitle(feature.titles) }}
            </list-btn>
            <flex-row class="w-full justify-end">
              <q-btn
                  color="teal-5"
                  dark
                  class="px-4"
                  dense
                  rounded
                  outline
                  @click="addFeatureAction">
                Add feature
              </q-btn>
            </flex-row>
          </flex-col>
        </mono-card>
        <mono-card class="text-white gap-4 mt-4 h-auto"
                   v-for="description in product.descriptions"
                   :key="description">
          <flex-col>
            <flex-row>
              Description : {{ description.lang }}
            </flex-row>
            <flex-row class="w-full">
              <ProductDescription :description="description.description"
                                  @descriptionUpdate="($var) => description.description = $var"/>
            </flex-row>
            <flex-row class="w-full">
              <q-input
                  v-model="description.shortDescription"
                  filled
                  dark
                  outlined
                  dense
                  label="Short Description"
                  color="teal-7"
                  class="mt-2 w-full"
                  type="textarea"
              />
            </flex-row>
          </flex-col>
        </mono-card>
      </flex-col>
      <flex-col class="w-[18%] fixed gap-4 right-2">
        <flex-row class="w-full">
          <q-btn
              color="teal-5 px-4"
              dark
              class="w-full"
              dense
              rounded
              outline
              @click="openDescriptionDialog">
            Edit media
          </q-btn>
        </flex-row>
        <flex-row class="w-full">
          <q-btn
              color="teal-5 w-full"
              dark
              dense
              rounded
              outline
              @click="saveProduct">
            Save and continue
          </q-btn>
        </flex-row>
        <flex-row>
          <q-btn
              v-if="id != '0'"
              color="teal-5 px-4 w-full"
              dark
              dense
              rounded
              outline
              @click="editSku">
            SKU edit
          </q-btn>
        </flex-row>
        <flex-row>
          <q-btn
              color="teal-5 w-full"
              dark
              dense
              rounded
              outline
              @click="logProduct">
            Log Product
          </q-btn>
        </flex-row>
      </flex-col>
    </flex-row>
    <q-dialog v-model="descriptionDialog"
              persistent
              maximized
              transition-show="slide-up"
              transition-hide="slide-down">
      <ProductMediaUpload @removeMedia="removeMedia"
                          :product="product"
                          @uploadMedia="uploadMedia"/>
    </q-dialog>

    <q-dialog v-model="categorySelectState">
      <ProductCategorySelect
          @select="selectCategory"
          :category-tree="categoryService.categoryTree.value"/>
    </q-dialog>

    <q-dialog v-model="specificationAddState">
      <ProductSpecificationSelect @selected="addSpecification"/>
    </q-dialog>

    <q-dialog v-model="fueatureAddState">
      <ProductFeatureSelect @selected="addFeature"/>
    </q-dialog>
  </template>
</template>

<style scoped>

</style>
