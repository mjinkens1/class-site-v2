import React, { PureComponent } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import CloseIcon from '@material-ui/icons/Close'
import HomeIcon from '@material-ui/icons/Home'
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
import { contactEmail } from '../../constants'
import './styles.scss'

const sideListItems = [
    [
        {
            icon: <HomeIcon style={{ color: 'red' }} />,
            text: 'Home',
        },
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
            href: 'https://www.dallasisd.org/advancedacademicservices',
            target: '_blank',
        },
        {
            icon: <ScoreIcon style={{ color: 'lightBlue' }} />,
            text: 'Social Studies UIL',
            href:
                'https://drive.google.com/open?id=1IliNBgmX1ufIheV6-w1ywcIMEpbIGbya',
            target: '_blank',
        },
        {
            icon: <EmailIcon style={{ color: 'lightBlue' }} />,
            text: 'Email',
            href: `mailto:${contactEmail}`,
        },
    ],
]

class SideDrawerBase extends PureComponent {
    componentDidUpdate(prevProps) {
        const { location, toggleDrawer, open } = this.props

        if (prevProps.location.pathname !== location.pathname && open)
            toggleDrawer()
    }

    render() {
        const { toggleDrawer, open } = this.props

        return (
            <div className="side-drawer">
                <Drawer open={open} onClose={toggleDrawer}>
                    <div className="side-list">
                        <div className="drawer-top">
                            <IconButton
                                style={materialUIStyles.iconButton}
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
                                <Link
                                    key={item.text}
                                    to={`/${item.text.toLowerCase()}`}
                                >
                                    <ListItem button onClick={toggleDrawer}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItem>
                                </Link>
                            ))}
                            <Divider />
                            {sideListItems[1].map(item => (
                                <Link
                                    key={item.text}
                                    to={`/${item.text
                                        .toLowerCase()
                                        .replace(/[^a-z].\s/, '')}`}
                                >
                                    <ListItem button onClick={toggleDrawer}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItem>
                                </Link>
                            ))}
                            <Divider />
                            {sideListItems[2].map(item => (
                                <ListItem
                                    button
                                    key={item.text}
                                    onClick={toggleDrawer}
                                >
                                    <a
                                        href={item.href}
                                        target={item.target}
                                        className="side-drawer-anchor"
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </a>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Drawer>
            </div>
        )
    }
}

const materialUIStyles = {
    iconButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: 'hsl(0, 0%, 96%)',
    },
}

export const SideDrawer = withRouter(SideDrawerBase)
