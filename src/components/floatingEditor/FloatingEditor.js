import React, { PureComponent } from 'react'
// import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { IconButton, Tooltip } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { toolbarConfig } from '../../config/textEditor'
import './styles.scss'

export class FloatingEditor extends PureComponent {
    render() {
        const { closeEditor, editorState, onEditorStateChange } = this.props

        return (
            <div className="floating-editor">
                <div className="floating-editor__close">
                    <Tooltip title="Save & Close">
                        <IconButton
                            onClick={closeEditor}
                            style={{ marginBottom: 4 }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </div>

                <Editor
                    editorClassName="floating-editor__editor"
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    toolbar={toolbarConfig}
                />
            </div>
        )
    }
}
