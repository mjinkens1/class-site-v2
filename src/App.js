import React, { PureComponent, Fragment } from 'react'
import { Provider } from 'react-redux'
import { store } from './config/redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Header from './containers/header/Header'
import { SideDrawer, sideListItems } from './components/sideDrawer/SideDrawer'
import Home from './containers/home/Home'
import { Syllabus } from './components/syllabus/Syllabus'
import CourseSection from './containers/courseSection/CourseSection'
import FileFullscreen from './containers/fileFullscreen/FileFullscreen'
import { PageNotFound } from './components/pageNotFound/PageNotFound'
import { toKebabCase } from './util'
import './index.scss'

export default class Appo extends PureComponent {
    state = {
        drawerOpen: false,
    }

    _toggleDrawer = () =>
        this.setState(({ drawerOpen }) => ({ drawerOpen: !drawerOpen }))

    render() {
        const { drawerOpen } = this.state

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Fragment>
                        <Header toggleDrawer={this._toggleDrawer} />
                        <SideDrawer
                            open={drawerOpen}
                            toggleDrawer={this._toggleDrawer}
                        />
                        <Switch>
                            <Route
                                exact
                                path="/syllabus"
                                component={Syllabus}
                            />
                            <Route exact path="/home" component={Home} />
                            {sideListItems[1].map(({ text }) => (
                                <Route
                                    key={text}
                                    exact
                                    path={`/${toKebabCase(
                                        text.split('.')[1].trim()
                                    )}`}
                                    component={CourseSection}
                                />
                            ))}
                            <Route
                                path="/file/:name/:type/:url"
                                component={FileFullscreen}
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
