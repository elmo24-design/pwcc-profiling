import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import useDate from "../hooks/useDate";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DataTable from '../components/DataTable';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
   back:{
      fontSize: '2rem',
      marginBottom: '1rem',
      cursor: 'pointer'
   },
   icon:{
      color: 'grey',
      cursor: 'pointer'
   },
}));

const SalesDetails = () => {
   const classes = useStyles()
   const history = useHistory()
   const {id} = useParams()
   const {date} = useDate(id)

   return ( 
      <div className="sales-details">
         <KeyboardBackspaceIcon 
            className={classes.back}
            color="primary"
            onClick={() => history.goBack()}
         />
         <div className="sales-details-heading">
            <h1>{date.date}</h1>
            <div className="sales-icons">
               <div><EditIcon className={classes.icon}/></div>
               <div><DeleteIcon className={classes.icon}/></div>
            </div>
         </div>
         <div className="add-item-btn">
             <Button
               variant="contained"
               className={classes.button}
               color="primary"
               startIcon={<AddCircleIcon />}
               >
               Add Item
            </Button>
         </div>
         <div className="table">
            <DataTable />
         </div>
      </div>
   );
}
 
export default SalesDetails;