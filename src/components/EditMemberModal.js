import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useRef } from 'react';
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

const EditMemberModal = ({member,setMember,setSnackBarUpdated}) => {
    const classes = useStyles()
    const modalRef = useRef()
    const [isPending, setIsPending] = useState(false)
    //personal Info states
    const [name, setName] = useState(member.name)
    const [civilStatus, setCivilStatus] = useState(member.civilStatus)
    const [birthPlace, setBirthPlace] = useState(member.birthPlace)
    const [birthDate, setBirthDate] = useState(member.birthDate)
    const [address, setAddress] = useState(member.presentAdd)
    const [occupation, setOccupation] = useState(member.occupation)
    const [salary, setSalary] = useState(member.salary)
    const [region, setRegion] = useState(member.region)

    const [officeAdd, setOfficeAdd] = useState(member.officeAdd)
    const [father, setFather] = useState(member.father)
    const [mother, setMother] = useState(member.mother)
    const [spouse, setSpouse] = useState(member.spouse)
    const [spouseOccupation,setSpouseOccupation] = useState(member.spouseOccupation)

    let [child,setChild] = useState('')
    let [beneficiary,setBeneficiary] = useState('')

    //Arrays
    let [children,setChildren] = useState(member.children)
    let [beneficiaries,setBeneficiaries] = useState(member.beneficiaries)
    
    //Submit function
    const handleSubmit = (e) => {
       e.preventDefault()
       setIsPending(true)
       projectFirestore.collection('members').doc(member.id).update({
          name: name,
          civilStatus: civilStatus,
          birthPlace: birthPlace,
          birthDate: birthDate,
          presentAdd: address,
          occupation: occupation,
          salary: salary,
          region: region,
          officeAdd: officeAdd,
          father: father,
          mother: mother,
          spouse: spouse,
          spouseOccupation: spouseOccupation,
          children: children,
          beneficiaries: beneficiaries,
       }).then(() => {
          setIsPending(false)
          setMember(null)
          setSnackBarUpdated(true)
       }).catch(err => console.log(err))
    }

    const handleChangeStatus = (event) => {
      setCivilStatus(event.target.value);
    };

   //  const closeModal = (e) => {
   //      if(e.target.classList.contains('backdrop')){
   //          setOfficer(null)
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
                <h1>Edit Info...</h1>
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
                                 onClick={() => setMember(null)}
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
 
export default EditMemberModal;