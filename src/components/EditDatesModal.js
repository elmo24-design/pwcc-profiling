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

 
const EditDatesModal = ({date,setEditDatesModal,setSnackBarUpdated}) => {
    const classes = useStyles()
    const [isPending, setIsPending] = useState(false)
    const [dateValue,setDateValue] = useState(date.date)
    
    const closeModal = (e) => {
        if(e.target.classList.contains('backdrop')){
            setEditDatesModal(null)
        }
    }

    //Submit function
    const handleSubmit = (e) => {
       e.preventDefault()
       setIsPending(true)
       projectFirestore.collection('dates').doc(date.id).update({
          date: dateValue
       })
       .then(() => {
          setIsPending(false)
          setEditDatesModal(null)
          setSnackBarUpdated(true)
       })
       .catch(err => console.log(err))
    }

    return ( 
        <motion.div className="backdrop" 
            onClick={closeModal}
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <motion.div className="modal modal-rice" variants={modal}>
                <h1>Edit date</h1>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <TextField
                     id="date"
                     label="Select Date"
                     type="date"
                     fullWidth
                     value={dateValue}
                     onChange={(e) => setDateValue(e.target.value)}
                     className={classes.textField}
                     InputLabelProps={{
                        shrink: true,
                     }}
                  />
                    <div className={classes.actionDiv}>
                       {
                          isPending ?
                              <Button variant="contained" color="primary" disabled>
                                 Saving...Please Wait...
                              </Button>
                          :
                          <div>
                             {
                                dateValue !== null ?
                                <Button variant="contained" 
                                    color="primary" 
                                    type="submit"
                                    >
                                    Save
                                 </Button>
                                 :
                                 <Button variant="contained" 
                                    color="primary" 
                                    type="submit"
                                    disabled
                                    >
                                    Save
                                 </Button>
                             }
                              <Button variant="contained" 
                                 className={classes.btnCancel}
                                 onClick={() => setEditDatesModal(null)}
                              >Cancel</Button>
                          </div>
                       }
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
 
export default EditDatesModal;