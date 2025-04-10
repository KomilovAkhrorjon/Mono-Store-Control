import {useHttpService} from "@/util/httpservice";
import {ref} from "vue";
import {useRoute} from "vue-router";
import {Lang} from "@/util/lang";

export class BaseService {
  http = useHttpService();

  formDialog = ref(false);

  actionDialog = ref(false);

  mainDataLoading = ref(false);

  fileStorage = "https://files.monostore.uz/v1/document/download/";

  route = useRoute();

  pageResponse = ref({
    last: false,
    totalElements: 0,
    totalPages: 0,
    first: false,
    size: 20,
    numberOfElements: 0,
    empty: false,
  })

  pageRequest = ref({
    page: 0,
    size: 9999
  })

  getTitle(titles: any) {
    if (!titles) {
      return '';
    }
    return titles.map((title: any) => {
      return title.title + ' (' + title.lang + ')';
    }).join(' / ');
  }

  getLangs() {
    return [
      Lang.UZ,
      Lang.RU,
      Lang.EN
    ]
  }

  getAllTitles(allTitles: any) {

    let titles = [];

    if (allTitles.length === 0) {
      titles = [];

      for (const lang of this.getLangs()) {
        titles.push({
          title: '',
          description: '',
          lang: lang
        })
      }

      return titles;
    }

    titles = []

    for (const lang of this.getLangs()) {
      const title = allTitles.find((obj: any) => obj.lang === lang);
      if (title) {
        titles.push(title);
      } else {
        titles.push({
          title: '',
          description: '',
          lang: lang
        })
      }
    }

    return titles;
  }

  getOfCopy(obj: any) {
    return Object.assign({}, obj);
  }

  getMedia(mediaList: any) {
    const result = mediaList.filter((media: any) => media.size === 'MEDIUM');

    return result.length > 0 ? result[0] : {url: ''};
  }

  getTitleByLang(titles: any, lang: string) {
    if (!titles) {
      return '';
    }
    const title = titles.find((obj: any) => obj.lang === lang);
    return title ? title : '';
  }

  getAllDescriptions(allDescriptions: any) {

    let titles = [];

    if (allDescriptions.length === 0) {
      titles = [];

      for (const lang of this.getLangs()) {
        titles.push({
          description: '',
          shortDescription: '',
          lang: lang
        })
      }

      return titles;
    }

    titles = []

    for (const lang of this.getLangs()) {
      const title = allDescriptions.find((obj: any) => obj.lang === lang);
      if (title) {
        titles.push(title);
      } else {
        titles.push({
          description: '',
          shortDescription: '',
          lang: lang
        })
      }
    }

    return titles;
  }
}
