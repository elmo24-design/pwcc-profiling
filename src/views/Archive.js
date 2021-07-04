import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//hooks
import useArchivedOfficers from '../hooks/useArchivedOfficers';
import useArchivedMembers from '../hooks/useArchivedMembers';
//components
import { motion } from 'framer-motion';
import CardArchived from '../components/CardArchived';
//Snackbar Component
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
   avatar:{
      width: theme.spacing(6),
      height: theme.spacing(6),
   },
   nothing:{
      marginTop: '1rem'
   }
}));

const Archive = () => {
   const classes = useStyles();
   const {archivedOfficers} = useArchivedOfficers('officers');
   const {archivedMembers} = useArchivedMembers('members');

   //snackbars
   const [snackBarDeleted,setSnackBarDeleted] = useState(false) //removed state
   const [snackBarRestored,setSnackBarRestored] = useState(false) //restored state

   //close snackbar added
   const handleCloseDeleted = (event, reason) => {
      if (reason === 'clickaway') {
         setSnackBarDeleted(false);
      }
  
      setSnackBarDeleted(false);
   };

   //close snackbar restored
   const handleCloseRestored = (event, reason) => {
      if (reason === 'clickaway') {
         setSnackBarRestored(false);
      }
  
      setSnackBarRestored(false);
   };
 
   return ( 
    <> 
         <Snackbar
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={snackBarRestored}
            autoHideDuration={4000}
            onClose={handleCloseRestored}
         >
            <Alert onClose={handleCloseRestored} severity="success">
               Data has been Restored
            </Alert>
         </Snackbar>

         <Snackbar
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={snackBarDeleted}
            autoHideDuration={4000}
            onClose={handleCloseDeleted}
         >
            <Alert onClose={handleCloseDeleted} severity="success">
               Data has been deleted
            </Alert>
         </Snackbar>

        <div className="container-officers">
            <div className="heading">
                <div className="left">
                    <h1 className="archive-title">Archives</h1>
                </div>
            </div>
            <div className="archivedOfficersDiv">
               <h3 className="archived-title">Officers</h3>
               {
                  archivedOfficers.length !== 0 ?
                     <motion.div className="cards" layout>
                        {
                           archivedOfficers && archivedOfficers.map(item => (
                              <div key={item.id}>
                                 <CardArchived 
                                 item={item}  
                                 setSnackBarDeleted={setSnackBarDeleted}
                                 setSnackBarRestored={setSnackBarRestored}
                                 collection='officers'
                                 />
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
            <div className="archivedMembersDiv">
               <h3 className="archived-title">Members</h3>
               {
                  archivedMembers.length !== 0 ?
                     <motion.div className="cards" layout>
                        {
                           archivedMembers && archivedMembers.map(item => (
                              <div key={item.id}>
                                 <CardArchived 
                                 item={item}  
                                 setSnackBarDeleted={setSnackBarDeleted}
                                 setSnackBarRestored={setSnackBarRestored}
                                 collection='members'
                                 />
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
        </div>
    </>
   );
}
 
export default Archive;