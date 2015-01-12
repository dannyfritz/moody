<img src="logo.png">

# Moody

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/dannyfritz/moody?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Moody is a library for managing different running states in a stack. Don't like the mood? Why not add a new one to the stack for a new vibe?

## Install
``` sh
npm install moody
```

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

### moody.pop()
Remove the current state from the stack.
``` js
var state = {
  leave: function() {
    console.log('Bye!')
  }
};
moody.push(state);
moody.pop();
// => 'Bye!'
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
moody.execute('say', 'mom');
// => 'How are you mom?!'
```

### moody.swap(state, ...)
Remove the current state from the stack and add the new state. Any additional args are passed to the new state's enter callback.

### moody.current()
Return the current state.

## Credits
Inspiration for this library is from [vrld](https://github.com/vrld)'s [hump.gamestate](https://github.com/vrld/hump/blob/master/gamestate.lua)

## License
MIT
