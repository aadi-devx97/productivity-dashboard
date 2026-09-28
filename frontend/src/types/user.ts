export type CurrentUser = {
  id: string
  name: string
  email: string
}

export type LoginRequest = {
  email: string
  password: string
}