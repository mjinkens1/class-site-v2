import React, { PureComponent } from 'react'
import { Provider } from 'react-redux'
import { store } from './config/redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './containers/header/Header'
import Home from './containers/home/Home'
import { SideDrawer } from './components/sideDrawer/SideDrawer'
import './index.scss'

export class App extends PureComponent {

    state = {
        drawerOpen: false
    }

    _toggleDrawer = () => this.setState({ drawerOpen: !this.state.drawerOpen })

    render() {
        const { drawerOpen } = this.state;

        return( 
            <Provider store={ store }>
                <Header toggleDrawer={ this._toggleDrawer }/>
                <SideDrawer open={ drawerOpen } toggleDrawer={ this._toggleDrawer }/>
                <Router>
                    <Route exact path="/">
                        <Home />
                    </Route>
                </Router>
            </Provider>
        )
    }
}

export default App
