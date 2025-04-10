import {Url} from "@/util/urls";
import {Routes} from "@/router/routes";
import {BaseService} from "@/service/base-service";
import {useRouter} from "vue-router";

export class AuthService extends BaseService{

  router = useRouter();

  swal = require('sweetalert2');

  async login(data: any) {
    await this.http.post(Url.LOGIN, data)
    .then((res: any) => {

      localStorage.setItem('token', res.data);

      this.router.push(Routes.HOME)
    }).catch((err: any) => {

      this.swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });

    });
  }
}
