import React, { PureComponent } from 'react'
import { Loader } from '../common/loader/Loader'
import './styles.scss'

export class Syllabus extends PureComponent {
    state = {
        loaded: false,
    }

    _onLoad = () => this.setState({ loaded: true })

    render() {
        const { loaded } = this.state

        return (
            <div className="syllabus__container">
                {!loaded && (
                    <Loader containerStyle={{ position: 'absolute' }} />
                )}

                <object
                    onLoad={this._onLoad}
                    style={{ zIndex: 10, background: 'transparent' }}
                    data="https://firebasestorage.googleapis.com/v0/b/classsite-9148d.appspot.com/o/syllabus.pdf?alt=media&token=3849f546-bdf0-44d6-ae3f-9eace07d542e"
                    type="application/pdf"
                    width="100%"
                    height="100%"
                    aria-label="Syllabus"
                />
            </div>
        )
    }
}
