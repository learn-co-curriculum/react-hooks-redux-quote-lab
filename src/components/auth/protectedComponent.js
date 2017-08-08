import React, { Component } from 'react'

export default function protectedComponent(Component){
  return class AuthComponent extends Component {
    
    render(){
      return <Component {...props}/>
    }
  }
}


protectedComponent(<Users >)
