import React from 'react'
import { Card } from '../common/card/Card'
import './styles.scss'

export const HomeCard = ({ icon, title, dataList }) => (
    <Card className="card">
        <div className="card-data">
            <ul>
                {React.Children.map(dataList, listItem => {
                    return <li className="list-item">{listItem}</li>
                })}
            </ul>
        </div>
        <div className="card-info">
            {icon}
            <p className="card-title">{title}</p>
        </div>
    </Card>
)
