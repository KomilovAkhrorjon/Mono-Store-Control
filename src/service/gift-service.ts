import {BaseService} from "@/service/base-service";
import {ref} from "vue";
import {Url} from "@/util/urls";
import {useProductService} from "@/service/product-service";


export class GiftService extends BaseService {

  giftTypes = ref([])
  selectedGiftType = ref({id: 0, titles: [], type: ""});
  selectedGiftCategory = ref({id: 0, titles: [], giftTypeId: 0, isActive: true})
  loadingGiftCategory = ref(false)
  giftCategories = ref([])
  giftTypeForEdit = ref(
      {
        id: 0,
        titles: this.getAllTitles([]),
        type: "",
        isActive: true
      }
  )
  giftCategoryAction = ref(false)
  giftCategoryMock = {
    id: 0,
    isActive: true,
    giftTypeId: this.selectedGiftType.value.id,
    titles: [
      {
        id: 0,
        title: "",
        photo: "",
        banner: "",
        lang: "UZ"
      },
      {
        id: 4,
        title: "",
        photo: "",
        banner: "",
        lang: "RU"
      },
      {
        title: "",
        photo: "",
        banner: "",
        lang: "EN"
      }
    ]
  }
  giftCategoryForEdit = ref(this.giftCategoryMock)
  categoryProductLoading = ref(false)
  categoryProductList = ref<any>([])
  allProducts = ref([])

  productService = useProductService()


  async loadGiftTypes() {

    this.mainDataLoading.value = true;

    await this.http.get(Url.GIFT_TYPE_FULL).then(response => {
      this.giftTypes.value = response.data
    })

    this.allProducts.value = await this.productService.loadProductList()

    this.mainDataLoading.value = false
  }

  async selectGiftType(giftTypeToSelect: any) {
    this.selectedGiftType.value = giftTypeToSelect;
    this.selectedGiftCategory.value = {id: 0, titles: [], giftTypeId: 0, isActive: true}
    await this.loadGiftCategories()
  }

  async loadGiftCategories() {
    if (this.selectedGiftType.value.id === 0) {
      return;
    }

    this.loadingGiftCategory.value = true;

    await this.http.getParam(Url.GIFT_CATEGORY_FULL,
        {'giftTypeId': this.selectedGiftType.value.id}).then(res => {
      this.giftCategories.value = res.data
    })

    this.loadingGiftCategory.value = false;
  }

  openGiftTypeAction(selectedGiftType: any) {
    this.giftTypeForEdit.value = selectedGiftType
    this.giftTypeForEdit.value.titles = this.getAllTitles(selectedGiftType.titles)
    this.actionDialog.value = true
  }

  async saveGiftType() {

    if (this.giftTypeForEdit.value?.id === 0) {
      this.http.post(Url.GIFT_TYPE, this.giftTypeForEdit.value).then(() => {
        this.loadGiftTypes()
      })
    }else {
      this.http.put(Url.GIFT_TYPE, this.giftTypeForEdit.value).then(() => {
        this.loadGiftTypes()
      })
    }

    this.actionDialog.value = false
  }

  openGiftCategoryAction(selectedGiftCategory: any) {
    this.giftCategoryForEdit.value = selectedGiftCategory
    this.giftCategoryForEdit.value.titles = this.getCategoryTitles(selectedGiftCategory.titles)
    this.giftCategoryForEdit.value.giftTypeId = this.selectedGiftType.value.id
    this.giftCategoryAction.value = true
  }

  async saveGiftCategory() {
    if (this.giftCategoryForEdit.value.id === 0) {
      await this.http.post(Url.GIFT_CATEGORY, this.giftCategoryForEdit.value)
    } else {
      await this.http.put(Url.GIFT_CATEGORY, this.giftCategoryForEdit.value)
    }
    this.giftCategoryAction.value = false
    await this.loadGiftCategories();
  }

  getCategoryTitles(giftCategoryTitles: any) {
    return this.getLangs().map(lang => {
      const title = giftCategoryTitles.find((title: any) => title.lang === lang)
      if (title) {
        return title
      }
      return {
        title: "",
        photo: "",
        banner: "",
        lang: lang
      }
    })
  }

  async uploadFile(file: any){
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(Url.GIFT_CATEGORY_UPLOAD, formData)
  }

  async selectGiftCategory(giftCategory: any) {
    this.selectedGiftCategory.value = giftCategory
    await this.loadCategoryProducts()
  }

  async loadCategoryProducts() {
    const result = await this.http.getParam(Url.PRODUCT_FULL_GIFT_CATEGORY,
        {giftCategoryId: this.selectedGiftCategory.value.id})

    this.categoryProductList.value = result.data
  }

  isSelected(id: number) {
    const result = this.categoryProductList.value.find((product: any) => product.id == id)
    return result != undefined
  }

  changeProductSelection(product: any) {
    const index = this.categoryProductList.value.findIndex((p: any) => p.id == product.id)
    if (index == -1) {
      this.categoryProductList.value.push(product)
    } else {
      this.categoryProductList.value.splice(index, 1)
    }
  }

  async saveCategoryProducts() {
    const productIds = this.categoryProductList.value.map((product: any) => product.id)
    await this.http.postWithParams(Url.ATTACH_PRODUCT_TO_GIFT,
        {giftCategoryId: this.selectedGiftCategory.value.id},
        productIds)
  }

  getAllProducts(){
    return this.allProducts.value
  }

}

export function useGiftService() {
  return giftServiceInstance;
}

export const giftServiceInstance = new GiftService();
