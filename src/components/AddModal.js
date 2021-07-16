import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useRef } from 'react';
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

 //positions values
 const positions = [
    {
      value: '',
      label: "",
    },
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
      value: 'Encoder',
      label: 'Encoder',
    },
    {
        value: 'Member',
        label: 'Member',
    },
  ];
  //Civil Status Values
  const civilStatuses = [
   {
     value: '',
     label: "",
   },
   {
     value: 'Single',
     label: 'Single',
   },
   {
     value: 'Engaged',
     label: 'Engaged',
   },
   {
     value: 'Married',
     label: 'Married',
   },
   {
     value: 'Widowed',
     label: 'Widowed',
   },
   {
     value: 'Separated',
     label: 'Separated',
   },
 ];

const AddModal = ({setAddModal,setSnackBarAdded}) => {
    const classes = useStyles()
    const modalRef = useRef()
    const [isPending, setIsPending] = useState(false)
    //personal Info states
    const [name, setName] = useState('')
    const [civilStatus, setCivilStatus] = useState('')
    const [educAttainment, setEducAttainment] = useState('')
    const [age,setAge] = useState('')
    const [birthPlace, setBirthPlace] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [address, setAddress] = useState('')
    const [occupation, setOccupation] = useState('')
    const [contactNum, setContactNum] = useState('')
    const [salary, setSalary] = useState('')
    const [region, setRegion] = useState('')
    const [position, setPosition] = useState('')
    const [officeAdd, setOfficeAdd] = useState('')
    const [father, setFather] = useState('')
    const [mother, setMother] = useState('')
    const [spouse, setSpouse] = useState('')
    const [spouseOccupation,setSpouseOccupation] = useState('')
    
    let [child,setChild] = useState('')
    let [beneficiary,setBeneficiary] = useState('')

    //Arrays
    let [children,setChildren] = useState([])
    let [beneficiaries,setBeneficiaries] = useState([])

    const colors = ['crimson','blue','yellow','green','orange','indigo','purple','teal','cyan','brown']
    const random = Math.floor(Math.random() * 10);
    
    //Submit function
    const handleSubmit = (e) => {
       e.preventDefault()
       setIsPending(true)
       projectFirestore.collection('officers').add({
          name: name,
          civilStatus: civilStatus,
          educAttainment: educAttainment,
          age: age,
          birthPlace: birthPlace,
          birthDate: birthDate,
          presentAdd: address,
          occupation: occupation,
          contactNum: contactNum,
          salary: salary,
          region: region,
          position: position,
          officeAdd: officeAdd,
          father: father,
          mother: mother,
          spouse: spouse,
          spouseOccupation: spouseOccupation,
          children: children,
          beneficiaries: beneficiaries,
          subscribedShares: 0,
          paidUpShares: 0,
          status: true,
          className: colors[random],
          createdAt: timestamp()
       }).then(() => {
          setIsPending(false)
          setAddModal(false)
          setSnackBarAdded(true)
       }).catch(err => console.log(err))
    }

    const handleChange = (event) => {
      setPosition(event.target.value);
    };
    const handleChangeStatus = (event) => {
      setCivilStatus(event.target.value);
    };

   //  const closeModal = (e) => {
   //      if(e.target.classList.contains('backdrop')){
   //          setAddModal(false)
   //      }
   //  }

   //Add Children
   const addChild = () => {
      if(!children.includes(child)){
         let result = []
         result.push(child)
         setChildren([...children, child])
      }
      setChild('')
   }
   const removeChild = (item) => {
      children = children.filter(child => {
         return item !== child
      })
      setChildren(children)
   }
   //Add Beneficiary
   const addBenef = () => {
      if(!beneficiaries.includes(beneficiary)){
         let result = []
         result.push(beneficiary)
         setBeneficiaries([...beneficiaries, beneficiary])
      }
      setBeneficiary('')
   }
   const removeBenef = (item) => {
      beneficiaries = beneficiaries.filter(benef => {
         return item !== benef
      })
      setBeneficiaries(beneficiaries)
   }

   const scrollToBottom = () => {
      modalRef.current.scrollIntoView({ behavior: 'smooth' })
   }

   useEffect(() => {
      scrollToBottom()
   }, [children, beneficiaries])

    return ( 
        <motion.div className="backdrop" 
            // onClick={closeModal}
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <motion.div className="modal" variants={modal}>
                <h1>Add an Officer...</h1>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField id="standard-basic" 
                        label="Name" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        select
                        fullWidth
                        required
                        className={classes.field}
                        label="Select Civil Status"
                        value={civilStatus}
                        onChange={handleChangeStatus}
                        SelectProps={{
                            native: true,
                        }}
                        >
                        {civilStatuses.map((option) => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                    </TextField>
                    <TextField id="standard-basic" 
                        label="Highest Educational Attainment" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={educAttainment}
                        required
                        onChange={(e) => setEducAttainment(e.target.value)}
                    />
                    <TextField id="standard-basic" 
                        label="Age" 
                        type="number"
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={age}
                        required
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <TextField id="standard-basic" 
                        label="Birth Place" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={birthPlace}
                        required
                        onChange={(e) => setBirthPlace(e.target.value)}
                    />
                    
                    <TextField id="standard-basic" 
                        label="Date of Birth" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={birthDate}
                        required
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                    <TextField id="standard-basic" 
                        label="Present Address" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <TextField id="standard-basic" 
                        label="Occupation" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={occupation}
                        required
                        onChange={(e) => setOccupation(e.target.value)}
                    />
                    <TextField id="standard-basic" 
                        label="Contact Number" 
                        fullWidth 
                        className={classes.field} 
                        autoComplete="off"
                        value={contactNum}
                        onChange={(e) => setContactNum(e.target.value)}
                    />
                    <TextField id="standard-basic"
                        type="number" 
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
                        <ol>
                           {
                              children && children.map(item => (
                                 <li key={item}>
                                    <p>{item}</p>
                                    <span onClick={() => removeChild(item)}>X</span>
                                 </li>
                              ))
                           }       
                        </ol> 
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
                        <ol>
                           {
                              beneficiaries && beneficiaries.map(item => (
                                 <li key={item}>
                                    <p>{item}</p>
                                    <span onClick={() => removeBenef(item)}>X</span>
                                 </li>
                              ))
                           }       
                        </ol>         
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
                                onClick={addBenef}
                            >Add</Button>
                        </div>   
                    </div>
                    
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
                                 onClick={() => setAddModal(false)}
                              >Cancel</Button>
                          </div>
                       }
                    </div>
                </form>
                <div ref={modalRef}></div>
            </motion.div>
        </motion.div>
    );
}
 
export default AddModal;