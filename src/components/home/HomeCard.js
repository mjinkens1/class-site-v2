import React, { PureComponent } from 'react'
import { CircularProgress, List } from '@material-ui/core'
import { Card } from '../common/card/Card'
import { EditTools } from '../editTools/EditTools'
import { CardListItem } from '../cardListItem/CardListItem'
import { FloatingEditor } from '../floatingEditor/FloatingEditor'
import {
    EditorState,
    ContentState,
    convertToRaw,
    convertFromHTML,
} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { db } from '../../config/firebase'
import uniqueId from 'lodash/uniqueId'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './styles.scss'

export class HomeCard extends PureComponent {
    state = {
        edit: false,
        dataList: [],
        itemTitle: null
    }

    _toggleEdit = () => this.setState({ edit: !this.state.edit })

    _addItem = () => {
        const id = uniqueId(`home-card-${this.props.title}-card-list-item`)

        this.setState({
            showEditor: true,
            idToEdit: id,
            dataList: [
                ...this.state.dataList,
                {
                    localId: id,
                    body: '',
                    timestamp: Date.now(),
                },
            ].sort((a, b) => b.timestamp - a.timestamp),
            editorState: EditorState.createEmpty(),
        })
    }

    _deleteItem = id => {
        this.setState({
            dataList: this.state.dataList.filter(item => item.localId !== id),
        })
    }

    _editItem = id => {
        const html = this.state.dataList.find(item => item.localId === id).body,
            blocksFromHTML = convertFromHTML(html)

        if (blocksFromHTML.contentBlocks) {
            const state = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            )

            this.setState({
                editorState: EditorState.createWithContent(state),
            })
        }

        this.setState({
            showEditor: true,
            idToEdit: id,
        })
    }

    _closeEditor = save => {
        if (save && !this.state.itemTitle)
            return this.setState({ inputError: true })

        const updatedDataList = this.state.dataList.map(item => {
            if (item.localId === this.state.idToEdit)
                return {
                    ...item,
                    title: this.state.itemTitle,
                    body: draftToHtml(
                        convertToRaw(this.state.editorState.getCurrentContent())
                    ),
                }
            else return item
        })

        this.setState({
            showEditor: false,
            inputError: false,
            itemTitle: null,
            dataList: save ? updatedDataList : this.state.dataList,
        })
    }

    _onEditorStateChange = editorState => {
        this.setState({
            editorState,
        })
    }

    _onInputTextChange = text => this.setState({ itemTitle: text })

    _saveChanges = () => {
        const homeRef = db
            .collection('data')
            .doc('home')
            .collection(`home-card-${this.props.title}`)

        this.props.updateDb(homeRef, this.state.dataList)
        this.setState({ edit: !this.state.edit })
    }

    _cancelChanges = () =>
        this.setState({
            edit: !this.state.edit,
            dataList: this.props.data
                .map(item => ({
                    ...item.data(),
                    _id: item.id,
                    localId: item.id,
                }))
                .sort((a, b) => b.timestamp - a.timestamp),
        })

    componentDidMount() {
        const homeRef = db
            .collection('data')
            .doc('home')
            .collection(`home-card-${this.props.title}`)

        this.props.getDocsFromDb(homeRef, `home-card-${this.props.title}`)

        this.setState({
            editorState: EditorState.createEmpty(),
        })
    }

    componentDidUpdate(prevProps) {
        const { data } = this.props

        if (!prevProps.data && data)
            this.setState({
                dataList: data
                    .map(item => ({
                        ...item.data(),
                        _id: item.id,
                        localId: item.id,
                    }))
                    .sort((a, b) => b.timestamp - a.timestamp),
            })
    }

    render() {
        const { icon, title, user, data, itemAvatar } = this.props,
            { dataList, edit, showEditor, editorState, itemTitle, inputError } = this.state

        return (
            <Card id={title} className="card">
                <div className="card-body">
                    {user && (
                        <EditTools
                            addItem={this._addItem}
                            toggleEdit={this._toggleEdit}
                            saveChanges={this._saveChanges}
                            cancelChanges={this._cancelChanges}
                            edit={edit}
                        />
                    )}

                    {user && showEditor && (
                        <FloatingEditor
                            closeEditor={this._closeEditor}
                            showEditor={showEditor}
                            editorState={editorState}
                            onEditorStateChange={this._onEditorStateChange}
                            onTextChange={this._onInputTextChange}
                            title={itemTitle}
                            inputError={inputError}
                        />
                    )}

                    {data ? (
                        <div className="card-data">
                            <List>
                                {dataList.map(listItem => {
                                    return (
                                        <CardListItem
                                            key={
                                                listItem._id || listItem.localId
                                            }
                                            id={listItem._id}
                                            localId={listItem.localId}
                                            body={listItem.body}
                                            title={listItem.title}
                                            deleteItem={this._deleteItem}
                                            editItem={this._editItem}
                                            edit={edit}
                                            avatar={itemAvatar}
                                        />
                                    )
                                })}
                            </List>
                        </div>
                    ) : (
                            <div className="home-card__progress">
                                <CircularProgress
                                    size={30}
                                    style={{ color: 'red' }}
                                />
                            </div>
                        )}
                </div>
                <div className="card-info">
                    {icon}
                    <p className="card-title">{title}</p>
                </div>
            </Card>
        )
    }
}
