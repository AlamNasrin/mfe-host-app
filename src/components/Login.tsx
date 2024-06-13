import {useRef, useEffect, useState, ChangeEvent} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';

function Login(){

    const userNameRef =useRef<HTMLInputElement>(null);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //useEffect(callback, [dependencies]);
    useEffect(() => {

        console.log("component mounted");
        userNameRef.current?.focus();

        return () => {
            console.log("component unmounted");
        }

    }, []);

    async function handleLogin(){

        debugger;
        // const uname =  userNameRef.current?.value
        if(userName && password){
            //API call
            const url = "http://localhost:9000/login";

            // Value of username populates from useSelector in ListCustomers.tsx of remote-app
            axios
                .post(url, {name: userName, password})
                .then((response) => {
                    console.log("success", response);
                }, (error) => {
                    console.log("error", error);
                })

            //async - await => Promise
            try {
                const response = await axios.post(url, {name: userName, password});
                console.log("success", response);
                dispatch({type: "login", payload: {
                    userName: userName,
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken
                
                }});
                setMessage("");
                navigate("/products");

            } catch (error) {
                 console.log("error", error);
                 setMessage("Invalid credentials");
                 dispatch({type: "logout"});
            }


        }
        else{
            setMessage("Enter the credentials");
        }

    }
    function handleUserName(evt: ChangeEvent<HTMLInputElement>){

        const value = evt.target.value;
        setUserName(value);
    }
    function handlePassword(evt: ChangeEvent<HTMLInputElement>){

        const value = evt.target.value;
        setPassword(value);
    }

    return (
        <div>
            <h4>Login</h4>
            {message ? <div style={{border: "1px solid red"}}>{message}</div> : null}

            <form onSubmit={handleLogin}>
                <div className='form-group'>
                    <label htmlFor="name">UserName</label>
                    <input className='form-control' ref={userNameRef} type="text" 
                            id="name" placeholder="UserName" value={userName}  onChange={handleUserName}/>
                </div>

                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input className='form-control' type="password" id="password" placeholder="*******" 
                            value={password} onChange={handlePassword}/>
                </div>
                <div>
                    <button className='btn btn-primary' type="button" onClick={handleLogin}>Login</button>
                </div>
            </form>
        </div>
    )
}
export default Login;