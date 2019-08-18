import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { toJS } from '../toJS'

const FileFullscreenContainer = () => {
    const [params, setParams] = useState({})

    useEffect(() => {
        const addressParams = new URLSearchParams(window.location.href)

        let paramsObj = {}

        for (let param of addressParams.entries()) {
            if (param[0].includes('?')) {
                paramsObj[param[0].split('?')[1]] = param[1]
            } else {
                paramsObj[param[0]] = param[1]
            }
        }

        setParams(paramsObj)
    }, [])

    const { name, type, url } = params

    const isMSDoc = type && type.includes('officedocument')

    const formattedUrl =
        url && url.split(`/${name}`)[0] + '%2F' + name + url.split(name)[1]

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch',
                width: '100%',
                height: 'calc(100% - 56px)',
            }}
        >
            {!isMSDoc ? (
                <object
                    width="auto"
                    height="100%"
                    data={formattedUrl}
                    style={{ objectFit: 'contain' }}
                >
                    {name}
                </object>
            ) : (
                <iframe
                    title="Preview"
                    width="auto"
                    height="100%"
                    frameBorder="0"
                    src={`https://docs.google.com/gview?url=${encodeURI(
                        formattedUrl
                    )}&embedded=true`}
                    style={{
                        objectFit: 'contain',
                    }}
                ></iframe>
            )}
        </div>
    )
}

const mapStateToProps = ({ authentication, storage, fileFullscreen }) => ({
    fullscreenFile: fileFullscreen.get('fullscreenFile'),
})

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(FileFullscreenContainer))
