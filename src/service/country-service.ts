import {BaseService} from "@/service/base-service";
import {Url} from "@/util/urls";
import {ref} from "vue";

export class CountryService extends BaseService {

  countries = ref([]);
  selectedCountry = ref({
    id: null,
    code: "UZB",
    titles: [
      {
        id: null,
        title: "",
        description: null,
        lang: "UZ",
        mediaList: null
      },
      {
        id: null,
        title: "",
        description: null,
        lang: "RU",
        mediaList: null
      },
      {
        id: null,
        title: "",
        description: null,
        lang: "EN",
        mediaList: null
      }
    ]
  });
  countrKeys = ref([
    {
      key: 'code',
      label: 'Code',
      type: 'text',
    }
  ]);

  async loadAllData() {
    this.mainDataLoading.value = true;

    const countries = await this.http.get(Url.COUNTRIES);
    this.countries = ref(countries.data);
    this.mainDataLoading.value = false;
  }

  async saveOrCreateCountry() {

    if (this.selectedCountry.value.id) {
      await this.http.put(Url.COUNTRY, this.selectedCountry.value)
    } else {
      await this.http.post(Url.COUNTRY, this.selectedCountry.value)
    }

    this.actionDialog.value = false;

    await this.loadAllData();
  }

}

export function useCountryService() {
  return countryServiceInstance;
}

export const countryServiceInstance = new CountryService();
