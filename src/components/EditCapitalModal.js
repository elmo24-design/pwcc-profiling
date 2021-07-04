import { useState } from 'react';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { projectFirestore } from '../firebase/config';

const backdrop = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1
    }
}
const modal = {
    hidden: {
        y: "-100vh",
        opacity: 0
    },
    visible: {
        y: '150px',
        opacity: 1,
        transition: {
            delay: 0.2
        }
    }
}

const useStyles = makeStyles((theme) => ({
    field:{
        marginBottom: '10px'
    },
    form:{
        marginBottom: '10px'
    },
    btnCancel:{
        marginLeft: '10px'
    },
    actionDiv:{
        marginTop: '20px'
    },
 }));


const EditCapitalModal = ({doc,collection,setEditCapitalModal,setSnackBarUpdated}) => {
    const classes = useStyles()
    const [isPending, setIsPending] = useState(false)
    
    //State for updating
    const [subscribedShares, setSubscribedShares] = useState(doc.subscribedShares)
    const [paidUpShares, setPaidUpShares] = useState(doc.paidUpShares)

    //Submit function
    const handleSubmit = (e) => {
       e.preventDefault()
       setIsPending(true)
       projectFirestore.collection(collection).doc(doc.id).update({
          subscribedShares: subscribedShares,
          paidUpShares: paidUpShares
       }).then(() => {
          setIsPending(false)
          setEditCapitalModal(null)
          setSnackBarUpdated(true)
       }).catch(err => console.log(err))
    }


    const closeModal = (e) => {
        if(e.target.classList.contains('backdrop')){
           setEditCapitalModal(null)
        }
    }

    return ( 
        <motion.div className="backdrop" 
            onClick={closeModal}
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <motion.div className="modal modal-editShare" variants={modal}>
                <h1>Edit Shares...</h1>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField id="standard-basic" 
                        label="Number of Subscribed Shares" 
                        type="number"
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={subscribedShares}
                        required
                        onChange={(e) => setSubscribedShares(e.target.value)}
                    />
                    <TextField id="standard-basic" 
                        label="Number of Paid-up Shares" 
                        type="number"
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={paidUpShares}
                        required
                        onChange={(e) => setPaidUpShares(e.target.value)}
                    />
                    <div className={classes.actionDiv}>
                       {
                          isPending ?
                              <Button variant="contained" color="primary" disabled>
                                 Saving...Please Wait...
                              </Button>
                          :
                          <div>
                              <Button variant="contained" 
                                 color="primary" 
                                 type="submit"
                                 >
                                 Save
                              </Button>
                              <Button variant="contained" 
                                 className={classes.btnCancel}
                                 onClick={() => setEditCapitalModal(null)}
                              >Cancel</Button>
                          </div>
                       }
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
 
export default EditCapitalModal;