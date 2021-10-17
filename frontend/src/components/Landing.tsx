import React from 'react';
import Button from "./Button";

function Landing() {
    return (
        <div className={'flex-initial py-36'}>
            <h1 className={'text-red-600 text-7xl font-bold'}>Register now</h1>
            <h3 className={'text-4xl'}>and gain instant access to</h3>
            <h1 className={'text-yellow-50 text-8xl font-bold'}>1000000+</h1>
            <h2 className={'text-yellow-50 text-6xl'}>movie reviews</h2>
            <Button styling={'p-3 hover:bg-yellow-300 bg-yellow-400 rounded-lg text-lg text-black font-bold'} text={'register'}/>
            <Button styling={'m-10 p-2 border-4 border-yellow-400 hover:border-yellow-300 text-lg rounded-lg text-yellow-400 hover:text-yellow-300 font-bold'} text={'login'}/>
        </div>
    );
}

export default Landing;