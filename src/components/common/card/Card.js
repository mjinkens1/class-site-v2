import React from 'react'
import './styles.scss'

export const Card = ({ className, children, style }) => (
    <div className={`card-base ${className}`} style={style}>
        {children}
    </div>
)
