import React, { Fragment, PureComponent } from 'react'
import {
    // IconButton, Tooltip,
    Typography,
} from '@material-ui/core'
// import FullScreen from '@material-ui/icons/Fullscreen'
// import { FullScreenDialog } from './FullScreenDialog'
import './styles.scss'

export class FilePreview extends PureComponent {
    state = {
        showError: false,
        // showDialog: false,
    }

    _toggleFullScreen = () =>
        this.setState(({ showDialog }) => ({ showDialog: !showDialog }))

    render() {
        const { selectedForPreview } = this.props
        // const { showDialog } = this.state
        const { name, preview, type, url } = selectedForPreview
        const isMSDoc = type && type.includes('officedocument')

        return (
            <Fragment>
                <div className="course-section__file-preview__fullscreen-button">
                    {/* <Tooltip placement="bottom" title="Fullscreen">
                        <IconButton onClick={this._toggleFullScreen}>
                            <FullScreen />
                        </IconButton>
                    </Tooltip> */}
                </div>
                <div className="course-section__file-preview">
                    {preview ? (
                        !isMSDoc ? (
                            <object
                                key={preview}
                                width="auto"
                                height="100%"
                                data={preview}
                                style={{
                                    objectFit: 'contain',
                                    maxWidth: '95%',
                                    maxHeight: '90%',
                                    marginBottom: 16,
                                    borderRadius: 4,
                                    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 2px',
                                }}
                            >
                                {name}
                            </object>
                        ) : (
                            <iframe
                                title="Preview"
                                width="auto"
                                height="90%"
                                frameBorder="0"
                                src={`https://docs.google.com/gview?url=${encodeURI(
                                    url
                                )}&embedded=true`}
                                style={{
                                    objectFit: 'contain',
                                    marginBottom: 16,
                                    borderRadius: 4,
                                    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.4)',
                                }}
                            ></iframe>
                        )
                    ) : (
                        <div className="course-section__file-preview--default">
                            <Typography
                                variant="display1"
                                align="center"
                                style={{ fontSize: 16 }}
                            >
                                Select a File to Preview
                            </Typography>
                        </div>
                    )}
                    <Typography
                        variant="display1"
                        align="center"
                        style={{ fontSize: 14 }}
                    >
                        {name}
                    </Typography>
                </div>
                {/* <FullScreenDialog
                    toggleFullScreen={this._toggleFullScreen}
                    visible={showDialog}
                    selectedForPreview={selectedForPreview}
                /> */}
            </Fragment>
        )
    }
}
