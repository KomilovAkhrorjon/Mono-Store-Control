import {BaseService} from "@/service/base-service";
import {ref} from "vue";
import {Url} from "@/util/urls";


export class BrandService extends BaseService{

  brands = ref([]);
  selectedBrand = ref({
    id: null,
    title: "",
    logo: "",
    titleLink: "",
  });
  brandKeys = ref([
    {
      key: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      key: 'titleLink',
      label: 'Link',
      type: 'text',
    }
  ]);

  async loadAllData() {
    this.mainDataLoading.value = true;

    const brands = await this.http.getPage(Url.BRAND, this.pageRequest.value);
    this.brands = ref(brands.data.content);
    this.mainDataLoading.value = false;
  }

  async saveOrCreateBrand() {

      if (this.selectedBrand.value.id) {
        await this.http.put(Url.BRAND, this.selectedBrand.value)
      } else {
        await this.http.post(Url.BRAND, this.selectedBrand.value)
      }

      this.actionDialog.value = false;

      await this.loadAllData()
  }

  async uploadLogo(file: any){
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.http.post(Url.BRAND_UPLOAD, formData);
    this.selectedBrand.value.logo = response.data.url;
  }

}

export function useBrandService() {
  return brandServiceInstance;
}

export const brandServiceInstance = new BrandService();
