import { useState } from "react";
import styled from "styled-components";

const TInput = styled.input``;

const Button = styled.button``;

const Cont = styled.div``;

const SignIn = ({
    onSignIn=()=>{},
    onCreate=()=>{}
}) => {
    const [em, setEm] = useState("");
    const [ps, setPs] = useState("");

    return <Cont>
      <TInput type="text" placeholder="email" onChange={(e)=>setEm(e.target.value)}/>
      <TInput type="password" placeholder="password" onChange={(e)=>setPs(e.target.value)}/>
      <Button onClick={()=>onSignIn(em, ps)}>Sign In</Button>
      <Button onClick={()=>onCreate(em, ps)}>Create Account</Button>
    </Cont>
}

// ()=>{
//     return onSignIn(em,ps)
// }

export default SignIn;