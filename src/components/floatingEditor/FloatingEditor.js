import React, { PureComponent } from 'react'
import { Editor } from 'react-draft-wysiwyg'
// import CloseIcon from '@material-ui/icons/Close'
import DoneIcon from '@material-ui/icons/Done'
import CancelIcon from '@material-ui/icons/Close'
import { Button } from '@material-ui/core'
import './styles.scss'

export class FloatingEditor extends PureComponent {
    render() {
        const { closeEditor, editorState, onEditorStateChange } = this.props

        return (
            <div className="floating-editor">
                <div className="floating-editor__close">
                    <Button
                        size="small"
                        color="primary"
                        aria-label="Save Changes"
                        style={{ margin: 4 }}
                        onClick={() => closeEditor(true)}
                    >
                        SAVE CHANGES
                        <DoneIcon style={{ marginLeft: 4 }} />
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        aria-label="Cancel"
                        style={{ margin: 4 }}
                        onClick={() => closeEditor(false)}
                    >
                        CANCEL
                        <CancelIcon style={{ marginLeft: 4 }} />
                    </Button>
                </div>
                <Editor
                    editorClassName="floating-editor__editor"
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                />
            </div>
        )
    }
}
