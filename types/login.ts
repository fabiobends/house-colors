import { AppResponse } from '.'

export interface LoginParams {
  email: string
  password: string
}

export interface LoginBody {
  login: LoginParams
}

export interface LoginResponse extends AppResponse {
  data: {
    result: {
      access_token: string
    }
  }
}
