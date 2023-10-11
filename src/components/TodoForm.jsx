import React, { useState } from 'react'
import shortid from 'shortid'



export default function TodoForm(props) {
    const [text , setText] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        props.onSubmit({
            id: shortid.generate(),
            text:text,
            complete:false
        })
        setText('')
    }



    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className='input-field' onChange={(e)=>setText(e.target.value)} value={text}/>
            <button onClick={handleSubmit} className='btn'>Add todo</button>
        </form>
    )
}
