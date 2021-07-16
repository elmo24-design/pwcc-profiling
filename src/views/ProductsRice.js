import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Card, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CreateIcon from '@material-ui/icons/Create';
import Fab from '@material-ui/core/Fab';
import AddDatesModal from '../components/AddDatesModal';
import useDates from '../hooks/useDates';
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { motion } from 'framer-motion';
//Snackbar Component
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

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
   },
   icon:{
      width: theme.spacing(6),
      height: theme.spacing(6)
   },
}));

const ProductsRice = ({snackBarArchived,setSnackBarArchived}) => {
   const classes= useStyles()
   const history = useHistory()
   const {dates} = useDates('dates')

   const [addDatesModal,setAddDatesModal] = useState(false)

   //close snackbar archived coming from officer info
   const handleCloseArchived = (event, reason) => {
      if (reason === 'clickaway') {
         setSnackBarArchived(false);
      }
  
      setSnackBarArchived(false);
   };

   return (
      <>
         {
            addDatesModal && <AddDatesModal setAddDatesModal={setAddDatesModal}/>
         }
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
               List has been archived
            </Alert>
         </Snackbar>
         <div className="products-rice">
            <KeyboardBackspaceIcon 
               className={classes.back}
               color="primary"
               onClick={() => history.goBack()}
            />
            <h1>Sales in Rice</h1>
            <Divider />
            <div className="rice-dates-grid">
               {
                  dates.length !== 0 ?
                  <>
                     {
                        dates && dates.map(date => (
                           <motion.div key={date.id} layout>
                              <Link to={`rice/${date.id}`}>
                                 <div className="rice-dates-card-outer">
                                    <Card>
                                       <div className="rice-dates-card">
                                          <h3>{ format(parseISO(date.date), "do MMMM yyyy") }</h3>
                                          <p>Total Sales:<span>PHP {date.totalSales.toFixed(2)}</span></p> 
                                       </div>
                                    </Card>
                                 </div>
                              </Link>  
                           </motion.div>
                        ))
                     }
                  </>
                  :
                  <div>
                     Nothing to show here yet...
                  </div>
               }
            </div>
            <div className="add-dates-icon">
               <Fab className={classes.icon}
                  color="primary"
                  aria-label="edit"
                  onClick={() => setAddDatesModal(true)}
               >
                  <CreateIcon />
               </Fab>
            </div>
         </div>
      </> 
   );
}
 
export default ProductsRice;