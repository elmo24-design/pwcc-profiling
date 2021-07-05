import React from 'react';
import { useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { Card } from '@material-ui/core';
import useOfficers from '../hooks/useOfficers';
import useMembers from '../hooks/useMembers';
import { useEffect } from 'react';

function Alert(props) {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Dashboard = ({snackBarLogin,setSnackBarLogin}) => {
   const {members} = useMembers('members')
   const {officers} = useOfficers('officers')

   const [totalSubscribedNum,setTotalSubscribedNum] = useState(null)
   const [totalSubscribedAmt,setTotalSubscribedAmt] = useState(0)
   const [totalPaidUpNum,setTotalPaidUpNum] = useState(0)
   const [totalPaidUpAmt,setTotalPaidUpAmt] = useState(0)

   useEffect(() => {
      officers.map(officer => {
         members.map(member => {
            //Total no. of paid up shares
            let total1 = 0
            total1 += parseInt(officer.paidUpShares) + parseInt(member.paidUpShares)
            total1 = (Math.round(total1 * 100) / 100).toFixed(2)
            setTotalPaidUpNum(total1)

            //Total Amt. of paid-up shares
            let total2 = 0
            total2 += (parseInt(officer.paidUpShares) * 100) + (parseInt(member.paidUpShares) * 100)
            total2 = (Math.round(total2 * 100) / 100).toFixed(2)
            setTotalPaidUpAmt(total2)

            //Total no. subscribed shares
            let total3 = 0
            total3 += parseInt(officer.subscribedShares) + parseInt(member.subscribedShares)
            total3 = (Math.round(total3 * 100) / 100).toFixed(2)
            setTotalSubscribedNum(total3)

            //Total amt. of subscribed shares
            let total4 = 0
            total4 += (parseInt(officer.subscribedShares) * 100) + (parseInt(member.subscribedShares) * 100)
            total4 = (Math.round(total4 * 100) / 100).toFixed(2)
            setTotalSubscribedAmt(total4)
         })
      })
   }, [officers,members])

   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         setSnackBarLogin(false);
      }
  
      setSnackBarLogin(false);
   };

   return ( 
      <div className="dashboard">
         <Snackbar
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={snackBarLogin}
            autoHideDuration={3000}
            onClose={handleClose}
         >
            <Alert onClose={handleClose} severity="success">
              Welcome back! You are now logged in.
            </Alert>
         </Snackbar>
         <h1 className="dashboard-heading">Dashboard</h1>
         <div className="card-grid-1">
            <Card>
               <div className="d-card-top blue-card-top">
                  <i class="fas fa-users-cog" id="icon-top"></i>
                  <div className="d-card-right">
                     <h3>{officers.length}</h3>
                     <h4>Officers</h4>
                  </div>
               </div>
            </Card>
            <Card>
               <div className="d-card-top violet-card-top">
                  <i class="fas fa-user-friends" id="icon-top"></i>
                  <div className="d-card-right">
                     <h3>{members.length}</h3>
                     <h4>Members</h4>
                  </div>
               </div>
            </Card>
         </div>
         <div className="card-grid-2">
            <Card>
               <div className="d-card blue-card">
                  <p>Total No. of Subscribed Shares</p>
                  <div className="d-card-bottom">
                     <i class="fas fa-clipboard-list" id="icon"></i>
                     <h4>{totalSubscribedNum}</h4>
                  </div>
               </div>
            </Card>
            <Card>
               <div className="d-card green-card">
                  <p>Total Amt. of Subscribed Shares</p>
                  <div className="d-card-bottom">
                     <i class="fas fa-money-bill-wave-alt" id="icon"></i>
                     <h4>{totalSubscribedAmt}</h4>
                  </div>
               </div>
            </Card>
            <Card>   
               <div className="d-card orange-card">
                  <p>Total no. of paid-up shares</p>
                  <div className="d-card-bottom">
                     <i class="fas fa-clipboard-list" id="icon"></i>
                     <h4>{totalPaidUpNum}</h4>
                  </div>
               </div>
            </Card>
            <Card>
               <div className="d-card red-card">
                  <p>Total amt. of paid-up shares</p> 
                  <div className="d-card-bottom">
                     <i class="fas fa-money-bill-wave-alt" id="icon"></i>
                     <h4>{totalPaidUpAmt}</h4>
                  </div>
               </div>
            </Card>
         </div>
      </div>
   );
}
 
export default Dashboard;