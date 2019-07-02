import React from 'react'
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
import Delete from '@material-ui/icons/RemoveCircle'
import Undo from '@material-ui/icons/Undo'
import { styles } from '../../config/styles'

export const FileGridItem = ({
    edit,
    name,
    preview,
    selectForDelete,
    selectedForDelete,
    selectForPreview,
    type,
}) => (
    <Grid item key={name}>
        <a
            href={!edit ? preview : null}
            download={name}
            style={{ position: 'relative' }}
        >
            <Tooltip title={name}>
                <div onMouseEnter={() => selectForPreview(name, preview)}>
                    <Card
                        style={{
                            position: 'relative',
                            width: 140,
                            height: 200,
                        }}
                    >
                        <CardActionArea>
                            {preview ? (
                                <object
                                    data={preview}
                                    height={150}
                                    width="100%"
                                >
                                    File
                                </object>
                            ) : (
                                <CircularProgress
                                    size={30}
                                    style={{
                                        color: styles.bgPrimaryDark,
                                    }}
                                />
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
                </div>
            </Tooltip>
            {edit && (
                <div style={{ position: 'absolute', top: -225, right: -165 }}>
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
                                <Undo />
                            </Tooltip>
                        ) : (
                            <Tooltip title="Delete">
                                <Delete style={{ color: 'red' }} />
                            </Tooltip>
                        )}
                    </IconButton>
                </div>
            )}
        </a>
    </Grid>
)
