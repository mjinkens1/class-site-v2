import React, { Fragment, useRef } from 'react'
import {
    Card,
    CardActionArea,
    CardContent,
    CircularProgress,
    Grid,
    IconButton,
    Tooltip,
    Typography,
} from '@material-ui/core'
import FileIcon from '@material-ui/icons/Save'
import Delete from '@material-ui/icons/RemoveCircle'
import Undo from '@material-ui/icons/Undo'
import { styles } from '../../config/styles'

const GRID_FILE_WIDTH = '100%'
const GRID_FILE_HEIGHT = '150px'

const ItemBody = ({
    edit,
    file,
    selectForDelete,
    selectedForDelete,
    selectForPreview,
}) => {
    const selectTimer = useRef(null)

    const onMouseEnter = () => {
        if (!deleting) {
            if (selectTimer.current) {
                clearTimeout(selectTimer.current)
            }

            selectTimer.current = setTimeout(() => {
                selectForPreview(name, preview, type, url)
            }, 250)
        }
    }

    const onMouseLeave = () => {
        if (selectTimer.current) {
            clearTimeout(selectTimer.current)
        }
    }

    const { deleting, name, preview, type, saved, url } = file
    const isMSDoc = type && type.includes('officedocument')

    return (
        <Tooltip
            disableFocusListener={deleting}
            disableHoverListener={deleting}
            disableTouchListener={deleting}
            title={name}
        >
            <div
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={{ position: 'relative' }}
            >
                <Card
                    style={{
                        position: 'relative',
                        width: 140,
                        height: 200,
                        pointerEvents: deleting ? 'none' : 'auto',
                        cursor: 'initial',
                    }}
                >
                    <CardActionArea
                        style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: 140,
                            height: 200,
                        }}
                    >
                        {preview && (saved || (!saved && edit)) ? (
                            isMSDoc ? (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexGrow: 1,
                                    }}
                                >
                                    <FileIcon
                                        style={{
                                            height: 160,
                                            fontSize: 80,
                                            color: styles.textPrimaryDark,
                                        }}
                                    />
                                </div>
                            ) : (
                                <object
                                    data={preview}
                                    height={GRID_FILE_HEIGHT}
                                    width={GRID_FILE_WIDTH}
                                    style={{
                                        width: 'calc(100% - 8px)',
                                        margin: '4px',
                                        objectFit: 'contain',
                                        pointerEvents: 'none',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {name}
                                </object>
                            )
                        ) : (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: GRID_FILE_WIDTH,
                                    height: GRID_FILE_HEIGHT,
                                }}
                            >
                                <CircularProgress
                                    size={30}
                                    style={{
                                        color: styles.bgPrimaryDark,
                                    }}
                                />
                            </div>
                        )}
                        <CardContent>
                            <Typography
                                noWrap
                                style={{
                                    fontSize: 10,
                                }}
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                {name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                {deleting && (
                    <Fragment>
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                width: 140,
                                height: 200,
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                borderRadius: 4,
                            }}
                        />
                        <Typography
                            noWrap
                            style={{
                                position: 'absolute',
                                top: '40%',
                                left: '30%',
                                fontSize: 14,
                                fonWeight: 'bold',
                                color: 'white',
                            }}
                            variant="body2"
                            component="p"
                        >
                            Deleting...
                        </Typography>{' '}
                    </Fragment>
                )}
            </div>
        </Tooltip>
    )
}

export const FileGridItem = ({
    edit,
    file,
    selectForDelete,
    selectedForDelete,
    selectForPreview,
}) => {
    const { id, name, type, url } = file

    const href = `file/${encodeURIComponent(name)}/${encodeURIComponent(
        type
    )}/${encodeURIComponent(url)}`

    return (
        <Grid item key={id || name}>
            {edit ? (
                <div style={{ position: 'relative' }}>
                    <ItemBody
                        edit={edit}
                        file={file}
                        selectForDelete={selectForDelete}
                        selectedForDelete={selectedForDelete}
                        selectForPreview={selectForPreview}
                    />
                    <div style={{ position: 'absolute', top: -24, right: -20 }}>
                        <IconButton
                            onClick={() =>
                                selectForDelete(
                                    name,
                                    selectedForDelete.includes(name)
                                )
                            }
                        >
                            {selectedForDelete.includes(name) ? (
                                <Tooltip title="Undo Delete">
                                    <Undo style={{ color: 'green' }} />
                                </Tooltip>
                            ) : (
                                <Tooltip title="Delete">
                                    <Delete style={{ color: 'red' }} />
                                </Tooltip>
                            )}
                        </IconButton>
                    </div>
                </div>
            ) : (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        position: 'relative',
                        pointerEvents: file.deleting ? 'none' : 'auto',
                    }}
                >
                    <ItemBody
                        edit={edit}
                        file={file}
                        selectForDelete={selectForDelete}
                        selectedForDelete={selectedForDelete}
                        selectForPreview={selectForPreview}
                    />
                </a>
            )}
        </Grid>
    )
}
