import { AppResponse } from '.'

export interface Entity {
  id: number
  name: string
  active: number
  order: number
}

export interface EntityResponse extends AppResponse {
  data: {
    entities: Array<Entity>
  }
}
