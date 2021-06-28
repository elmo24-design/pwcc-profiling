import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
//components
import AddModal from '../components/AddModal';

const useStyles = makeStyles((theme) => ({
   icon:{
      backgroundColor: '#FF00A8',
      color: 'white',
      width: theme.spacing(6),
      height: theme.spacing(6)
   },
}));

const Officers = () => {
   const classes = useStyles();
   const [addModal,setAddModal] = useState(false);

   return ( 
    <> 
        {
            addModal &&
            <AddModal setAddModal={setAddModal}/>
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
                    <h1>Total: 99</h1>
                </div>
            </div>
            <div className="search-field">
                <TextField id="standard-basic" label="Search here..." fullWidth 
                autoComplete="off"
                />
            </div>
        </div>
    </>
   );
}
 
export default Officers;