import React, { PureComponent } from 'react'
import { CircularProgress, List, Typography } from '@material-ui/core'
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
import { styles } from '../../config/styles'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './styles.scss'
import { toKebabCase } from '../../util'

export class LinksCard extends PureComponent {
    state = {
        edit: false,
        dataList: [],
        itemTitle: '',
    }

    _toggleEdit = () => this.setState({ edit: !this.state.edit })

    _addItem = () => {
        const id = uniqueId(
            `links-card-${toKebabCase(
                this.props.history.location.pathname
            )}-card-list-item`
        )

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
            itemTitle:
                this.state.dataList.find(
                    item => item._id === id || item.localId === id
                ).title || '',
        })
    }

    _closeEditor = save => {
        if (save && !this.state.itemTitle.length > 0)
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
            itemTitle: '',
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
        const dbRef = db
            .collection('data')
            .doc(toKebabCase(this.props.history.location.pathname))
            .collection('links')

        this.props.updateDb(dbRef, this.state.dataList)
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
        const { data } = this.props

        if (!data) {
            const dbRef = db
                .collection('data')
                .doc(`${toKebabCase(this.props.history.location.pathname)}`)
                .collection('links')

            this.props.getDocsFromDb(
                dbRef,
                toKebabCase(this.props.history.location.pathname)
            )

            this.setState({
                editorState: EditorState.createEmpty(),
            })
        } else
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
        const { gettingDocsFromDb, history, user } = this.props,
            {
                dataList,
                edit,
                showEditor,
                editorState,
                itemTitle,
                inputError,
            } = this.state

        return (
            <Card
                id={history.location.pathname}
                className="course-section__card--links"
            >
                <div className="card-body">
                    <div className="course-section__links-card-title">
                        <Typography
                            variant="display1"
                            align="left"
                            gutterBottom
                            style={{ fontSize: 24, margin: 12 }}
                        >
                            Links and Resources
                        </Typography>
                        {user && (
                            <EditTools
                                addItem={this._addItem}
                                toggleEdit={this._toggleEdit}
                                saveChanges={this._saveChanges}
                                cancelChanges={this._cancelChanges}
                                edit={edit}
                            />
                        )}
                    </div>

                    {user && showEditor && (
                        <FloatingEditor
                            closeEditor={this._closeEditor}
                            showEditor={showEditor}
                            editorState={editorState}
                            onEditorStateChange={this._onEditorStateChange}
                            onTextChange={this._onInputTextChange}
                            title={itemTitle}
                            inputError={inputError}
                            style={{ left: '-2%', bottom: '-45%' }}
                        />
                    )}

                    {!gettingDocsFromDb ? (
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
                                        />
                                    )
                                })}
                            </List>
                        </div>
                    ) : (
                        <div className="home-card__progress">
                            <CircularProgress
                                size={30}
                                style={{ color: 'rgb(102, 153, 255)' }}
                            />
                        </div>
                    )}
                </div>
            </Card>
        )
    }
}
