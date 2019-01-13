import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
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
                    body: '<b> </b>',
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

    _closeEditor = () => {
        const updatedDataList = this.state.dataList.map(item => {
            if (item.localId === this.state.idToEdit)
                return {
                    ...item,
                    body: draftToHtml(
                        convertToRaw(this.state.editorState.getCurrentContent())
                    ),
                }
            else return item
        })

        this.setState({
            showEditor: false,
            dataList: updatedDataList,
        })
    }

    _onEditorStateChange = editorState => {
        this.setState({
            editorState,
        })
    }

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
            dataList: this.props.data.map(item => ({
                ...item.data(),
                _id: item.id,
            })),
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

    componentDidUpdate(prevProps, prevState) {
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
        const { icon, title, user, data } = this.props,
            { dataList, edit, showEditor, editorState } = this.state

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
                        />
                    )}

                    {data ? (
                        <div className="card-data">
                            <ul>
                                {dataList.map(listItem => {
                                    return (
                                        <CardListItem
                                            key={
                                                listItem._id || listItem.localId
                                            }
                                            id={listItem._id}
                                            localId={listItem.localId}
                                            body={listItem.body}
                                            deleteItem={this._deleteItem}
                                            editItem={this._editItem}
                                            edit={edit}
                                        />
                                    )
                                })}
                            </ul>
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
