import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
//hooks
import useMembers from '../hooks/useMembers';
//components
import AddMembersModal from '../components/AddMembersModal';
import EditMemberModal from '../components/EditMemberModal';
import EditIcon from '@material-ui/icons/Edit';
import { motion } from 'framer-motion';
import CardMembers from '../components/CardMembers';
//Snackbar Component
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
   icon:{
      backgroundColor: '#5D43FF',
      color: 'white',
      width: theme.spacing(6),
      height: theme.spacing(6),
      '&:hover':{
         backgroundColor: '#4325FB'
      }
   },
   avatar:{
      width: theme.spacing(6),
      height: theme.spacing(6),
   },
   nothing:{
      marginTop: '1rem'
   }
}));

const Members = ({snackBarArchived,setSnackBarArchived}) => {
   const classes = useStyles();
   const [addMembersModal,setAddMembersModal] = useState(false);
   const [member,setMember] = useState(null)
   const {members} = useMembers('members')

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

   //close snackbar archived coming from member info
   const handleCloseArchived = (event, reason) => {
      if (reason === 'clickaway') {
         setSnackBarArchived(false);
      }
  
      setSnackBarArchived(false);
   };

   return ( 
    <>   {/* member info snackbar */}
         <Snackbar
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={snackBarArchived}
            autoHideDuration={4000}
            onClose={handleCloseArchived}
         >
            <Alert onClose={handleCloseArchived} severity="success">
               Data has been Archived
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
               Data has been Updated
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
               New Member has been added
            </Alert>
         </Snackbar>
        {
            addMembersModal &&
            <AddMembersModal setAddMembersModal={setAddMembersModal} setSnackBarAdded={setSnackBarAdded}/>
        }
        {
           member &&
           <EditMemberModal member={member} setMember={setMember} setSnackBarUpdated={setSnackBarUpdated}/>
        }
        <div className="container-officers">
            <div className="heading">
                <div className="left">
                    <Fab className={classes.icon} aria-label="edit"
                    onClick={() => setAddMembersModal(true)}
                    >
                        <EditIcon />
                    </Fab>
                    <h1 className="member-title">Members</h1>
                </div>
                <div className="right">
                    <h1 className="right-h1">Total: <span>{members.length}</span> </h1>
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
               members.length !== 0 ?
                  <motion.div className="cards" layout>
                     {
                        members && members.map(member => (
                           <div key={member.id}>
                              {
                                 member.name.toLowerCase().indexOf(searchText) !== -1 ?
                                    <CardMembers member={member} setMember={setMember} 
                                    setSnackBarRemoved={setSnackBarRemoved}/>
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
 
export default Members;