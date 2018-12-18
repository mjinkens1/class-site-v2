import React, { PureComponent } from 'react'
import './styles.scss'


export class RSSVideo extends PureComponent {

    componentDidMount() {
        this.props.getRSSVideo();
    }
    render() {
        const { rssVideo } = this.props;
        
        return(
            <div className='video'>
                <video 
                    type="video/mp4"
                    src={ rssVideo } 
                    width='100%' 
                    height='100%' 
                    controls 
                    poster="https://cdn.cnn.com/cnnnext/dam/assets/161215172110-sn-1216-00075710-full-169.jpg"
                />
            </div>
        )
    }
}