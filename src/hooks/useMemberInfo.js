import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useMemberInfo = (id) => {
   const [member,setMember] = useState([])

   useEffect(() => {
      const unsub = projectFirestore.collection('members').doc(id)
      .onSnapshot(doc =>{
        if(doc.data()){
           setMember({...doc.data(), id: doc.id})
        }   
      })
      return (() => unsub())
   }, [id])

   return {member}
}
 
export default useMemberInfo;