import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { projectAuth } from '../firebase/config';
import logo from '../images/pwcc 3.png';

const useStyles = makeStyles({
   field: {
      marginTop: 20,
      marginBottom: 20,
      display: 'block',
   },
   button: {
      padding:'0.7rem'
   },
})

const Signin = ({setSnackBarLogin,setTransition}) => {
   const history = useHistory()
   const classes = useStyles()
   const regex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/

   //sign in
   const [error,setError] = useState(null)
   const [isPending,setIsPending] = useState(false)

   //states
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   //errors
   const [emailError, setEmailError] = useState(false)
   const [passwordError, setPasswordError] = useState(false)

   //error messages
   const [emailErrorText, setEmailErrorText] = useState('')
   const [passwordErrorText, setPasswordErrorText] = useState('')

   const handleSubmit = async(e) => {
      e.preventDefault() 
      if(validate(email, password)){
         setError(null)
         setIsPending(true)
         try{
            const res = await projectAuth.signInWithEmailAndPassword(email,password)
            if(!res){
               throw new Error('could not complete the sign in')
            }

            history.push('/home')
            setError(null)
            setIsPending(false)
            setSnackBarLogin(true)
         }
         catch(err){
            console.log(err.message)
            setError(err.message)
            setIsPending(false) 
         }
      }
   }

   const validate = (email, password) => {
      
      if(email === ''){
         setEmailError(true)
         setEmailErrorText("Email is Required")
      }else if(email !== '' && !regex.test(email)){
         setEmailError(true)
         setEmailErrorText("Email should be valid")
      }else{
         setEmailError(false)
         setEmailErrorText("")
      }

      if(password === ''){
         setPasswordError(true)
         setPasswordErrorText("Password is Required")
      }else{
         setPasswordError(false)
         setPasswordErrorText("")
      }
   

      if(email && password && regex.test(email)){
         reset()
         return true
      }else{
         return false
      }
   }

   const reset = () => {
      setEmailError(false)
      setPasswordError(false)
      setEmailErrorText('')
      setPasswordErrorText('')
   }


   return ( 
      <div className="sign-in">
         <Card className="card-signin">
            <div className="box-wrapper">
               <img src={logo} alt="logo" className="logo" />
            </div>
            <form noValidate autoComplete="off" onSubmit={handleSubmit} className="form">
               <h1>PWCC Profiling and Sales Management Application</h1>
               <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth 
                  className={ classes.field }
                  required id="outlined-basic" 
                  label="E-Mail Address"
                  error={emailError}
                  helperText={emailErrorText}
                  variant="filled" />
               <TextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth 
                  className={ classes.field }
                  required 
                  id="outlined-basic" 
                  label="Password" 
                  type="password"
                  variant="filled"
                  error={passwordError}
                  helperText={passwordErrorText}
               />
               {
                  error && (
                     <div className="error">
                        { error }
                     </div>
                  )
               }
               {
                  isPending ? 
                     <Button
                     fullWidth
                     className={classes.button}
                     variant="contained"
                     color="primary"
                     type="submit"
                     disabled
                     >
                        Loading...Please Wait...
                     </Button>
                  :
                     <Button
                     fullWidth
                     className={classes.button}
                     variant="contained"
                     color="primary"
                     type="submit"
                     >
                        Sign in
                     </Button> 
               }
            </form>
         </Card>
      </div>
   );
}
 
export default Signin;