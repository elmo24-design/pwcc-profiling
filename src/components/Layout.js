import React, { useState } from 'react'
import { makeStyles, useTheme } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory, useLocation } from "react-router";
import { format } from 'date-fns' ;
import Hidden from '@material-ui/core/Hidden';
import { projectAuth } from '../firebase/config';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ArchiveIcon from '@material-ui/icons/Archive';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import logo from '../images/pwcc 3.png';

const drawerWidth = 250

const useStyles = makeStyles((theme) => {
   return {
      page:{
         // background: '#f9f9f9',
         width: '100%',
         padding: theme.spacing(3)
      },
      drawer: {
         [theme.breakpoints.up('md')]: {
           width: drawerWidth,
           flexShrink: 0,
         },
         zIndex: '5',
      },
      drawerPaper: {
         width: drawerWidth
      },
      root: {
         display: 'flex',
      },
      listGroup:{
         marginTop: '1rem'
      },
      active: {
         background: 'rgb(229, 229, 229)',
         padding: '0.7rem 2rem',
      },
      list:{
         padding: '0.7rem 2rem',
      },
      iconSide:{
         color: '#5D43FF',
      },
      title: {
         padding: theme.spacing(2)
      },
      appbar:{
         [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
          },
          zIndex: '5',
          backgroundColor: '#5D43FF'
      },
      text: {
         fontSize: '3rem'
      },
      toolbar: theme.mixins.toolbar,
      date: {
         flexGrow: 1
      },
      menuButton: {
         marginRight: theme.spacing(2),
         [theme.breakpoints.up('md')]: {
            display: 'none',
         },
      },
      logout: {
         marginLeft: '1rem'
      },
      avatar: {
         marginLeft: theme.spacing(2)
      },
      btn:{
         color: 'white',
         marginRight: '-10px'
      },
      icon:{
         fontSize: '19px',
         marginRight: '5px',
         marginBottom: '2.1px'
      }
   }
})


const Layout = ({children}) => {
   const classes = useStyles()
   const theme = useTheme()
   const history = useHistory()
   const location = useLocation()

   const [mobileOpen, setMobileOpen] = useState(false);

   const signOut = async() => {
      await projectAuth.signOut()

      await history.push('/')
   }

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   const menuItems = [
      {
         text: 'Dashboard',
         icon: <DashboardIcon/>,
         path: '/dashboard'
      },
      {
         text: 'Products',
         icon: <FormatListNumberedIcon/>,
         path: '/products'
      },
      {
         text: 'Officers',
         icon: <SupervisedUserCircleIcon/>,
         path: '/officers'
      },
      {
         text: 'Members',
         icon: <PeopleIcon/>,
         path: '/members'
      },
      {
         text: 'Archive',
         icon: <ArchiveIcon/>,
         path: '/archive'
      }
   ]

   const drawer = (
      <div>
         <div>
            <img src={logo} alt="logo" className="logo-header" />
         </div>
         <Divider />
         {/* list links */}
         <List className={classes.listGroup}>
            {menuItems.map(item => (
               <ListItem 
                  button 
                  key={item.text}
                  onClick={() => history.push(item.path)}
                  className={location.pathname === item.path ? classes.active : classes.list}
                  >
                  <ListItemIcon className={classes.iconSide}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} className={classes.text}></ListItemText>
               </ListItem>
            ))}
         </List>
      </div>
   )

   return ( 
      <div className={classes.root}>
         {/* app bar  */}
         <AppBar 
            className={classes.appbar}
            elevation={1}
            >
            <Toolbar>
               <IconButton 
               color="inherit"
               aria-label="open drawer"
               edge="start"
               onClick={handleDrawerToggle}
               className={classes.menuButton}
               >
                  <MenuIcon />
               </IconButton>
               <Typography className={classes.date}>
                 Today is { format(new Date(), 'do MMMM Y') }
               </Typography>
               <Button onClick={signOut} className={classes.btn}>
                  <ExitToAppIcon className={classes.icon}/>
                  Sign Out
               </Button>
            </Toolbar>
         </AppBar>
         {/* side drawer */}
         <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden mdUp implementation="css">
               <Drawer
                  variant="temporary"
                  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                  paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                     keepMounted: true, // Better open performance on mobile.
                  }}
               >
                 {drawer}
               </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
               <Drawer
                  classes={{
                     paper: classes.drawerPaper,
                  }}
                  variant="permanent"
                  open
               >
                  {drawer}
               </Drawer>
            </Hidden>
         </nav>
         <main className={classes.page}>
            <div className={classes.toolbar}></div>
            {children}
         </main>
      </div>
   );
}
 
export default Layout;