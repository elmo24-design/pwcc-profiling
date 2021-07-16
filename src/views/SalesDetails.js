import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import useDate from "../hooks/useDate";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DataTableItems from '../components/DataTableItems';
import DataTableSales from '../components/DataTableSales';
import { Button } from '@material-ui/core';
import EditDatesModal from '../components/EditDatesModal';
import AddRiceItemModal from '../components/AddRiceItemModal';
import EditRiceItemModal from '../components/EditRiceItemModal';
import useRiceItems from '../hooks/useRiceItems';
import { useState } from 'react';
//Snackbar Component
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { projectFirestore } from '../firebase/config';
import { useEffect } from 'react';


function Alert(props) {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
   length: {
      marginTop: '15px'
   }
}));

const SalesDetails = ({setSnackBarArchived}) => {
   const classes = useStyles()
   const history = useHistory()
   const {id} = useParams()
   const {date} = useDate(id)
   const [editDatesModal,setEditDatesModal] = useState(null) 
   const [addItemModal,setAddItemModal] = useState(false)
   const [item,setEditItemModal] = useState(null)
   const [totalSales,setTotalSales] = useState(0)

   const [report,setReport] = useState(false)
  
   const {
      riceItems,
      v1Total,
      v2Total,
      v3Total,
      v4Total,
      v5Total,
      v6Total,
      v7Total,
      v8Total,
      v9Total,
      v10Total,
      v11Total,
      v12Total
   } = useRiceItems('riceItems',id)

   const compute = () => {
      let total = 
      parseInt(v1Total) +
      parseInt(v2Total) +
      parseInt(v3Total) +
      parseInt(v4Total) +
      parseInt(v5Total) +
      parseInt(v6Total) +
      parseInt(v7Total) +
      parseInt(v8Total) +
      parseInt(v9Total) +
      parseInt(v10Total) +
      parseInt(v11Total) +
      parseInt(v12Total)

      setTotalSales(total)
   }

   useEffect(() => {
      compute()
   }, [riceItems,
      v1Total,
      v2Total,
      v3Total,
      v4Total,
      v5Total,
      v6Total,
      v7Total,
      v8Total,
      v9Total,
      v10Total,
      v11Total,
      v12Total])

   //Snackbars
   const [snackBarUpdated,setSnackBarUpdated] = useState(false) //updated date state
   const [snackBarAdded,setSnackBarAdded] = useState(false) //added item state
   const [itemUpdated,setItemUpdated] = useState(false) //updated item state
   const [itemDeleted,setItemDeleted] = useState(false) //deleted item state
   const [totalSaleUpdated,setTotalSaleUpdated] = useState(false) //deleted item state


   const handleArchive = () => {
      window.confirm('Are you sure you want to archive this list?') && 
      projectFirestore.collection('dates').doc(id).update({
         status: false
      })
      .then(() => {
         history.push('/products/rice')
      })
      .then(() => {
         setSnackBarArchived(true)
      })
      .catch((err) => console.log(err))
   }

   const handleDeleteItem = (item) => {
      window.confirm('Are you sure you want to delete this item?') &&
      projectFirestore.collection('riceItems').doc(item.id).update({
         total: 0
      })
      .then(() => {
         projectFirestore.collection('riceItems').doc(item.id).delete()
      })
      .then(() => {
         setItemDeleted(true)
      })
   }

   const saveTotal = () => {
      window.confirm(`Save Total Sales PHP ${totalSales.toFixed(2)} to ${date.date}?`) &&
      projectFirestore.collection('dates').doc(id).update({
         totalSales: totalSales
      })
      .then(() => {
         setTotalSaleUpdated(true)
      })
   }
   
   //close snackbar item updated
   const handleItemUpdated = (event, reason) => {
      if (reason === 'clickaway') {
         setItemUpdated(false);
      }
  
      setItemUpdated(false);
   };

   //close snackbar item deleted
   const handleItemDeleted = (event, reason) => {
      if (reason === 'clickaway') {
         setItemDeleted(false);
      }
  
      setItemDeleted(false);
   };

   //close snackbar updated
   const handleCloseUpdated = (event, reason) => {
      if (reason === 'clickaway') {
         setSnackBarUpdated(false);
      }
  
      setSnackBarUpdated(false);
   };
    //close snackbar added item
    const handleCloseAdded = (event, reason) => {
      if (reason === 'clickaway') {
         setSnackBarAdded(false);
      }
  
      setSnackBarAdded(false);
   };
   
   //close snackbar for updated total sales
    const handleCloseUpdatedTotal = (event, reason) => {
      if (reason === 'clickaway') {
         setTotalSaleUpdated(false);
      }
  
      setTotalSaleUpdated(false);
   };
   return ( 
      <>
         {
            addItemModal &&
            <AddRiceItemModal 
               setAddItemModal={setAddItemModal} 
               id={id}
               setSnackBarAdded={setSnackBarAdded}
            />
         }
         {
            item && 
            <EditRiceItemModal 
               item={item}
               setEditItemModal={setEditItemModal}
               setItemUpdated={setItemUpdated}
            />
         }
         {
            editDatesModal && 
            <EditDatesModal 
               date={date}
               setEditDatesModal={setEditDatesModal}
               setSnackBarUpdated={setSnackBarUpdated}
            />  
         }
         <Snackbar
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={snackBarUpdated}
            autoHideDuration={3000}
            onClose={handleCloseUpdated}
         >
            <Alert onClose={handleCloseUpdated} severity="success">
               Date has been updated
            </Alert>
         </Snackbar>
         <Snackbar
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={itemUpdated}
            autoHideDuration={3000}
            onClose={handleItemUpdated}
         >
            <Alert onClose={handleItemUpdated} severity="success">
               Item has been updated
            </Alert>
         </Snackbar>
         <Snackbar
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={itemDeleted}
            autoHideDuration={3000}
            onClose={handleItemDeleted}
         >
            <Alert onClose={handleItemDeleted} severity="success">
               Item has been Deleted
            </Alert>
         </Snackbar>
         <Snackbar
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={snackBarAdded}
            autoHideDuration={3000}
            onClose={handleCloseAdded}
         >
            <Alert onClose={handleCloseAdded} severity="success">
               Item has been added
            </Alert>
         </Snackbar>
         <Snackbar
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={totalSaleUpdated}
            autoHideDuration={4000}
            onClose={handleCloseUpdatedTotal}
         >
            <Alert onClose={handleCloseUpdatedTotal} severity="success">
               {`Total Sales PHP ${totalSales} has been saved to ${date.date}`}
            </Alert>
         </Snackbar>
         <div className="sales-details">
            <KeyboardBackspaceIcon 
               className={classes.back}
               color="primary"
               onClick={() => history.goBack()}
            />
            <div className="sales-details-heading">
               <h1>{date.date}</h1>
               <div className="sales-icons">
                  <div onClick={() => setEditDatesModal(date)}>
                     <EditIcon className={classes.icon}/>
                  </div>
                  <div onClick={handleArchive}>
                     <DeleteIcon className={classes.icon}/>
                  </div>
               </div>
            </div>
            <div className="items-btn">
               <div>
                  <Button
                     variant="contained"
                     className={classes.button}
                     color="primary"
                     startIcon={<AddCircleIcon />}
                     onClick={() => setAddItemModal(true)}
                     >
                     Add Item
                  </Button>
               </div>
               {
                  report ? 
                  <div>
                     <Button
                        variant="outlined"
                        className={classes.button}
                        color="secondary"
                        onClick={() => setReport(false)}
                        >
                        Hide Report
                     </Button>
                  </div>
                  :
                  <div>
                     <Button
                        variant="outlined"
                        className={classes.button}
                        color="primary"
                        onClick={() => setReport(true)}
                        >
                        Show Report
                     </Button>
                  </div>
               }
            </div>
            <div className="table">
               <DataTableItems 
                  id={id} 
                  setEditItemModal={setEditItemModal}
                  handleDeleteItem={handleDeleteItem}
                  riceItems={riceItems}
               />
               <div className={classes.length}>
                  Items: <span>{riceItems.length}</span>
               </div>
            </div>
            {
               report &&
                  <div className="sales-report">
                     <h1>Sales Report: </h1>
                     <div className="sales-report-table">
                        <DataTableSales 
                           riceItems={riceItems} 
                           v1Total={v1Total} 
                           v2Total={v2Total}
                           v3Total={v3Total}
                           v4Total={v4Total}
                           v5Total={v5Total}
                           v6Total={v6Total}
                           v7Total={v7Total}
                           v8Total={v8Total}
                           v9Total={v9Total}
                           v10Total={v10Total}
                           v11Total={v11Total}
                           v12Total={v12Total}
                        />
                     </div>
                     <div className="total-sales">
                        <p>Total Sales: <span>PHP {totalSales.toFixed(2)}</span></p>
                        <div>
                        <Button
                           variant="outlined"
                           color="primary"
                           size="small"
                           startIcon={<SaveIcon />}
                           onClick={saveTotal}
                           >
                           Save
                           </Button>
                        </div>
                     </div>
                  </div>
            }
         </div>
      </>
   );
}
 
export default SalesDetails;