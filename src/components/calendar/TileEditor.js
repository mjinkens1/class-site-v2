import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { IconButton, ListItemText, TextField, Tooltip } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { Card } from '../common/card/Card'
import { EditTools } from '../editTools/EditTools'
import { CalendarChip } from './CalendarChip'
import { db } from '../../config/firebase'
import { toKebabCase } from '../../util'
import _ from 'lodash-uuid'

export const TileEditor = ({
    data,
    date,
    setShowEditor,
    setTileItems,
    tileItems,
    updateDb,
    visible,
}) => {
    const [text, setText] = useState('')
    const [selectedForDelete, setSelectedForDelete] = useState([])

    const dateString = date
        .toString()
        .split(' ')
        .slice(0, 4)
        .join(' ')

    const cancelChanges = () => {
        setShowEditor(false)
        setText('')
        setSelectedForDelete([])
    }

    const deleteItem = id => {
        if (selectedForDelete.includes(id)) {
            const filtered = selectedForDelete.filter(itemId => itemId !== id)

            setSelectedForDelete(filtered)
        } else {
            setSelectedForDelete([...selectedForDelete, id])
        }
    }

    const saveChanges = () => {
        const id = _.uuid()
        const filteredItems = tileItems.filter(
            ({ id }) => !selectedForDelete.includes(id)
        )
        const itemtoAdd = text && text.length > 0 ? [{ id, text }] : []

        const update = {
            [toKebabCase(dateString)]: [...filteredItems, ...itemtoAdd],
        }

        const calendarRef = db.collection('data').doc('calendar')

        setTileItems(update[toKebabCase(dateString)])
        updateDb(calendarRef, update)
        setShowEditor(false)
        setText('')
        setSelectedForDelete([])
    }

    const portalNode = document.getElementById('calendar-editor-portal')

    return portalNode
        ? ReactDOM.createPortal(
              visible && (
                  <div className="calendar-tile-editor-wrapper">
                      <div className="calendar-editor-close">
                          <Tooltip title="Close">
                              <IconButton onClick={() => setShowEditor(false)}>
                                  <CloseIcon fontSize="small" />
                              </IconButton>
                          </Tooltip>
                      </div>
                      <Card className="calendar-tile-editor">
                          <div className="tile-editor-date">
                              <ListItemText primary={dateString} />
                          </div>

                          <EditTools
                              saveChanges={saveChanges}
                              cancelChanges={cancelChanges}
                              edit
                          />
                          <TextField
                              autoFocus
                              required
                              style={{ width: 300 }}
                              value={text}
                              onChange={({ target }) => setText(target.value)}
                          />
                          <div className="edit-calendar-chips">
                              {tileItems &&
                                  tileItems.map(({ id, text }) => (
                                      <div
                                          key={id}
                                          id={id}
                                          onClick={() => deleteItem(id)}
                                      >
                                          <CalendarChip
                                              key={text}
                                              title={text}
                                              selectedForDelete={selectedForDelete.includes(
                                                  id
                                              )}
                                          />
                                      </div>
                                  ))}
                          </div>
                      </Card>
                  </div>
              ),
              portalNode
          )
        : null
}
