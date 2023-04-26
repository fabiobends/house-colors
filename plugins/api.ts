import { Context, Inject } from '@nuxt/types/app'
import { AxiosResponse } from 'axios'
import type { LoginBody, LoginResponse, LoginParams } from '../types/login'
import {
  EntitiesResponse,
  Entity,
  EntityBody,
  EntityParams,
  EntityResponse,
  HouseColor,
} from '../types/models'
import { getRandomColor } from './get-random-color'

export default ({ $axios, app, redirect }: Context, inject: Inject) => {
  inject('login', async (params: LoginParams): Promise<boolean> => {
    try {
      const { data: response } = await $axios.post<
        LoginBody,
        AxiosResponse<LoginResponse>
      >('login_json', {
        login: params,
      })
      if (response.success) {
        app.$cookies.set('token', response.data.result.access_token)
        redirect('/')
      }
      return new Promise((resolve) => resolve(response.success))
    } catch (err) {
      return new Promise((resolve) => resolve(false))
    }
  })

  inject('getItem', async (id: number): Promise<Entity | null> => {
    try {
      const { data: response } = await $axios.get<EntityResponse>(
        `house_rules/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + app.$cookies.get('token'),
          },
        }
      )
      if (!response.success) {
        redirect('/login')
      }
      return new Promise((resolve) => resolve(response.data))
    } catch (err) {
      return new Promise((resolve) => resolve(null))
    }
  })

  inject('getAllItems', async (): Promise<Array<HouseColor>> => {
    try {
      const { data: response } = await $axios.get<EntitiesResponse>(
        'house_rules',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + app.$cookies.get('token'),
          },
        }
      )
      if (!response.success) {
        redirect('/login')
      }
      return new Promise((resolve) =>
        resolve(
          response.data.entities.map(({ id, name }) => ({
            id,
            name,
            color: getRandomColor(),
          }))
        )
      )
    } catch (err) {
      return new Promise((resolve) => resolve([]))
    }
  })

  inject('createItem', async (params: EntityParams): Promise<Entity | null> => {
    try {
      const { data: response } = await $axios.post<
        EntityBody,
        AxiosResponse<EntityResponse>
      >(
        'house_rules',
        {
          house_rules: params,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + app.$cookies.get('token'),
          },
        }
      )
      if (!response.success) {
        redirect('/login')
      }
      return new Promise((resolve) => resolve(response.data))
    } catch (err) {
      return new Promise((resolve) => resolve(null))
    }
  })

  inject(
    'updateItem',
    async (id: number, params: EntityParams): Promise<Entity | null> => {
      try {
        const { data: response } = await $axios.put<
          EntityBody,
          AxiosResponse<EntityResponse>
        >(
          `house_rules/${id}`,
          {
            house_rules: params,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + app.$cookies.get('token'),
            },
          }
        )
        if (!response.success) {
          redirect('/login')
        }
        return new Promise((resolve) => resolve(response.data))
      } catch (err) {
        return new Promise((resolve) => resolve(null))
      }
    }
  )

  inject('deleteItem', async (id: number): Promise<Boolean> => {
    try {
      const { data: response } = await $axios.delete<
        EntityBody,
        AxiosResponse<EntityResponse>
      >(`house_rules/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + app.$cookies.get('token'),
        },
      })
      if (!response.success) {
        redirect('/login')
      }
      return new Promise((resolve) => resolve(true))
    } catch (err) {
      return new Promise((resolve) => resolve(false))
    }
  })
}
