import React from 'react'
import { CircularProgress, Grid } from '@material-ui/core'
import { FileGridItem } from './FileGridItem'

export const FileGrid = ({
    edit,
    filesArray,
    filePreviews,
    gettingFiles,
    selectForPreview,
    selectForDelete,
    selectedForDelete,
    setFullscreenFile,
}) => {
    return gettingFiles ? (
        <div className="course-section__loader">
            <CircularProgress
                size={30}
                style={{ color: 'rgb(102, 153, 255)' }}
            />
        </div>
    ) : (
        <Grid
            justify="center"
            container
            spacing={32}
            style={{
                alignSelf: 'center',
                width: 'auto',
                height: 'auto',
                margin: 0,
                marginTop: 16,
            }}
        >
            {filesArray.concat(filePreviews).map(file => (
                <FileGridItem
                    key={file.id || file.name}
                    edit={edit}
                    file={file}
                    selectForPreview={selectForPreview}
                    selectForDelete={selectForDelete}
                    selectedForDelete={selectedForDelete}
                    setFullscreenFile={setFullscreenFile}
                />
            ))}
        </Grid>
    )
}
