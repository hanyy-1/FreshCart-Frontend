import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { TokenContext } from '../../context/Tokin.Context'

export default function ProdactedRoutes({children}){
  let {token}= useContext(TokenContext)

    if(token){
        return children

    }else{
        return <Navigate to={'/login'}/>
    }


}
