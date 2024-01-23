import React, { useState, useEffect } from 'react';
import css from "../style/EditProfile.module.css";
import { X } from "@phosphor-icons/react";
import Cookies from 'js-cookie';
import axios from 'axios';

const EditProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState(null); 
    
    const config = {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` }
    };
    
    const [showPassword, setShowPassword] = useState(false);
    
    const togglePasswordDisplay = () => {
        setShowPassword(!showPassword);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user', config);
                // Update state with the fetched data
                setUserData(response.data);
                // Set initial values for name and email based on user data
                setName(response.data.name);
                setEmail(response.data.email);
            } catch (error) {
                // Handle error
                console.error(error);
            }
        };
    
        // Check if there is a valid token before making the request
        if (Cookies.get('token')) {
            fetchData();
        }
    }, [config]);

    const edit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8000/api/user/update/data',
                {
                    name: name,
                    email: email,
                },
                config 
            );
    
            // Update local state with the new data
            setName(response.data.name);
            setEmail(response.data.email);
    
            console.log(response.data);
        } catch (error) {
            // Handle the error
            alert('Failed to update user profile!');
            console.error(error);
        }
    };


    return (
        <>
            <div className={css.main}>
                <div className={css.head}>
                    <h1 className={css.h1}>Hello {userData?.name}</h1>
                </div>
                <div className={css.editContainer}>
                    <div className={css.hiddenPasswordContainer} style={{display: showPassword ? 'flex' : 'none'}}>
                            <div className={css.cancelBox}><X onClick={togglePasswordDisplay} className={css.cancelTag} size={32} /></div>
                            <h3>Reset password</h3>
                            <input className={css.input} type='password' placeholder='Enter your old password'/>
                            <input className={css.input} type='password' placeholder='Enter your new password'/>
                            <input className={css.input} type='password' placeholder='Repeat your new password'/>
                            <button className={css.resetPassButton}>Reset password</button>
                        </div>
                    <div className={css.editBox}>
                        <h1>Edit Profile</h1>
                        <form className={css.form} onSubmit={edit}>
                            <div className={css.inputBox}>
                                <input className={css.input} 
                                    type='text' 
                                    placeholder='Name' 
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                                <input className={css.input} 
                                    type='text' 
                                    placeholder='Email' 
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                />
                                <button className={css.resetButton} onClick={togglePasswordDisplay}>Reset password</button>
                                <button className={css.saveButton}>Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}


export default EditProfile;