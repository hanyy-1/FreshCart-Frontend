import React from 'react'
import useOnline from '../../Hooks/useOnline'

export default function Offline(children) {
 const {online}=useOnline()


 if(!online){
    return children
 }
}
