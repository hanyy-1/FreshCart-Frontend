import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { TokenContext } from '../../context/Tokin.Context'

export default function GardRoutes({children}) {
   let{token}= useContext(TokenContext)

    if(token){
       return <Navigate to={'/home'}/>

    }else{
       return children 
    }
}

