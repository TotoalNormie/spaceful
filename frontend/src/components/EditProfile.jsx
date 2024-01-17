import React, { useState } from 'react';
import css from "../style/EditProfile.module.css";
import { X } from "@phosphor-icons/react"

const EditProfile = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordDisplay = () => {
        setShowPassword(!showPassword);
    }

	return (
        <>
            <div className={css.main}>
                <div className={css.head}>
                    <h1 className={css.h1}>Hello "username"</h1>
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
                        <div className={css.inputBox}>
                            <input className={css.input} type='text' placeholder='Name' />
                            <input className={css.input} type='text' placeholder='Surname' />
                            <input className={css.input} type='text' placeholder='Email' />
                            <button className={css.resetButton} onClick={togglePasswordDisplay}>Reset password</button>
                            <button className={css.saveButton}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default EditProfile;