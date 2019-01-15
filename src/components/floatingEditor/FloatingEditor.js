import React, { PureComponent } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import DoneIcon from '@material-ui/icons/Done'
import CancelIcon from '@material-ui/icons/Close'
import { Button, TextField } from '@material-ui/core'
import { toolbarConfig } from '../../config/textEditor'
import './styles.scss'

export class FloatingEditor extends PureComponent {
    render() {
        const { closeEditor, editorState, onEditorStateChange, onTextChange, inputError, title } = this.props

        return (
            <div className="floating-editor">
                <div className="floating-editor__close">
                    <div className='floating-editor__input-wrapper'>
                        <TextField
                            id="title"
                            label="Title"
                            autoFocus
                            required
                            error={inputError}
                            style={{ width: 300 }}
                            value={title}
                            onChange={({ target }) =>
                                onTextChange(target.value)
                            }
                        />
                    </div>
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
                    toolbar={toolbarConfig}
                />
            </div>
        )
    }
}
