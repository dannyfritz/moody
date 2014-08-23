<img src="logo.png">

# Moody

Moody is a library for managing different running states in a stack.

## API

``` js
var newMoody = require('Moody');
var moody = newMoody();
```

### moody.push(state, ...)
Add a new state to the top of the stack. Any additional args are passed to the new state's enter callback.
``` js
var state = {
  enter: function(name) {
    console.log('Hi '+ name + '!')
  }
};
moody.push(state, 'mom');
// => 'Hi mom!'
```

### moody.pop(...)
Remove the current state from the stack. Any additional args are passed to the state's leave callback.
``` js
var state = {
  leave: function(name) {
    console.log('Bye '+ name + '!')
  }
};
moody.push(state);
moody.pop('mom');
// => 'Bye mom!'
```

### moody.execute(functionName, ...)
Execute a function on the current state. Any additional args are passed to the state's method.
``` js
var state = {
  say: function(name) {
    console.log('How are you '+ name + '?!')
  }
};
moody.push(state);
moody.execute('say');
// => 'How are you  mom?!'
```

### moody.switch(state, ...)
Remove the current state from the stack and add the new state. Any additional args are passed to the new state's enter callback.

### moody.current()
Return the current state.

# Inspiration
Inspiration for this library is from [vrld](https://github.com/vrld)'s [hump.gamestate](https://github.com/vrld/hump/blob/master/gamestate.lua)

# License
MIT
