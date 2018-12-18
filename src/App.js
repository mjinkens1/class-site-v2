import React from 'react'
import { Provider } from 'react-redux'
import { store } from './config/redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './containers/header/Header'
import Home from './containers/home/Home'
import './index.scss'

const App = () => (
    <Provider store={store}>
        <Header />
        <Router>
            <Route exact path="/">
                <Home />
            </Route>
        </Router>
    </Provider>
)

export default App
