import {BaseService} from "@/service/base-service";
import {ref} from "vue";
import {Url} from "@/util/urls";

export class SpecificationService extends BaseService {

  specificationCategories = ref([])
  mockSpecificationCategory = {
    id: 0,
    isActive: true,
    titles: [
      {
        id: 0,
        title: "",
        description: "",
        lang: "UZ"
      },
      {
        id: 0,
        title: "",
        description: "",
        lang: "RU"
      },
      {
        id: 0,
        title: "",
        description: "",
        lang: "EN"
      }
    ]
  }
  selectedSpecificationCategory = ref(this.mockSpecificationCategory);
  specificationCategoryForEdit = ref(this.mockSpecificationCategory);
  specificationCategoryAction = ref(false);

  async loadSpecificationCategories() {
    this.mainDataLoading.value = true;

    this.http.get(Url.SPECIFICATION_CATEGORY_FULL).then(response => {
      this.specificationCategories.value = response.data
    })

    this.mainDataLoading.value = false
  }

  openSpecificationCategoryForEdit(specificationCategory: any) {
    this.specificationCategoryForEdit.value = specificationCategory;
    this.specificationCategoryForEdit.value.titles = this.getAllTitles(specificationCategory.titles)
    this.specificationCategoryAction.value = true;
  }

  async saveSpecificationCategory() {
    this.specificationCategoryAction.value = true;
    if (this.specificationCategoryForEdit.value.id === 0) {
      await this.http.post(
          Url.SPECIFICATION_CATEGORY,
          this.specificationCategoryForEdit.value.titles
      ).then();
    } else {
      await this.http.putParams(
          Url.SPECIFICATION_CATEGORY,
          {specificationCatalogId: this.specificationCategoryForEdit.value.id, isActive: this.specificationCategoryForEdit.value.isActive},
          this.specificationCategoryForEdit.value.titles
      ).then(() => {
        this.specificationCategoryForEdit.value = this.mockSpecificationCategory
      })
    }
    this.loadSpecificationCategories()
    this.specificationCategoryAction.value = false
  }

  /* .-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-*/

  mockSpecification = {
    id: 0,
    titles: [
      {
        id: 0,
        title: "",
        description: "",
        lang: "UZ"
      },
      {
        id: 0,
        title: "",
        description: "",
        lang: "RU"
      },
      {
        id: 0,
        title: "",
        description: "",
        lang: "EN"
      }
    ],
    specificationCategoryId: 0,
    category: this.mockSpecificationCategory
  }
  specifications = ref([])
  specificationForEdit = ref(this.mockSpecification);
  specificationAction = ref(false);
  loadingSpecification = ref(false);

  async loadSpecifications(specificationCategory: any): Promise<void> {

    this.selectedSpecificationCategory.value = specificationCategory;

    if (this.selectedSpecificationCategory.value.id === 0) {
      return;
    }

    this.loadingSpecification.value = true;

    await this.http.getParam(Url.SPECIFICATION_FULL,
        {
          specificationCategoryId: this.selectedSpecificationCategory.value.id
        }).then(response => {
      this.specifications.value = response.data
    });

    this.loadingSpecification.value = false;
  }

  openSpecificationForEdit(specification: any) {
    this.specificationForEdit.value = specification;
    this.specificationForEdit.value.titles = this.getAllTitles(specification.titles)
    this.specificationAction.value = true;
  }

  async saveSpecification() {
    this.specificationAction.value = true;
    if (this.specificationForEdit.value.id === 0) {
      await this.http.postWithParams(
          Url.SPECIFICATION,
          {categoryId: this.selectedSpecificationCategory.value.id},
          this.specificationForEdit.value.titles)
      .then()
    } else {
      await this.http.putParams(
          Url.SPECIFICATION,
          {specificationId: this.specificationForEdit.value.id},
          this.specificationForEdit.value.titles)
      .then()
    }

    this.specificationForEdit.value = this.mockSpecification
    this.loadSpecifications(this.selectedSpecificationCategory.value)

    this.specificationAction.value = false
  }

}

export function useSpecificationService(): SpecificationService {
  return specificationServiceInstance
}

export const specificationServiceInstance: SpecificationService = new SpecificationService()
