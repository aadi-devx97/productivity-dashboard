export type Task = {
  _id: string
  title: string
  completed: boolean
  user: string
}

export type CreateTaskRequest = {
  title: string
}

export type EditTaskRequest = {
  title: string
}

export type DeleteTaskResponse = {
  message: string
}

export type ToggleTaskRequest = {
  completed: boolean
}