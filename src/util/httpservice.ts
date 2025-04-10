import {Pageable} from "@/util/pageable";


export class HttpService {


  axios = require('axios');

  constructor() {
    this.axios.defaults.baseURL = 'https://mapi.monostore.uz';
    if (localStorage.getItem('token')) {
      this.axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    }
  }

  async get(url: string) {
    return await this.axios.get(url)
    .then((response: any) => {
      return response;
    });
  }

  async getParam(url: string, params: any) {
    return await this.axios.get(url, {
      params: params
    })
    .then((response: any) => {
      return response;
    });
  }

  async getPage(url: string, pageable: Partial<Pageable>) {
    return await this.axios.get(url, {
      params: pageable
    })
    .then((response: any) => {
      return response;
    });
  }

  async post(url: string, body?: any) {
    return await this.axios.post(url, body)
    .then((res: any) => {
      return res;
    });
  }

  async postWithParams(url: string, parapms: any, body?: any) {
    return await this.axios.post(url, body, {
      params: parapms
    })
    .then((res: any) => {
      return res;
    });
  }

  async put(url: string, body?: any) {
    await this.axios.put(url, body)
    .then((res: any) => {
      return res;
    });
  }

  async putParams(url: string, params:any, body?: any) {
    await this.axios.put(url, body, {
      params: params
    })
    .then((res: any) => {
      return res;
    });
  }

  async putWithParams(url: string, body?: any, params?: any) {
    await this.axios.put(url, body, params)
    .then((res: any) => {
      return res;
    });
  }

  async delete(url: string, params?: any) {
    await this.axios.delete(url, params)
    .then((res: any) => {
      return res;
    });
  }

}

export function useHttpService() {
  return httpServiceInstance;
}

export const httpServiceInstance = new HttpService();
