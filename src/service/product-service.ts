import {BaseService} from "@/service/base-service";
import {ref} from "vue";
import {Url} from "@/util/urls";

export class ProductService extends BaseService {

  productList = ref([]);
  loadingProductList = ref(false)
  categorySelectState = ref(false)

  async loadProductList(){
    this.loadingProductList.value = true;
    const res = await this.http.get(Url.ALL_PRODUCT);

    this.productList.value = res.data;
    this.loadingProductList.value = false;

    return res.data;
  }

  async loadFullProduct(id: number){
    return this.http.get(Url.PRODUCT_FULL + id);
  }

  async saveProduct(data: any){
    if (data.id === 0){
      return await this.http.post(Url.PRODUCT, data);
    } else {
      return await this.http.put(Url.PRODUCT, data);
    }
  }

  async saveSkuList(data: any, productId: number){
    return await this.http.postWithParams(Url.PRODUCT_SKU, {productId: productId}, data);
  }

}

export const productServiceInstance = new ProductService();

export function useProductService() {
  return productServiceInstance;
}
