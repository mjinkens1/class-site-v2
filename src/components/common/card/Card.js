import React from 'react'
import './styles.scss'

export const Card = ({ className, children }) => (
    <div className={`card-base ${className}`}>{children}</div>
)
