import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import type {
  AxiosResponse,
  LoginBody,
  LoginParams,
  LoginResponse,
} from '../types'

export default ({ $axios, app, redirect }: Context, inject: Inject) => {
  inject('login', async ({ email, password }: LoginParams) => {
    const { data: response } = await $axios.post<
      LoginBody,
      AxiosResponse<LoginResponse>
    >('login_json', {
      login: {
        email,
        password,
      },
    })
    if (response.success) {
      app.$cookies.set('token', response.data.result.access_token)
      redirect('/')
    }
  })
}
