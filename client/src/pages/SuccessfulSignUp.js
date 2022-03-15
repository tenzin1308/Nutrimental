import React from 'react';
import AccountLayout from '../components/AccountLayout';

function SuccessfulSignUp(){
    return (
        <AccountLayout
            showTabs={false}
            className="py-36 w-[50rem]"
        >
            <div className="justify-center items-center text-center">
            <h1 className="text-6xl mb-12 font-bold">Signup Successful</h1>
            <p className="text-xl">Welcome you have been successfully signed up.</p>
            </div>
        </AccountLayout>

    )
}

export default SuccessfulSignUp;