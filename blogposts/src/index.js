import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import { AUTH_USER } from './actions/types';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './styles.css';
import reducers from './reducers';
import PostsList from './components/PostsList.jsx';
import PostsDetail from './components/PostsDetail.jsx';
import PostsNew from './components/PostsNew.jsx';
import Header from './components/Header.jsx';
import Signin from './components/auth/Signin.jsx';
import Signup from './components/auth/Signup.jsx';
import Signout from './components/auth/Signout.jsx';
import AmazingFeature from './components/AmazingFeature.jsx';
import RequireAuth from './components/auth/RequireAuthentication.jsx';

// Create a history for browser environment
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const reactReduxRouter = routerMiddleware(history);

//store setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(promise, reduxThunk, reactReduxRouter))
);

// add logic to auth user automatically
const token = localStorage.getItem('token');

if (token) {
    store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Header />
                <Switch>
                    <Route path="/signin" component={Signin} />
                    <Route
                        path="/feature"
                        component={RequireAuth(AmazingFeature)}
                    />
                    <Route path="/signup" component={Signup} />
                    <Route path="/signout" component={Signout} />
                    <Route path="/posts/new" component={PostsNew} />
                    <Route path="/posts/:id" component={PostsDetail} />
                    <Route path="/" component={PostsList} />
                </Switch>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.querySelector('#root')
);
