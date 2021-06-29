import { useState } from 'react';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    add:{
        marginLeft: '14px',
        marginBottom: '18px'
    },
    arrayDiv:{
        marginTop: '20px',
        marginBottom: '10px'
    },
    span:{
        fontWeight: 'normal'
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
    {
        value: 'Member',
        label: 'Member',
    },
  ];


const AddModal = ({setAddModal}) => {
    const classes = useStyles()

    //personal Info states
    const [name, setName] = useState('')
    const [civilStatus, setCivilStatus] = useState('')
    const [birthPlace, setBirthPlace] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [address, setAddress] = useState('')
    const [occupation, setOccupation] = useState('')
    const [salary, setSalary] = useState('')
    const [region, setRegion] = useState('')
    const [position, setPosition] = useState('')
    const [officeAdd, setOfficeAdd] = useState('')
    const [father, setFather] = useState('')
    const [mother, setMother] = useState('')
    const [spouse, setSpouse] = useState('')
    const [spouseOccupation,setSpouseOccupation] = useState('')

    const [child,setChild] = useState('')
    const [beneficiary,setBeneficiary] = useState('')

    //Arrays
    const [children,setChildren] = useState([])
    const [beneficiaries,setBeneficiaries] = useState([])


    const handleChange = (event) => {
      setPosition(event.target.value);
    };

    const closeModal = (e) => {
        if(e.target.classList.contains('backdrop')){
            setAddModal(false)
        }
    }

    const addChild = () => {
        children.push( [...children], child)
        console.log(children)
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
                        label="Name" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField id="standard-basic" 
                        label="Civil Status" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={civilStatus}
                        onChange={(e) => setCivilStatus(e.target.value)}
                    />
                    <TextField id="standard-basic" 
                        label="Birth Place" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={birthPlace}
                        onChange={(e) => setBirthPlace(e.target.value)}
                    />
                    <TextField id="standard-basic" 
                        label="Date of Birth" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                    <TextField id="standard-basic" 
                        label="Present Address" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <TextField id="standard-basic" 
                        label="Occupation" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                    />
                    <TextField id="standard-basic" 
                        label="Salary (Month) Php " 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                    />
                    <TextField id="standard-basic" 
                        label="Program/Region" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
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
                        label="Office Address" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={officeAdd}
                        onChange={(e) => setOfficeAdd(e.target.value)}
                    />
                    <TextField id="standard-basic" 
                        label="Name of Father" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={father}
                        onChange={(e) => setFather(e.target.value)}
                    />
                    <TextField id="standard-basic" 
                        label="Name of Mother" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={mother}
                        onChange={(e) => setMother(e.target.value)}
                    />  
                    <TextField id="standard-basic" 
                        label="Name of Spouse (if Married)" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={spouse}
                        onChange={(e) => setSpouse(e.target.value)}
                    />
                    <TextField id="standard-basic" 
                        label="Occupation" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={spouseOccupation}
                        onChange={(e) => setSpouseOccupation(e.target.value)}
                    />
                    <div className={classes.arrayDiv}>  
                        <h4 className={classes.span}>Name/Age of Children: (ex. format: John Doe - 21) </h4>        
                        <div className="add-child">
                            <TextField id="standard-basic" 
                                fullWidth 
                                className={classes.field} 
                                autoComplete="off"
                                value={child}
                                onChange={(e) => setChild(e.target.value)}
                            />
                            <Button variant="contained" 
                                className={classes.add}
                                onClick={addChild}
                            >Add</Button>
                        </div>   
                    </div>
                    <div className={classes.arrayDiv}>  
                        <h4  className={classes.span}>Beneficiary/ies: </h4>        
                        <div className="add-benef">
                            <TextField id="standard-basic" 
                                fullWidth 
                                className={classes.field} 
                                autoComplete="off"
                                value={beneficiary}
                                onChange={(e) => setBeneficiary(e.target.value)}
                            />
                            <Button variant="contained" 
                                className={classes.add}
                            >Add</Button>
                        </div>   
                    </div>
                    
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