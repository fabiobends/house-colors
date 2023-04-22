export interface LoginParams {
  email: string
  password: string
}

export interface LoginBody {
  login: LoginParams
}

export interface Response {
  success: boolean
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: any
  request?: any
}

export interface LoginResponse extends Response {
  data: {
    result: {
      access_token: string
    }
  }
}

export interface Entity {
  id: number
  name: string
  active: number
  order: number
}

export interface EntityResponse extends Response {
  data: {
    entities: Array<Entity>
  }
}
