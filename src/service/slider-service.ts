import {BaseService} from "@/service/base-service";
import {ref} from "vue";
import {Url} from "@/util/urls";

export class SliderService extends BaseService {

  sliders = ref([])
  mockSlider = {
    id: 0,
    color: "",
    link: "",
    isActive: true,
    orderNo: 0,
    place: "",
    titles: [
      {
        id: 0, title: "", lang: "UZ",
        mediaList: [
          {id: 0, fileType: "", url: "", type: "", realName: "", savedName: "", size: ""},
        ]
      },
      {
        id: 0, title: "", lang: "RU",
        mediaList: [
          {id: 0, fileType: "", url: "", type: "", realName: "", savedName: "", size: ""},
        ]
      },
      {
        id: 0, title: "", lang: "EN",
        mediaList: [
          {id: 0, fileType: "", url: "", type: "", realName: "", savedName: "", size: ""},
        ]
      }
    ]
  }
  sliderForEdit = ref(this.getOfCopy(this.mockSlider));
  sliderAction = ref(false);
  mediaSizes = ['SMALL', 'MEDIUM', 'LARGE', 'ORIGINAL'];
  filesForUpload = ref(this.getAllTitles([]).map((title: any) => {
    return {
      file: new File([], ''),
      lang: title.lang
    }
  }));

  async loadSliders() {
    this.mainDataLoading.value = true;

    this.http.getParam(Url.SLIDER_FULL, {size: 9999}).then(response => {
      this.sliders.value = response.data
      this.mainDataLoading.value = false
    })
  }

  openSliderForEdit(slider: any) {
    this.sliderForEdit.value = this.getOfCopy(slider);
    this.sliderForEdit.value.titles = this.getAllTitles(this.sliderForEdit.value.titles)
    .map((title: any) => {
      title.mediaList = this.getAllMedias(title.mediaList);
      return title;
    });
    this.sliderAction.value = true;
  }

  async saveSlider() {
    if (this.sliderForEdit.value.id === null || this.sliderForEdit.value.id === 0) {
      await this.http.post(Url.SLIDER, this.sliderForEdit.value)
      .then();
    } else {
      await this.http.put(Url.SLIDER, this.sliderForEdit.value)
      .then();
    }
    this.loadSliders();
    this.sliderForEdit.value = this.getOfCopy(this.mockSlider);
    this.sliderAction.value = false;
  }

  getAllMedias(allMedias: any) {

    let medias = [];

    if (allMedias.length === 0) {
      medias = [];

      for (const size of this.mediaSizes) {
        medias.push({
          id: null, mediaKey: '', url: '', type: 'IMAGE', name: '', savedName: '', size: size
        })
      }

      return medias;
    }

    medias = []

    for (const size of this.mediaSizes) {
      const media = allMedias.find((obj: any) => obj.size === size);
      if (media) {
        medias.push(media);
      } else {
        medias.push({
          id: null, fileType: '', url: '', type: 'IMAGE', realName: '', savedName: '', size: size
        })
      }
    }

    return medias;

  }

  override getAllTitles(allTitles: any): any[] {
    let titles = [];

    if (allTitles.length === 0) {
      titles = [];

      for (const lang of this.getLangs()) {
        titles.push({
          title: '',
          description: '',
          lang: lang,
          mediaList: [
            {id: null, fileType: '', url: '', type: '', realName: '', savedName: '', size: ''}
          ]
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
          lang: lang,
          mediaList: [
            {id: null, fileType: '', url: '', type: '', realName: '', savedName: '', size: ''}
          ]
        })
      }
    }

    return titles;
  }

  getFile(lang: string) {
    return this.filesForUpload.value.find((file: any) => file.lang === lang);
  }

  uploadMedia(title: any){
    const file = this.getFile(title.lang)?.file;
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.http.post(Url.SLIDER + '/upload', formData)
      .then(response => {
        title.mediaList = this.getAllMedias(response.data);
      })
    }
  }
}

export function useSliderService(): SliderService {
  return sliderServiceInstance
}

export const sliderServiceInstance = new SliderService();
