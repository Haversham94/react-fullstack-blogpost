import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';

import reducers from './reducers';
import PostsList from './components/PostsList.jsx';
import PostsDetail from './components/PostsDetail.jsx';
import Header from './components/Header.jsx';

//store setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware()));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Header />
                <Route path="/" component={PostsList} />
                <Route path="/posts/:id" component={PostsDetail} />
            </div>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);
