import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
//hooks
import useOfficers from '../hooks/useOfficers';
//components
import AddModal from '../components/AddModal';
import EditOfficerModal from '../components/EditOfficerModal';
import EditIcon from '@material-ui/icons/Edit';
import { motion } from 'framer-motion';
import Cards from '../components/Cards';
//Snackbar Component
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
   icon:{
      backgroundColor: '#FF00A8',
      color: 'white',
      width: theme.spacing(6),
      height: theme.spacing(6)
   },
   avatar:{
      width: theme.spacing(6),
      height: theme.spacing(6),
   },
   nothing:{
      marginTop: '1rem'
   }
}));

const Officers = ({snackBarArchived,setSnackBarArchived,snackBarMovedToOfficer,setSnackBarMovedToOfficer}) => {
   const classes = useStyles();
   const [addModal,setAddModal] = useState(false);
   const [officer,setOfficer] = useState(null)
   const {officers} = useOfficers('officers')

   const [searchText, setSearchText] = useState('')

   //snackbars
   const [snackBarAdded,setSnackBarAdded] = useState(false) //added state
   const [snackBarUpdated,setSnackBarUpdated] = useState(false) //updated state
   const [snackBarRemoved,setSnackBarRemoved] = useState(false) //removed state

   //close snackbar added
   const handleCloseAdded = (event, reason) => {
      if (reason === 'clickaway') {
         setSnackBarAdded(false);
      }
  
      setSnackBarAdded(false);
   };
   //close snackbar updated
   const handleCloseUpdated = (event, reason) => {
      if (reason === 'clickaway') {
         setSnackBarUpdated(false);
      }
  
      setSnackBarUpdated(false);
   };
   //close snackbar removed
   const handleCloseRemoved = (event, reason) => {
      if (reason === 'clickaway') {
         setSnackBarRemoved(false);
      }
  
      setSnackBarRemoved(false);
   };
   //close snackbar moved
   const handleCloseMoved = (event, reason) => {
      if (reason === 'clickaway') {
         setSnackBarMovedToOfficer(false);
      }

      setSnackBarMovedToOfficer(false);
   };
   
   
   //close snackbar archived coming from officer info
   const handleCloseArchived = (event, reason) => {
      if (reason === 'clickaway') {
         setSnackBarArchived(false);
      }
  
      setSnackBarArchived(false);
   };

   return ( 
    <> 
         {/* officer info snackbar */}
         <Snackbar
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={snackBarArchived}
            autoHideDuration={3000}
            onClose={handleCloseArchived}
         >
            <Alert onClose={handleCloseArchived} severity="success">
               Data has been Archived
            </Alert>
         </Snackbar>
         <Snackbar
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={snackBarMovedToOfficer}
            autoHideDuration={3000}
            onClose={handleCloseMoved}
         >
            <Alert onClose={handleCloseMoved} severity="success">
               Data has been moved to members' list
            </Alert>
         </Snackbar>
         {/* end */}
         <Snackbar
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={snackBarRemoved}
            autoHideDuration={4000}
            onClose={handleCloseRemoved}
         >
            <Alert onClose={handleCloseRemoved} severity="success">
               Data has been archived
            </Alert>
         </Snackbar>
         <Snackbar
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={snackBarUpdated}
            autoHideDuration={4000}
            onClose={handleCloseUpdated}
         >
            <Alert onClose={handleCloseUpdated} severity="success">
               Data has been updated
            </Alert>
         </Snackbar>
         <Snackbar
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={snackBarAdded}
            autoHideDuration={4000}
            onClose={handleCloseAdded}
         >
            <Alert onClose={handleCloseAdded} severity="success">
               Data has been added
            </Alert>
         </Snackbar>
        {
            addModal &&
            <AddModal setAddModal={setAddModal} setSnackBarAdded={setSnackBarAdded}/>
        }
        {
           officer &&
           <EditOfficerModal officer={officer} setOfficer={setOfficer} setSnackBarUpdated={setSnackBarUpdated}/>
        }
        <div className="container-officers">
            <div className="heading">
                <div className="left">
                    <Fab className={classes.icon} color="secondary" aria-label="edit"
                    onClick={() => setAddModal(true)}
                    >
                        <EditIcon />
                    </Fab>
                    <h1>Officers</h1>
                </div>
                <div className="right">
                    <h1>Total: <span>{officers.length}</span></h1>
                </div>
            </div>
            <div className="search-field">
                <TextField id="standard-basic" label="Search here..." fullWidth 
                autoComplete="off"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value.toLowerCase())}
                />
            </div>
            {
               officers.length !== 0 ?
                  <motion.div className="cards" layout>
                     {
                        officers && officers.map(officer => (
                           <div key={officer.id}>
                              {
                                 officer.name.toLowerCase().indexOf(searchText) !== -1 ?
                                    <Cards officer={officer} setOfficer={setOfficer} setSnackBarRemoved={setSnackBarRemoved}/>
                                 :
                                 ''
                              }
                           </div>
                        ))
                     }
                  </motion.div>
                  :
                  <div className={classes.nothing}>
                     Nothing to show here yet...
                  </div>
            }
          
        </div>
    </>
   );
}
 
export default Officers;