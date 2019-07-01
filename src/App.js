import React, { PureComponent, Fragment } from 'react'
import { Provider } from 'react-redux'
import { store } from './config/redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Header from './containers/header/Header'
import { SideDrawer } from './components/sideDrawer/SideDrawer'
import Home from './containers/home/Home'
import { Syllabus } from './components/syllabus/Syllabus'
import CourseSection from './containers/courseSection/CourseSection'
import { PageNotFound } from './components/pageNotFound/PageNotFound'
import './index.scss'

export default class Appo extends PureComponent {
    state = {
        drawerOpen: false,
    }

    _toggleDrawer = () => this.setState(({ drawerOpen }) => ({ drawerOpen: !drawerOpen }))

    render() {
        const { drawerOpen } = this.state

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Fragment>
                        <Header toggleDrawer={this._toggleDrawer} />
                        <SideDrawer open={drawerOpen} toggleDrawer={this._toggleDrawer} />
                        <Switch>
                            <Route exact path="/syllabus" component={Syllabus} />
                            <Route exact path="/home" component={Home} />
                            <Route
                                exact
                                path="/technology & environment"
                                component={CourseSection}
                            />
                            <Route
                                exact
                                path="/organization of societies"
                                component={CourseSection}
                            />
                            <Route exact path="/regional interactions" component={CourseSection} />
                            <Route exact path="/global interactions" component={CourseSection} />
                            <Route
                                exact
                                path="/industrialization & integration"
                                component={CourseSection}
                            />
                            <Route
                                exact
                                path="/accelerating global change"
                                component={CourseSection}
                            />
                            <Route exact path="/404" component={PageNotFound} />
                            <Route exact path="/">
                                <Redirect to="/home" />
                            </Route>
                            <Route path="*">
                                <Redirect to="/404" />
                            </Route>
                        </Switch>
                    </Fragment>
                </BrowserRouter>
            </Provider>
        )
    }
}
