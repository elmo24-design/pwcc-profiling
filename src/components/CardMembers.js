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
      backgroundColor: (member) => {
         if(member.className === 'crimson'){
            return pink[500]
         }
         if(member.className === 'blue'){
            return blue[600]
         }
         if(member.className === 'yellow'){
            return yellow[600]
         }
         if(member.className === 'green'){
            return green[500]
         }
         if(member.className === 'orange'){
            return orange[800]
         }
         if(member.className === 'indigo'){
            return indigo[500]
         }
         if(member.className === 'purple'){
            return purple[500]
         }
         if(member.className === 'teal'){
            return teal[500]
         }
         if(member.className === 'cyan'){
            return cyan[700]
         }
         if(member.className === 'brown'){
            return brown[500]
         }
      }
   }
}));

const CardMembers = ({member,setMember,setSnackBarRemoved}) => {
   const classes = useStyles(member)

   const removeItem = () => {
      window.confirm('Are you sure you want to archive this data?') &&
      projectFirestore.collection('members').doc(member.id).update({
         status: false
      }).then(() => setSnackBarRemoved(true))
   }

   return ( 
      <Card className="card">
         <Avatar className={classes.avatar}>
            {member.name[0].toUpperCase()}
         </Avatar>
         <div className="right">
            <div className="details">
               <Link to={`/member/${member.id}`} className={classes.link}>
                  <p className="name">{member.name}</p>
               </Link>
            </div>
            <div className="actions">
               <div>
                  <EditIcon onClick={() => setMember(member)}/>
               </div>
               <div>
                  <DeleteIcon onClick={removeItem}/>
               </div>
            </div>
         </div>
      </Card>
   );
}
 
export default CardMembers;