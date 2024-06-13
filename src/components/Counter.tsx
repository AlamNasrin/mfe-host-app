import {useState, useEffect} from 'react';

import React from 'react';

//@ts-ignore
const RemoteCounter = React.lazy(() => import('customerModule/Counter')) // customerModule is same as in ModuleFederationPlugin in webpack.config.js in remote app

type CounterProps = {
    initialValue?: number
}

//const arr = useState(props.initialValue);// array => 2 elements, 1st elemt is a variable with the state
    //2nd element is a function to update the state
    //const counter = arr[0];
    //const setCounter = arr[1];

const Counter = (props: CounterProps)=> {

    const [counter, setCounter] = useState(props.initialValue);

    useEffect(() => {
        
        console.log("counter updated", counter);
        window.dispatchEvent(new CustomEvent('counter-updated', {detail: counter}));

    }, [counter])

    function inc(){
        console.log("inc invoked");
        //props is read-only
        // if(props.initialValue){
        //     props.initialValue++;
        // }
        if(counter !== undefined){
            setCounter(counter + 1);
            
        }
    }
    function decr(){
        if(counter !== undefined){
            setCounter(counter - 1);
        }
    }

    return (
        <div>
            <h4>Count: {counter}</h4>
            <div>
                <button onClick={inc}>Increment</button>&nbsp;
                <button onClick={decr}>Decrement</button>
            </div>
            <div>
                <React.Suspense fallback={<div>Loading...</div>}></React.Suspense>
                <RemoteCounter initialValue={20}/>
            </div>
        </div>
    )
}

export default Counter;