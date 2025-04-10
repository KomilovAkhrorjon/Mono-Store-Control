import {Url} from "@/util/urls";
import {ref} from "vue";
import {BaseService} from "@/service/base-service";

export class CategoriesService extends BaseService {

  mockTitles = [
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
  ]

  mockData = {
    id: null,
    parentId: 0,
    titles: this.mockTitles,
    isPublic: false,
    icon: '',
    priority: 0,
  }

  categoryTree = ref([]);
  selectedCategory = ref(this.mockData);

  categoryFields = ref([
    {
      key: 'isPublic',
      label: 'Public',
      type: 'checkbox',
    },
    {
      key: 'priority',
      label: 'Priority',
      type: 'number'
    },
    {
      key: 'parentId',
      label: 'Parent',
      type: 'number'
    }
  ]);

  async getCategoryTree() {
    this.mainDataLoading.value = true;

    const categoryTree = await this.http.get(Url.CATEGORY_TREE);

    this.categoryTree.value = categoryTree.data

    this.mainDataLoading.value = false;
  }

  async updateOrCreateCategory() {
    if (this.selectedCategory.value.id) {
      await this.http.put(Url.CATEGORY, this.selectedCategory.value);
    } else {
      await this.http.post(Url.CATEGORY, this.selectedCategory.value);
    }
    await this.getCategoryTree();
    this.formDialog.value = false;
  }

  async getOneLevelCategory(id: number) {
    return this.http.get(Url.CATEGORY + `/${id}`);
  }

  async uploadFile(file: any) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.http.post(Url.CATEGORY_ICON_UPLOAD, formData);
    this.selectedCategory.value.icon = response.data.url;
  }
}

export function useCategoriesService() {
  return categoriesServiceInstance;
}

export const categoriesServiceInstance = new CategoriesService();
