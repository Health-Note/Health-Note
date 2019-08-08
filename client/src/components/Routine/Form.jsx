import React, { useState } from 'react'


const Form = ({ onSubmit }) => {
    const [name, setText] = useState("");
    const [sets, setSets] = useState(5);
    const [reps, setReps] = useState(15);
    
    const handleChange = (evt) => {
        setText(evt.target.value)
    }

    const handleSubmit = (e, value) => {
        e.preventDefault();
        onSubmit(name, sets, reps);
    }

    return (
        <div>
        
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={ name } onChange={ handleChange }></input>
                <input type="text" name="sets" value={ sets } onChange={ handleChange }></input>
                <input type="text" name="reps" value={ reps } onChange={ handleChange }></input>
                <button>제출</button>
            </form>
            
        </div>
    )
}

export default Form
