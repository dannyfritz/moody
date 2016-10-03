export interface State {
  enter?: Function
  pause?: Function
  resume?: Function
  leave?: Function
}

export type StateCallback = "enter" | "pause" | "resume" | "leave"
