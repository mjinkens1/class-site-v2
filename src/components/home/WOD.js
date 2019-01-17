import React from 'react'
import { CircularProgress, Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import { Card } from '../common/card/Card'
import './styles.scss'

export const WOD = ({ icon, title, reverse, data }) => {
    return (
        <Card id={title} className={`card ${reverse ? 'card-reverse' : ''}`}>
            <div className="card-body">
                {data ? (
                    <div className="wod__data">
                        <div className='wod__data--wrapper'>
                            <Typography variant='display1' align='left' gutterBottom>
                                {data.title}
                            </Typography>
                            <Typography variant='h6' align='left' style={{ marginLeft: 8 }}>
                                {data.description[0]}
                            </Typography>
                            <div className='wod__data--align'>
                                {
                                    data.description.slice(1).map(item =>
                                        <Typography variant='h6' align='left' gutter style={{ marginLeft: 8 }}>
                                            {item}
                                        </Typography>)
                                }
                            </div>
                            <Link align='right' href={data.link} target="_blank" rel="noopener" style={{ marginTop: 16 }}>
                                <Typography style={{ color: '#0645AD' }}>
                                    Learn more
                            </Typography>
                            </Link>
                        </div>
                    </div>
                ) : (
                        <div className="home-card__progress">
                            <CircularProgress
                                size={30}
                                style={{ color: 'red' }}
                            />
                        </div>
                    )}
            </div>
            <div className="card-info">
                {icon}
                <p className="card-title">{title}</p>
            </div>
        </Card>
    )
}