import {BaseService} from "@/service/base-service";
import {ref} from "vue";
import {Url} from "@/util/urls";

export class FeatureService extends BaseService {

  features = ref([]);

  selectedFeature = ref({
    id: null,
    titles: [
      {
        id: null,
        title: "",
        description: "",
        lang: "RU"
      },
      {
        id: null,
        title: "",
        description: "",
        "lang": "EN"
      },
      {
        id: null,
        title: "",
        description: "",
        lang: "UZ"
      }
    ],
  });

  async loadAllData() {
    this.mainDataLoading.value = true;
    await this.http.getPage(Url.FEATURES_FULL, this.pageRequest.value)
    .then(response => {
      this.mainDataLoading.value = false;
      this.features.value = response.data.content;
    });
  }

  async save() {
    this.mainDataLoading.value = true;
    await this.http.post(Url.FEATURES, this.selectedFeature.value)
    .then(() => {
      this.mainDataLoading.value = false;
      this.loadAllData();
      this.actionDialog.value = false;
    });
  }

  async update() {
    this.mainDataLoading.value = true;
    await this.http.put(
        Url.FEATURES + '/' + this.selectedFeature.value.id,
        this.selectedFeature.value
    ).then(() => {
      this.mainDataLoading.value = false;
      this.loadAllData();
      this.actionDialog.value = false;
    });
  }
}

export function useFeatureService() {
  return featureServiceInstance;
}

export const featureServiceInstance = new FeatureService();
