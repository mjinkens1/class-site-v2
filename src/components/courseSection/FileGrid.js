import React from 'react'
import { Grid } from '@material-ui/core'
import { FileGridItem } from './FileGridItem'
import { styles } from '../../config/styles'

export const FileGrid = ({
    edit,
    filesArray,
    filePreviews,
    selectForPreview,
    selectForDelete,
    selectedForDelete,
}) => (
    <Grid
        // justify="center"
        container
        spacing={32}
        style={{
            alignSelf: 'center',
            marginTop: 16,
            padding: 20,
        }}
    >
        {filesArray.concat(filePreviews).map(({ name, preview }) => {
            return (
                <FileGridItem
                    key={name}
                    edit={edit}
                    name={name}
                    preview={preview}
                    selectForPreview={selectForPreview}
                    selectForDelete={selectForDelete}
                    selectedForDelete={selectedForDelete}
                />
            )
        })}
    </Grid>
)
