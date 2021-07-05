import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useMemberInfo from "../hooks/useMemberInfo";
import { makeStyles } from '@material-ui/core/styles';
import EditMemberModal from '../components/EditMemberModal';
import EditCapitalModal from "../components/EditCapitalModal";
//Tab components
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
//Button
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
//Snackbar Component
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { projectFirestore } from "../firebase/config";

function Alert(props) {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
   button: {
     margin: theme.spacing(0.7),
   },
   back:{
      fontSize: '2rem',
      marginBottom: '1rem',
      cursor: 'pointer'
   }
 }));


const MemberInfo = ({setSnackBarArchived}) => {
   const classes = useStyles();
   const history = useHistory()
   
   const {id} = useParams()
   const {member} = useMemberInfo(id)

   const [memberBoolean,setMember] = useState(null)
   const [editCapitalModal,setEditCapitalModal] = useState(null)

   let [subscribedSharesAmount, setSubscribedSharesAmount] = useState(0)
   let [paidUpSharesAmount, setPaidUpSharesAmount] = useState(0)

   useEffect(() => {
      let subscribedSharesAmount = parseInt(member.subscribedShares) * 100 
      let paidUpSharesAmount = parseInt(member.paidUpShares) * 100

      let total1 = (Math.round(subscribedSharesAmount * 100) / 100).toFixed(2)
      setSubscribedSharesAmount(total1)

      let total2 = (Math.round(paidUpSharesAmount * 100) / 100).toFixed(2)
      setPaidUpSharesAmount(total2)

   }, [member])

   const archiveData = () => {
      window.confirm(`Are you sure you want to archive ${member.name}'s data?`) &&
      projectFirestore.collection('members').doc(id).update({
         status: false
      })
      .then(() => setSnackBarArchived(true))
      .then(() => history.push('/members'))
   }

   //Snackbar state
   const [snackBarUpdated,setSnackBarUpdated] = useState(false) //updated state

   //close snackbar updated
   const handleCloseUpdated = (event, reason) => {
      if (reason === 'clickaway') {
         setSnackBarUpdated(false);
      }
  
      setSnackBarUpdated(false);
   };

   //Tabs
   const [value,setValue] = useState('1')

   const handleChange = (event, newValue) => {
      setValue(newValue);
    };

   return ( 
      <div className="info-div">
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
               {`${member.name}'s data has been updated`}
            </Alert>
         </Snackbar>
         {
           memberBoolean &&
           <EditMemberModal 
               member={member} 
               setMember={setMember} 
               setSnackBarUpdated={setSnackBarUpdated}/>
         }
         {
           editCapitalModal && 
           <EditCapitalModal 
               doc={member} 
               collection="members" 
               setEditCapitalModal={setEditCapitalModal}
               setSnackBarUpdated={setSnackBarUpdated}
           />
         }
         <KeyboardBackspaceIcon 
            className={classes.back}
            color="primary"
            onClick={() => history.goBack()}
         />
         <TabContext value={value}>
            <AppBar position="static" color="default">
               <TabList onChange={handleChange} aria-label="simple tabs example"
                indicatorColor="primary"
                textColor="primary"
               >
                  <Tab label="Personal Info" value="1" />
                  <Tab label="Shared Capital" value="2" />
               </TabList>
            </AppBar>
            <TabPanel value="1">
               <div className="panel">
                  <div className="actions">
                     <Button
                        variant="contained"
                        className={classes.button}
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() => setMember(member)}
                        >
                        Edit
                     </Button>
                     <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        onClick={archiveData}
                        >
                        Archive
                     </Button>
                  </div>
                  <div className="info">
                     <div className="info-group">
                        <h3>Name: <span className="details">{member.name}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Civil Status: <span className="details">{member.civilStatus}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Highest Educational Attainment: <span className="details">
                           {member.educAttainment}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Age: <span className="details">{member.age}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Birth Place: <span className="details">{member.birthPlace}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Date of Birth: <span className="details">{member.birthDate}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Present Address: <span className="details">{member.presentAdd}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Occupation: <span className="details">{member.occupation}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Contact Number: <span className="details">{member.contactNum}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Salary (Month) Php: <span className="details">{member.salary}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Program/Region: <span className="details">{member.region}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Position: <span className="details">{member.position}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Office Address: <span className="details">{member.officeAdd}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Name of Father: <span className="details">{member.father}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Name of Mother: <span className="details">{member.mother}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Name of Spouse (if married): <span className="details">{member.spouse}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Occupation (of Spouse): <span className="details">{member.spouseOccupation}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Name/Age of Children: 
                           <ol className="details">
                              {
                                 member.children && member.children.map(item => (
                                    <li key={item}>
                                       <p>{item}</p>
                                    </li>
                                 ))
                              }       
                            </ol> 
                        </h3>
                     </div>
                     <div className="info-group">
                        <h3 className="beneficiaryDiv">Beneficiary/ies: 
                           <ol className="details">
                              {
                                 member.beneficiaries && member.beneficiaries.map(item => (
                                    <li key={item}>
                                       <p>{item}</p>
                                    </li>
                                 ))
                              }       
                            </ol> 
                        </h3>
                     </div>
                  </div>
               </div>
            </TabPanel>
            <TabPanel value="2">
               <div className="panel">
                  <div className="actions">
                     <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<EditIcon />}
                        onClick={() => setEditCapitalModal(member)}
                        >
                        Edit
                     </Button>
                  </div>
                  <div className="info">
                     <div className="info-group">
                        <h3>No. of Subscribed Shares: 
                           <span className="details">{member.subscribedShares}</span>
                        </h3>
                     </div>
                     <div className="info-group">
                        <h3>Amount of Subscribed Shares: 
                           <span className="details">
                              { subscribedSharesAmount }
                           </span>
                        </h3>
                     </div>
                     <div className="info-group">
                        <h3>No. of Paid-up Shares: 
                           <span className="details">{member.paidUpShares}</span>
                        </h3>
                     </div>
                     <div className="info-group">
                        <h3>Amount of Paid-up Shares:
                            <span className="details">
                              { paidUpSharesAmount }
                            </span>
                        </h3>
                     </div>
                  </div>
               </div>
            </TabPanel>
         </TabContext>
      </div>   
   );
}
 
export default MemberInfo;