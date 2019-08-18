import React, { useEffect, useRef, useState } from 'react'
import { CalendarChip } from './CalendarChip'
import { IconButton, Tooltip } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Create'
import { TileEditor } from './TileEditor'
import { toKebabCase } from '../../util'

export const CalendarTile = ({
    calendarData,
    date,
    dateCollection,
    getDocsFromDb,
    selectedTile,
    updateDb,
    user,
}) => {
    const [showEditor, setShowEditor] = useState(false)
    const [tileItems, setTileItems] = useState([])

    const tileRef = useRef()
    const siblingRef = useRef()

    const dateString = date
        .toString()
        .split(' ')
        .slice(0, 4)
        .join(' ')

    useEffect(() => {
        const data = calendarData && calendarData[toKebabCase(dateString)]

        if (data) {
            setTileItems(data)
        }
    }, [calendarData])

    useEffect(() => {
        siblingRef.current = tileRef.current.previousSibling

        if (tileItems && tileItems.length > 0) {
            siblingRef.current.style.color =
                selectedTile === dateString ? '#ffffff' : 'rgb(102, 153, 255)'
        }
    }, [selectedTile, tileItems])

    return (
        <div ref={tileRef} className="tile">
            {user && (
                <div className="calendar__tile__edit">
                    <div>
                        <Tooltip title="Edit">
                            <IconButton
                                onClick={() => setShowEditor(true)}
                                style={{ transform: 'scale(0.8)' }}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            )}
            {tileItems &&
                tileItems.map(({ text }) => (
                    <div key={text} className="tile-icons">
                        <CalendarChip title={text} />
                    </div>
                ))}
            <TileEditor
                collection={dateCollection}
                date={date}
                updateDb={updateDb}
                visible={showEditor}
                setShowEditor={setShowEditor}
                setTileItems={setTileItems}
                tileItems={tileItems}
            />
        </div>
    )
}
