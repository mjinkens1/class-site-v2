import React, { PureComponent } from 'react'
import { IconButton, Tooltip, Typography } from '@material-ui/core'
import FullScreen from '@material-ui/icons/Fullscreen'
import FileViewer from 'react-file-viewer'

export class FilePreview extends PureComponent {
    state = {
        showError: false,
    }

    _enterFullScreen = () => null

    _onError = () => this.setState({ showError: true })

    render() {
        const { path, type } = this.props

        return (
            <div className="course-section__file-preview">
                <div className="course-section__file-preview__fullscreen-button">
                    <Tooltip placement="bottom-start" title="Fullscreen">
                        <IconButton onClick={this._enterFullScreen}>
                            <FullScreen />
                        </IconButton>
                    </Tooltip>
                </div>
                {path && type ? (
                    <FileViewer
                        fileType={type}
                        filePath={path}
                        onError={this._onError}
                    />
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
            </div>
        )
    }
}
