# README


## Lecture 33: What is a Higher Order Component?
- A higher order component is a React component that adds some additional functionality or
behavior to a normal React component
- We take a higher order component + a component to create an "enhanced" or "composed" 
component
- It's a great way to extract functionality that would be useful for other components


## Lecture 34: Connect and Provider
- connect() from 'react-redux' is an example of a higher order component

## Lecture 35: Authentication HOC
- this is not a proper back-end auth app
- we are building a helper to handle authentication routes; it's a boolean yes/no of whether
the user is logged in or not
  - user tries to visit protected route: logged in?
- We are going to have a ResourceList Component (some resource we want to be protected) and combine it
with a require_auth HOC that results in a Composed Component that will check authentication status
before rendering

## Lecture 36: Header Setup
- nothing I haven't seen before.

## Lecture 37: React Router Setup
- I've added React Router before but here is a quick refresher:
  - import the necessary items from React Router: `import { Router, Route, browserHistory } from 'react-router';`
  - in the ReactDOM.render(), remove `<App />` from inside of the Provider and replace it with the following:
  ```js
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
    	<Route path="/" component={App}>
    		<Route path="resources" component={Resources} />
    	</Route>
    </Router>
  </Provider>
  ```
- We are able to show the `<App />` component via the component property on the Route element.  We created
the Resources component as a stand-in for a protected resource and made it a child of the App component, as
most components would be.  To make the Resources component populate, I need to add `{this.props.children}` to
App and it will display.  This my App component now:
```js
export default class App extends Component {
  render() {
    return (
     	<div>
      		<Header />
      		{this.props.children}
  		</div>
    );
  }
}
```

## Lecture 38: Authentication Reducer
- We built the action types file (./actions/types.js), the action creator (./actions/index.js), and the
authenticationReducer (./reducers/authentication.js);
- Types: `./actions/types.js`
  - It has just one line of code: `export const CHANGE_AUTH = 'CHANGE_AUTH';`
  - I like this way of creating action types.  All the action types (I am assuming) will go into this file
  which I can then import into the action creators or reducers that I want.
- Action Creator: `./actions/index.js`
  ```js
  import {
  	CHANGE_AUTH
  } from './types';

  export function authenticate(isLoggedIn) {
  	return {
  		type: CHANGE_AUTH,
  		payload: isLoggedIn
  	}
  }
  ```
  - don't over-think this...action creators, create actions; actions are JS objects; these JS objects must have 
  at least two properties: a type and a payload.
  - With that as a foundation, we are simply passing to our action a boolean `isLoggedIn`.  That's all we need...
  with that info, create an action that a reducer can process. Note how we don't actually do anything with that
  information (like `return !isLoggedIn` to toggle), we are just creating the action.
- Authentication Reducer: `./reducers/authentication.js`
  - We aren't doing anything yet but I should probably show it anyway:
  ```js
  import {
  	CHANGE_AUTH
  } from '../actions/types';

  export default function(state = false, action) {
  	switch(action.type) {
  		case CHANGE_AUTH:
  			return action.payload
  	}

  	return state;
  }
  ```
- Connect to rootReducer: `./reducers/index.js`
  ```js
  import { combineReducers } from 'redux';
  import authenticationReducer from './authentication';

  const rootReducer = combineReducers({
    authenticated: authenticationReducer
  });

  export default rootReducer;
  ```


## Lecture 39: Action Creator Hookup
- import all action creators like this: `import * as actions from '../actions';`
- This is a great lecture on quickly hooking up an action creator into my component
- ALSO => it doesn't use mapDispatchToProps...it's a pretty neat shortcut
- The code below doesn't show the event handlers but notice how there is no `mapDispatchToProps` but also
notice how we use the `actions` that we've imported from our action creators.  The rest is a pretty
standard use of connect.

```js

function mapStateToProps(state) {
	return { authenticated: state.authenticated };
}

export default connect(mapStateToProps, actions)(Header);
```


## Lecture 40: Authentication Higher Order Component
- here we just built the Auth HOC, we didn't discuss it...see L41 for discussion

## Lecture 41: HOC Scaffold Code



















