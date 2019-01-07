import React, { PureComponent } from 'react'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import CloseIcon from '@material-ui/icons/Close'
import SubjectIcon from '@material-ui/icons/Subject'
import TerrainIcon from '@material-ui/icons/Terrain'
import PeopleIcon from '@material-ui/icons/People'
import PlaceIcon from '@material-ui/icons/Place'
import WorldIcon from '@material-ui/icons/Public'
import GearsIcon from '@material-ui/icons/Settings'
import ChangeIcon from '@material-ui/icons/TrendingUp'
import AssignmentIcon from '@material-ui/icons/Assignment'
import ScoreIcon from '@material-ui/icons/Score'
import EmailIcon from '@material-ui/icons/Email'
import './styles.scss'

const sideListItems = [
    [
        {
            icon: <SubjectIcon style={{ color: 'gold' }} />,
            text: 'Syllabus',
        },
    ],
    [
        {
            icon: <TerrainIcon style={{ color: 'green' }} />,
            text: '1. Technology & Environment',
        },
        {
            icon: <PeopleIcon style={{ color: 'orange' }} />,
            text: '2. Organization of Societies',
        },
        {
            icon: <PlaceIcon style={{ color: 'red' }} />,
            text: '3. Regional Interactions',
        },
        {
            icon: <WorldIcon style={{ color: 'blue' }} />,
            text: '4. Global Interactions',
        },
        {
            icon: <GearsIcon style={{ color: 'grey' }} />,
            text: '5. Industrialization & Integration',
        },
        {
            icon: <ChangeIcon style={{ color: 'purple' }} />,
            text: '6. Accelerating Global Change',
        },
    ],
    [
        {
            icon: <AssignmentIcon style={{ color: 'lightBlue' }} />,
            text: 'AP Prep',
        },
        {
            icon: <ScoreIcon style={{ color: 'lightBlue' }} />,
            text: 'Social Studies UIL',
        },
        {
            icon: <EmailIcon style={{ color: 'lightBlue' }} />,
            text: 'Email',
        },
    ],
]

<<<<<<< HEAD
const sideList = (
    <div style={{ width: 350 }}>
        <List>
            <ListItem button>
                <ListItemIcon>
                    { null }
                </ListItemIcon>
            </ListItem>
            { 
                sideListItems.map(item => (
                    <ListItem button key={ item.text }>
                        <ListItemIcon>
                            { item.icon }
                        </ListItemIcon>
                        <ListItemText primary={ item.text } />
                    </ListItem>
                ))
            }
        </List>
    </div>
);


=======
>>>>>>> 68d2fedf1d5265c2d68a5440c105279ddf806474
export class SideDrawer extends PureComponent {
    render() {
        const { toggleDrawer, open } = this.props

        return (
            <div className="side-drawer">
                <Drawer open={open} onClose={toggleDrawer}>
                    <div className="side-list">
                        <div className="drawer-top">
                            <IconButton
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    color: 'hsl(0, 0%, 96%)',
                                }}
                                color="inherit"
                                aria-label="Menu"
                                onClick={toggleDrawer}
                            >
                                <CloseIcon />
                            </IconButton>
                            <h1 className="header-1">WHAP</h1>
                            <h3 className="subtitle">
                                Sections, Links, & Resources
                            </h3>
                        </div>
                        <List>
                            {sideListItems[0].map(item => (
                                <ListItem button key={item.text}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            ))}
                            <Divider />
                            {sideListItems[1].map(item => (
                                <ListItem button key={item.text}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            ))}
                            <Divider />
                            {sideListItems[2].map(item => (
                                <ListItem button key={item.text}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Drawer>
            </div>
        )
    }
}
