import { State } from "./State";
/**
  @module moody
*/
/**
  moody is a library for defining running states such as a gamestate.
  Example states of a game would be menu, game, and credits.

  @class moody
  @singleton
*/
export declare class Moody {
    /**
      This Array holds all the current states.
  
      @property states
      @type Array
      @private
    */
    private states;
    /**
      Returns the current state.
  
      @method current
      @return currentState {Object}
    */
    current(): State;
    /**
      Push a new state onto the stack.
      Calls the `pause` callback on the state being paused.
      Calls the `enter` callback on the state being added.
  
      @method push
      @param state {Object}
      @param [argument]* {Mixed}
        Arguments to pass to the `enter` callback.
      @return enterReturn {Mixed}
    */
    push(state: State, ...args: any[]): any;
    /**
      Remove the current state from the stack.
      Calls the `leave` callback on the state being removed.
      Calls the `resume` callback on the state being resumed.
  
      @method pop
      @param [argument]* {Mixed}
        Arguments to pass to the `resume` callback.
      @return poppedState {Object}
    */
    pop(): any;
    /**
      In with the new state. Out with the old state.
  
      Pop the current state and replace with a new one.
      Calls the `enter` callback on new state.
      Calls the `leave` callback on the previous state.
  
      @method swap
      @param toState {Object} State to be switched in.
      @param [argument]* {Mixed}
        Arguments to pass to the `enter` callback.
      @return enterReturn {Mixed}
    */
    swap(toState: State, ...args: any[]): any;
    /**
      Calls the function denoted by `functionName` on the current state.
  
      If the value is not a function it returns the value it maps to.
  
      @method execute
      @param functionName {String}
        The name of the function to be called on the current state.
      @param [argument]* {Mixed} Arguments to pass to the function.
    */
    execute(functionName: string, ...args: any[]): any;
}
