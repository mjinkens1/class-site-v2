import React, { PureComponent } from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const sideListItems = [
    {
        icon: null,
        text: 'Syllabus'
    },
    {
        icon: null,
        text: '1. Technology & Environment'
    },
    {
        icon: null,
        text: '2. Organization of Societies'
    },
    {
        icon: null,
        text: '3. Regional Interactions'
    },
    {
        icon: null,
        text: '4. Global Interactions'
    },
    {
        icon: null,
        text: '5. Industrialization & Integration'
    },
    {
        icon: null,
        text: '6. Accelerating Global Change'
    },
    {
        icon: null,
        text: 'AP Prep'
    },
    {
        icon: null,
        text: 'Social Studies UIL'
    },
    {
        icon: null,
        text: 'Email'
    },
    
]

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


export class SideDrawer extends PureComponent {


    render() {
        const { toggleDrawer, open } = this.props;

        return(
            <Drawer open={ open } onClose={ toggleDrawer }>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={ toggleDrawer }
                    onKeyDown={ toggleDrawer }
                >
                    { sideList }
                </div>
          </Drawer>
        )
    }
}