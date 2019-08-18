import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { toJS } from '../toJS'

const FileFullscreenContainer = ({ match }) => {
    const [params, setParams] = useState({})

    useEffect(() => {
        const encodedParams = match.params

        const decodedParams = Object.entries(encodedParams).reduce(
            (acc, [key, val]) => {
                const decodedVal = decodeURIComponent(val)

                return {
                    ...acc,
                    [key]: decodedVal,
                }
            },
            {}
        )

        setParams(decodedParams)
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

const mapStateToProps = ({ authentication, storage }) => ({})

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(FileFullscreenContainer))
