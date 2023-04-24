import { Context, Inject } from '@nuxt/types/app'
import { AxiosResponse } from 'axios'
import type { LoginBody, LoginResponse, LoginParams } from '../types/login'

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
