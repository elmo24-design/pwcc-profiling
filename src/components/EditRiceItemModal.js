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

  //Civil Status Values
  const items = [
   {
     value: '',
     label: "",
   },
   {
     value: 'Unli Rice',
     label: 'Unli Rice',
   },
   {
     value: 'Chezka',
     label: 'Chezka',
   },
   {
     value: 'Butter Cup',
     label: 'Butter Cup',
   },
   {
     value: 'Gandang Dinurado',
     label: 'Gandang Dinurado',
   },
   {
     value: '24 Hours',
     label: '24 Hours',
   },
   {
     value: 'Gandang Buhay',
     label: 'Gandang Buhay',
   },
   {
     value: 'Star Gazer',
     label: 'Star Gazer',
   },
   {
     value: 'Sinandomeng',
     label: 'Sinandomeng',
   },
   {
     value: 'Gold Cup',
     label: 'Gold Cup',
   },
   {
     value: 'Malagkit',
     label: 'Malagkit',
   },
   {
      value: 'Thailand',
      label: 'Thailand',
   },
   {
      value: 'Smart Choice',
      label: 'Smart Choice',
   },
]
 
const EditRiceItemModal = ({item,setEditItemModal,setItemUpdated}) => {
    const classes = useStyles()
    const [isPending, setIsPending] = useState(false)

    const [quantity,setQuantity] = useState(item.quantity)
    const [variety,setVariety] = useState(item.variety)
    let [amtPerKg,setAmtPerKg] = useState(item.amtPerKg)
    const [total,setTotal] = useState(item.total)


    const handleChange = (event) => {
      setVariety(event.target.value);
      setTotal(0)
      setQuantity(0)
      if(event.target.value === 'Unli Rice'){
         setAmtPerKg(40)
      }
      if(event.target.value === 'Chezka'){
         setAmtPerKg(44)
      }
      if(event.target.value === 'Butter Cup'){
         setAmtPerKg(46)
      }
      if(event.target.value === 'Gandang Dinurado'){
         setAmtPerKg(43)
      }
      if(event.target.value === '24 Hours'){
         setAmtPerKg(41)
      }
      if(event.target.value === 'Gandang Buhay'){
         setAmtPerKg(45)
      }
      if(event.target.value === 'Star Gazer'){
         setAmtPerKg(44)
      }
      if(event.target.value === 'Sinandomeng'){
         setAmtPerKg(47)
      }
      if(event.target.value === 'Gold Cup'){
         setAmtPerKg(42)
      }
      if(event.target.value === 'Malagkit'){
         setAmtPerKg(60)
      }
      if(event.target.value === 'Thailand'){
         setAmtPerKg(42)
      }
      if(event.target.value === 'Don Frank'){
         setAmtPerKg(47)
      }
      if(event.target.value === 'Smart Choice'){
         setAmtPerKg(44)
      }
    };

    const handleChangeQuantity = (e) => {
       setQuantity(e.target.value)
       setTotal(amtPerKg * e.target.value)
    }
    
    const closeModal = (e) => {
        if(e.target.classList.contains('backdrop')){
            setEditItemModal(null)
        }
    }

    //Submit function
    const handleSubmit = (e) => {
       e.preventDefault()
       setIsPending(true)
       projectFirestore.collection('riceItems').doc(item.id).update({
          quantity: quantity,
          amtPerKg: amtPerKg,
          variety: variety,
          total: total,
       })
       .then(() => {
          setIsPending(false)
          setEditItemModal(null)
       })
       .then(() => setItemUpdated(true))
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
                <h1>Edit Item</h1>
                <form className={classes.form} onSubmit={handleSubmit}>
                     <TextField
                        select
                        fullWidth
                        required
                        className={classes.field}
                        label="Select Variety"
                        value={variety}
                        onChange={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        >
                        {items.map((option) => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                    </TextField>
                    <TextField id="standard-basic"
                        type="number" 
                        label="Quantity" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={quantity}
                        onChange={handleChangeQuantity}
                    />
                    {
                       variety &&
                        <div className="total-modal">
                           <div className="div-group">
                              <p>Amount per Kg: <span>{amtPerKg}</span></p>
                           </div>
                           <div className="div-group">
                              <p>Total: <span>{total}</span></p>
                           </div>
                        </div>
                    }
                    <div className={classes.actionDiv}>
                       {
                          isPending ?
                              <Button variant="contained" color="primary" disabled>
                                 Saving...Please Wait...
                              </Button>
                          :
                          <div>
                             {
                                quantity !== 0 && variety !== '' ?
                                <Button variant="contained" 
                                    color="primary" 
                                    type="submit"
                                    >
                                    Update
                                 </Button>
                                 :
                                 <Button variant="contained" 
                                    color="primary" 
                                    type="submit"
                                    disabled
                                    >
                                    Update
                                 </Button>
                             }
                              <Button variant="contained" 
                                 className={classes.btnCancel}
                                 onClick={() => setEditItemModal(null)}
                              >Cancel</Button>
                          </div>
                       }
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
 
export default EditRiceItemModal;