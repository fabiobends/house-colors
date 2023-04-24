import { LoginParams } from './login'

declare module 'vue/types/vue' {
  interface Vue {
    $login: (params: LoginParams) => void
  }
}
