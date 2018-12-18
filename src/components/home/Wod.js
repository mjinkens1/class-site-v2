import React from 'react'
import { Card } from '../common/card/Card'
import './styles.scss'

export const Wod = ({ icon, title, wodData }) => (
    <Card className="card">
        <div className="card-layout">
            <div className="card-info">
                {icon}
                <p className="card-title">{title}</p>
            </div>
            <div>{wodData}</div>
        </div>
    </Card>
)
