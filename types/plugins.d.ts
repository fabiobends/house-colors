import { LoginParams } from './login'
import { Entity, EntityParams, HouseColor } from './models'

declare module 'vue/types/vue' {
  interface Vue {
    $login: (params: LoginParams) => Promise<boolean>
    $getAllItems: () => Promise<Array<HouseColor>>
    $getItem: (id: number) => Promise<Entity>
    $createItem: (params: EntityParams) => Promise<Entity>
    $updateItem: (id: number, params: EntityParams) => Promise<Entity>
    $deleteItem: (id: number) => Promise<Boolean>
    $getRandomColor: () => string
    $bvModal: {
      show(id: string): void
      hide(id: string): void
    }
  }
}
