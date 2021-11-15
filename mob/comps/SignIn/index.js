import React, { useState } from "react";
import styled from "styled-components/native";

const TInput = styled.TextInput``;

const Button = styled.Button``;

const Cont = styled.View``;

const SignIn = ({
    onSignIn=()=>{},
    onCreate=()=>{}
}) => {
    const [em, setEm] = useState("");
    const [ps, setPs] = useState("");

    return <Cont>
      <TInput type="text" placeholder="email" onChangeText={(val)=>setEm(val)}/>
      <TInput secureTextEntry placeholder="password" onChangeText={(val)=>setPs(val)}/>
      <Button onPress={()=>onSignIn(em, ps)} title = "Sign In"/> 
      <Button onPress={()=>onCreate(em, ps)} title = "Create Account"/>
    </Cont>
}

// ()=>{
//     return onSignIn(em,ps)
// }

export default SignIn;