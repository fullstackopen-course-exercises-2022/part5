import React from 'react'

function Login(props) {
    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={props.handleLogin}>
                <label htmlFor="username">username</label>
                <input type="text" name="username" value={props.username} onChange={({target}) => props.setUsername(target.value)} /><br />
                <label htmlFor="password">password</label>
                <input type="password" name="password" value={props.password} onChange={({target}) => props.setPassword(target.value)} /><br />
                <input type="submit" value="Login"/>
            </form>
        </div>
    );
}

export default Login;