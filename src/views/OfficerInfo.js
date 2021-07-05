import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useOfficerInfo from "../hooks/useOfficerInfo";
import { makeStyles } from '@material-ui/core/styles';
import EditOfficerModal from '../components/EditOfficerModal';
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


const OfficerInfo = ({setSnackBarArchived}) => {
   const classes = useStyles();
   const history = useHistory()
   
   const {id} = useParams()
   const {officer} = useOfficerInfo(id)

   const [officerBoolean,setOfficer] = useState(null)
   const [editCapitalModal,setEditCapitalModal] = useState(null)

   let [subscribedSharesAmount, setSubscribedSharesAmount] = useState(0)
   let [paidUpSharesAmount, setPaidUpSharesAmount] = useState(0)

   useEffect(() => {
      let subscribedSharesAmount = parseInt(officer.subscribedShares) * 100 
      let paidUpSharesAmount = parseInt(officer.paidUpShares) * 100

      let total1 = (Math.round(subscribedSharesAmount * 100) / 100).toFixed(2)
      setSubscribedSharesAmount(total1)

      let total2 = (Math.round(paidUpSharesAmount * 100) / 100).toFixed(2)
      setPaidUpSharesAmount(total2)

   }, [officer])

   const archiveData = () => {
      window.confirm(`Are you sure you want to archive ${officer.name}'s data?`) &&
      projectFirestore.collection('officers').doc(id).update({
         status: false
      })
      .then(() => setSnackBarArchived(true))
      .then(() => history.push('/officers'))
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
               {`${officer.name}'s data has been updated`}
            </Alert>
         </Snackbar>
         {
           officerBoolean &&
           <EditOfficerModal 
               officer={officer} 
               setOfficer={setOfficer} 
               setSnackBarUpdated={setSnackBarUpdated}/>
         }
         {
           editCapitalModal && 
           <EditCapitalModal 
               doc={officer} 
               collection="officers" 
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
                        onClick={() => setOfficer(officer)}
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
                        <h3>Name: <span className="details">{officer.name}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Civil Status: <span className="details">{officer.civilStatus}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Highest Educational Attainment: <span className="details">{officer.educAttainment}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Age: <span className="details">{officer.age}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Birth Place: <span className="details">{officer.birthPlace}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Date of Birth: <span className="details">{officer.birthDate}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Present Address: <span className="details">{officer.presentAdd}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Occupation: <span className="details">{officer.occupation}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Salary (Month) Php: <span className="details">{officer.salary}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Program/Region: <span className="details">{officer.region}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Position: <span className="details">{officer.position}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Office Address: <span className="details">{officer.officeAdd}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Name of Father: <span className="details">{officer.father}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Name of Mother: <span className="details">{officer.mother}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Name of Spouse (if married): <span className="details">{officer.spouse}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Occupation (of Spouse): <span className="details">{officer.spouseOccupation}</span></h3>
                     </div>
                     <div className="info-group">
                        <h3>Name/Age of Children: 
                           <ol className="details">
                              {
                                 officer.children && officer.children.map(item => (
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
                                 officer.beneficiaries && officer.beneficiaries.map(item => (
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
                        onClick={() => setEditCapitalModal(officer)}
                        >
                        Edit
                     </Button>
                  </div>
                  <div className="info">
                     <div className="info-group">
                        <h3>No. of Subscribed Shares: 
                           <span className="details">{officer.subscribedShares}</span>
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
                           <span className="details">{officer.paidUpShares}</span>
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
 
export default OfficerInfo;