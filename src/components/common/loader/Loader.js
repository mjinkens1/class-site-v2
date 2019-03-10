import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import './styles.scss'

export const Loader = ({ containerStyle, style }) => (
    <div className="loader__container" style={containerStyle}>
        <CircularProgress style={{ color: 'white', ...style }} />
    </div>
)
