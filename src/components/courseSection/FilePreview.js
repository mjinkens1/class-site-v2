import React, { PureComponent } from 'react'
import { IconButton, Tooltip, Typography } from '@material-ui/core'
import FullScreen from '@material-ui/icons/Fullscreen'
import FileViewer from 'react-file-viewer'

export class FilePreview extends PureComponent {
    state = {
        showError: false,
    }

    _enterFullScreen = () => null

    render() {
        const { selectedForPreview } = this.props
        const { name, preview } = selectedForPreview

        return (
            <div className="course-section__file-preview">
                <div className="course-section__file-preview__fullscreen-button">
                    <Tooltip placement="bottom" title="Fullscreen">
                        <IconButton onClick={this._enterFullScreen}>
                            <FullScreen />
                        </IconButton>
                    </Tooltip>
                </div>
                {preview ? (
                    <object
                        key={preview}
                        width="auto"
                        height="100%"
                        data={preview}
                        name={name}
                        aria-label="File Preview"
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
