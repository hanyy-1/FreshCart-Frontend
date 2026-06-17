import React from 'react'
import useOnline from '../../Hooks/useOnline'

export default function Online({children}) {
const{online}= useOnline()
if (online){
     return children
}else{
    return <h2> you are offline</h2>
}
}
