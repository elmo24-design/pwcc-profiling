import { useState } from 'react';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
        marginTop: '10px'
    }
 }));

 const positions = [
    {
      value: 'Chairperson',
      label: 'Chairperson',
    },
    {
      value: 'Vice Chairperson',
      label: 'Vice Chairperson',
    },
    {
      value: 'Secretary',
      label: 'Secretary',
    },
    {
      value: 'Treasurer',
      label: 'Treasurer',
    },
    {
      value: 'General Manager',
      label: 'General Manager',
    },
    {
      value: 'Audit Committee',
      label: 'Audit Committee',
    },
    {
      value: 'Education Committee',
      label: 'Education Committee',
    },
    {
      value: 'Election Committee',
      label: 'Election Committee',
    },
    {
      value: 'Ethics Committee',
      label: 'Ethics Committee',
    },
    {
      value: 'GAD Committee',
      label: 'GAD Committee',
    },
    {
      value: 'Mediation Committee',
      label: 'Mediation Committee',
    }, 
    {
      value: 'Membership Committee',
      label: 'Membership Committee',
    },
  ];

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
        y: '50px',
        opacity: 1,
        transition: {
            delay: 0.2
        }
    }
}

const AddModal = ({setAddModal}) => {
    const classes = useStyles()
    const [position, setPosition] = useState('')

    const handleChange = (event) => {
      setPosition(event.target.value);
    };

    const closeModal = (e) => {
        if(e.target.classList.contains('backdrop')){
            setAddModal(false)
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
            <motion.div className="modal" variants={modal}>
                <h1>Add an Officer...</h1>
                <form className={classes.form}>
                    <TextField id="standard-basic" 
                        label="First Name" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                    />
                    <TextField
                        select
                        fullWidth
                        className={classes.field}
                        label="Select Position"
                        value={position}
                        onChange={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        >
                        {positions.map((option) => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                    </TextField>
                    <TextField id="standard-basic" 
                        label="Nickname" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                    />
                    <TextField id="standard-basic" 
                        label="Municipal Address" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                    />
                    <TextField id="standard-basic" 
                        label="Date of Birth" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                    />
                    <TextField id="standard-basic" 
                        label="Age" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                    />
                    <TextField id="standard-basic" 
                        label="Civil Status" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                    />
                    <TextField id="standard-basic" 
                        label="Religion" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                    />
                    <TextField id="standard-basic" 
                        label="Highest Educational Attainment" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                    />
                    <TextField id="standard-basic" 
                        label="Occupation" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                    />
                    <TextField id="standard-basic" 
                        label="Contact No." 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                    />
                    <TextField id="standard-basic" 
                        label="Mother's Name" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                    />
                    <TextField id="standard-basic" 
                        label="Father's Name" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                    />
                    <TextField id="standard-basic" 
                        label="Name of Spouse" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                    />
                    <TextField id="standard-basic" 
                        label="Nickname" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                    />
                    <TextField id="standard-basic" 
                        label="Date of Birth" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                    />
                    <TextField id="standard-basic" 
                        label="Age" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                    />
                    <TextField id="standard-basic" 
                        label="Highest Educational Attainment" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                    />
                    <TextField id="standard-basic" 
                        label="Occupation" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                    />
                    <TextField id="standard-basic" 
                        label="Number of Children" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                    />
                    <TextField id="standard-basic" 
                        label="Person to Notify In Case of Emergency" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                    />
                    <div className={classes.actionDiv}>
                        <Button variant="contained" color="primary">
                            Save
                        </Button>
                        <Button variant="contained" 
                            className={classes.btnCancel}
                            onClick={() => setAddModal(false)}
                        >Cancel</Button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
 
export default AddModal;