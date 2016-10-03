export interface State {
    enter?: Function;
    pause?: Function;
    resume?: Function;
    leave?: Function;
}
export declare type StateCallback = "enter" | "pause" | "resume" | "leave";
