import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const logIn = async() =>{
        try{
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch(error){
            setError(error.message);
        }
    }

    return(
        <>
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            <input 
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <input type="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            
            <button onClick={logIn}>Log in</button>
            
            <Link to="/create-account">Or create an account</Link>

        </>    
        )
}

export default LoginPage;