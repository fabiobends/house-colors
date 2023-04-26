import { AppResponse } from '.'

export interface Entity {
  id: number
  name: string
  active: number
  order: number
}

export interface EntityResponse extends AppResponse {
  data: Entity
}

export interface EntityParams {
  name: string
  active: number
}

export interface EntityBody {
  house_rules: EntityParams
}

export interface EntitiesResponse extends AppResponse {
  data: {
    entities: Array<Entity>
  }
}

export interface HouseColor {
  id: number
  name: string
  color: string
}
