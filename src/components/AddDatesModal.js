import { useState } from 'react';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { projectFirestore, timestamp } from '../firebase/config';

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

 
const AddDatesModal = ({setAddDatesModal}) => {
    const classes = useStyles()
    const [isPending, setIsPending] = useState(false)
    const [date,setDate] = useState(null)
    
    const closeModal = (e) => {
        if(e.target.classList.contains('backdrop')){
            setAddDatesModal(false)
        }
    }

    //Submit function
    const handleSubmit = (e) => {
       e.preventDefault()
       setIsPending(true)
       projectFirestore.collection('dates').add({
          date: date,
          createdAt: timestamp()
       })
       .then(() => {
          setIsPending(false)
          setAddDatesModal(false)
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
            <motion.div className="modal" variants={modal}>
                <h1>Select a date</h1>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <TextField
                     id="date"
                     label="Select Date"
                     type="date"
                     fullWidth
                     value={date}
                     onChange={(e) => setDate(e.target.value)}
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
                                date !== null ?
                                <Button variant="contained" 
                                    color="primary" 
                                    type="submit"
                                    >
                                    Add
                                 </Button>
                                 :
                                 <Button variant="contained" 
                                    color="primary" 
                                    type="submit"
                                    disabled
                                    >
                                    Add
                                 </Button>
                             }
                              <Button variant="contained" 
                                 className={classes.btnCancel}
                                 onClick={() => setAddDatesModal(false)}
                              >Cancel</Button>
                          </div>
                       }
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
 
export default AddDatesModal;