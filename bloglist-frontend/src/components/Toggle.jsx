import React, { useState, forwardRef, useImperativeHandle } from 'react'

const Toggle = forwardRef((props, ref) => {
    const [revealForm, setRevealForm] = useState(false)
    const hideWhenVisible = { 'display': revealForm ? 'none' : '' }
    const showWhenVisible = { 'display': revealForm ? '' : 'none' }

    const toggleVisibility = () => setRevealForm(!revealForm)

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })
    return (
        <div>
            <div style={hideWhenVisible}>
                <button className="reveal-btn" onClick={() => setRevealForm(true)}>{props?.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button className="close-btn" onClick={() => setRevealForm(false)}>Close</button>
            </div>
        </div>
    );
})

export default Toggle;