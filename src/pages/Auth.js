import React, { useState } from 'react'

const intialState={
  email: "",
  password:""
}
const Auth = () => {
  const [state,setState]=useState(intialState);
  const [signUp, setSignUp]=useState(false);
  return (
    <div>Auth</div>
  )
}

export default Auth;