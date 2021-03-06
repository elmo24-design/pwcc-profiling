import { Card,Avatar } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

//colors
import { pink,blue,yellow,green,orange,indigo,purple,teal,cyan,brown } from '@material-ui/core/colors';
import { projectFirestore } from '../firebase/config';

const useStyles = makeStyles((theme) => ({
   icon:{
      backgroundColor: '#FF00A8',
      color: 'white',
      width: theme.spacing(6),
      height: theme.spacing(6)
   },
   link:{
      color: 'black',
      '&:hover':{
         textDecoration: 'underline'
      }
   },
   avatar:{
      width: theme.spacing(6),
      height: theme.spacing(6),
      backgroundColor: (officer) => {
         if(officer.className === 'crimson'){
            return pink[500]
         }
         if(officer.className === 'blue'){
            return blue[600]
         }
         if(officer.className === 'yellow'){
            return yellow[600]
         }
         if(officer.className === 'green'){
            return green[500]
         }
         if(officer.className === 'orange'){
            return orange[800]
         }
         if(officer.className === 'indigo'){
            return indigo[500]
         }
         if(officer.className === 'purple'){
            return purple[500]
         }
         if(officer.className === 'teal'){
            return teal[500]
         }
         if(officer.className === 'cyan'){
            return cyan[700]
         }
         if(officer.className === 'brown'){
            return brown[500]
         }
      }
   }
}));

const Cards = ({officer,setOfficer,setSnackBarRemoved}) => {
   const classes = useStyles(officer)

   const removeItem = () => {
      window.confirm('Are you sure you want to archive this data?') &&
      projectFirestore.collection('officers').doc(officer.id).update({
         status: false
      }).then(() => setSnackBarRemoved(true))
   }

   return ( 
      <Card className="card">
         <Avatar className={classes.avatar}>
            {officer.name[0].toUpperCase()}
         </Avatar>
         <div className="right">
            <div className="details">
               <Link to={`/officer/${officer.id}`} className={classes.link}>
                  <p className="name">{officer.name}</p>
               </Link>
               <span>{officer.position}</span>
            </div>
            <div className="actions">
               <div>
                  <EditIcon onClick={() => setOfficer(officer)}/>
               </div>
               <div>
                  <DeleteIcon onClick={removeItem}/>
               </div>
            </div>
         </div>
      </Card>
   );
}
 
export default Cards;