import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
//hooks
import useOfficers from '../hooks/useOfficers';
//components
import AddModal from '../components/AddModal';
import EditOfficerModal from '../components/EditOfficerModal';
import EditIcon from '@material-ui/icons/Edit';
import { motion } from 'framer-motion';
import Cards from '../components/Cards';

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
   },
   nothing:{
      marginTop: '1rem'
   }
}));

const Officers = () => {
   const classes = useStyles();
   const [addModal,setAddModal] = useState(false);
   const [officer,setOfficer] = useState(null)
   const {officers} = useOfficers('officers')

   const [searchText, setSearchText] = useState('')

   return ( 
    <> 
        {
            addModal &&
            <AddModal setAddModal={setAddModal}/>
        }
        {
           officer &&
           <EditOfficerModal officer={officer} setOfficer={setOfficer}/>
        }
        <div className="container-officers">
            <div className="heading">
                <div className="left">
                    <Fab className={classes.icon} color="secondary" aria-label="edit"
                    onClick={() => setAddModal(true)}
                    >
                        <EditIcon />
                    </Fab>
                    <h1>Officers</h1>
                </div>
                <div className="right">
                    <h1>Total: {officers.length}</h1>
                </div>
            </div>
            <div className="search-field">
                <TextField id="standard-basic" label="Search here..." fullWidth 
                autoComplete="off"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value.toLowerCase())}
                />
            </div>
            {
               officers.length !== 0 ?
                  <motion.div className="cards" layout>
                     {
                        officers && officers.map(officer => (
                           <div key={officer.id}>
                              {
                                 officer.name.toLowerCase().indexOf(searchText) !== -1 ?
                                    <Cards officer={officer} setOfficer={setOfficer}/>
                                 :
                                 ''
                              }
                           </div>
                        ))
                     }
                  </motion.div>
                  :
                  <div className={classes.nothing}>
                     Nothing to show here yet...
                  </div>
            }
          
        </div>
    </>
   );
}
 
export default Officers;