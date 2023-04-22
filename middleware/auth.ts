import { Context } from '@nuxt/types'

export default ({ redirect, app }: Context) => {
  const hasToken = app.$cookies.get('token')
  if (!hasToken) {
    redirect('/login')
  }
}
