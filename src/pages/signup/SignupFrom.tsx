import { useState, type ChangeEvent, type FormEvent } from 'react'
import { API_ENDPOINT } from '../../config/constants';
import { useNavigate } from 'react-router-dom';

const SignupFrom = () => {
    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        organizationName : '',
        username : '',
        email : '',
        password : '',
    });

    const changeHandler = (event : ChangeEvent<HTMLInputElement>) => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value,
            }
        })
    }
    const submitHandler = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const sendData = async () => {
            try {
                const response = await fetch(`${API_ENDPOINT}/organisations`,
                    {
                        method : 'post',
                        headers : {
                            'Content-Type' : 'application/json',
                        },
                        body : JSON.stringify({
                            name : formData.organizationName,
                            user_name : formData.username,
                            email : formData.email,
                            password : formData.password,
                        }),
                    }
                )
                if(!response.ok) {
                    console.log('signup unsuccessful');
                }
                else {
                    const responseData = await response.json();
                    localStorage.setItem('authToken',responseData.token);
                    localStorage.setItem('user',JSON.stringify(responseData.user));
                    console.log('signup successful');
                    navigate('/account');
                    
                }
            }
            catch(error) {
                console.log(error);
            }
        }
        sendData();
        setFormData({organizationName : '', username : '',email : '', password : ''});
    }

    return (
        <>
        <form onSubmit={submitHandler} style = {{display : 'flex', flexDirection : 'column', width : '10rem'}}>
            <label htmlFor='organizationName'>organizationName</label>
            <input name  = 'organizationName' type = 'text' value = {formData.organizationName} onChange={changeHandler}/>
            <label htmlFor='username'>username</label>
            <input name  = 'username' type = 'text' value = {formData.username} onChange={changeHandler}/>
            <label htmlFor='email'>email</label>
            <input name = 'email' type = 'text' value = {formData.email} onChange={changeHandler}/>
            <label htmlFor='password'>password</label>
            <input name = 'password' type = 'password' value = {formData.password} onChange={changeHandler}/>
            <button type = 'submit'>sumbit</button>
        </form>
        </>
    )
}

export default SignupFrom
