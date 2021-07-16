import { Card,Avatar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';
import { makeStyles } from '@material-ui/core/styles';
//colors
import { projectFirestore } from '../firebase/config';
import useRiceItems from '../hooks/useRiceItems';

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
      backgroundColor: 'grey'
   }
}));

const CardArchived = ({item,collection,setSnackBarDeleted,setSnackBarRestored,spec}) => {
   const classes = useStyles()
   const {riceItems} = useRiceItems('riceItems',item.id)

   const deleteItem = () => {
      window.confirm('Are you sure you want to delete this data permanently?') &&
      projectFirestore.collection(collection).doc(item.id).delete()
      .then(() => setSnackBarDeleted(true))
   }

   const deleteRiceItem = () => {
      window.confirm('Are you sure you want to delete this data permanently? All items from this list will also be deleted') &&
      projectFirestore.collection(collection).doc(item.id).delete()
      .then(() => {
         riceItems.forEach(item => {
            projectFirestore.collection('riceItems').doc(item.id).delete()
         })
      })
      .then(() => {
         setSnackBarDeleted(true)
      })
   }

   const restoreItem = () => {
      window.confirm('Are you sure you want to restore this data?') &&
      projectFirestore.collection(collection).doc(item.id).update({
         status: true
      }).then(() => setSnackBarRestored(true))
   }

   return ( 
      <Card className="card">
         {
            item.name ? 
               <Avatar className={classes.avatar}>
                  {item.name[0].toUpperCase()}
               </Avatar>
            :
            ''
         }
         <div className="right">
            <div className="details">
               {
                  item.name ? 
                     <p className="name">{item.name}</p>
                  :
                     <p className="date-archived">{item.date}</p>
               }
            </div>
            <div className="actions">
               <div>
                  <RestoreIcon onClick={restoreItem}/>
               </div>
               {
                  spec === true ?
                  <div>
                     <DeleteIcon onClick={deleteRiceItem}/>
                  </div>
                  :
                  <div>
                     <DeleteIcon onClick={deleteItem}/>
                  </div>
               }
            </div>
         </div>
      </Card>
   );
}
 
export default CardArchived;