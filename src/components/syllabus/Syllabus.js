import React, { PureComponent } from 'react'
import { Loader } from '../common/loader/Loader'
import './styles.scss'

export class Syllabus extends PureComponent {
    state = {
        loaded: false,
    }

    _onLoad = () => this.setState({ loaded: true })

    async componentDidMount() {
        // const fileReader = new FileReader()
        // const blob = await fetch(
        //     'https://firebasestorage.googleapis.com/v0/b/classsite-9148d.appspot.com/o/syllabus.pdf?alt=media&token=3849f546-bdf0-44d6-ae3f-9eace07d542e'
        // ).then(result => result.blob())
        // fileReader.onload = ({ target }) => {
        //     this.setState({ data: target.result })
        // }
        // fileReader.readAsDataURL(blob)
    }

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
                    data="https://firebasestorage.googleapis.com/v0/b/classsite-9148d.appspot.com/o/2019%202020%20WHAP%20Syllabus.pdf?alt=media&token=ab8c7b13-188f-4e31-b13c-52f8f1af3fa8"
                    type="application/pdf"
                    width="100%"
                    height="100%"
                    aria-label="Syllabus"
                />
            </div>
        )
    }
}
