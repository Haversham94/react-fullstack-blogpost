import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './styles.css';
import reducers from './reducers';
import PostsList from './components/PostsList.jsx';
import PostsDetail from './components/PostsDetail.jsx';
import PostsNew from './components/PostsNew.jsx';
import Header from './components/Header.jsx';
import Signin from './components/auth/Signin.jsx';

//store setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(promise, reduxThunk))
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                    <Route path="/signin" component={Signin} />
                    <Route path="/posts/new" component={PostsNew} />
                    <Route path="/posts/:id" component={PostsDetail} />
                    <Route path="/" component={PostsList} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);
