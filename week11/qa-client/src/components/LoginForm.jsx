import { useState, useEffect } from "react"
import { doLogin, doLogout } from "../api/auth"
import { useNavigate } from "react-router"

function LoginForm(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [errormsg, setErrormsg] = useState('')

    const doSubmit = async (ev) => {
        ev.preventDefault()
        setErrormsg('')
        console.log(username, password)

        try {
        // validations ...
        const user = await doLogin( username, password)
        props.doLogin(user)
        } catch (ex) {
            setErrormsg(ex.message)
        }
    }

    return <div>
        <form onSubmit={doSubmit}>
        {errormsg && <p>{errormsg}</p>}
        <p>Username: <input type='text' name='username' value={username} onChange={(ev)=>setUsername(ev.target.value)}/></p>
        <p>Password: <input type='password' name='password' value={password} onChange={(ev)=>setPassword(ev.target.value)}/></p>
        <p><input type='submit' value='Log In'/></p>
</form>
    </div>
}

function Logout(props) {
    const navigate = useNavigate()

    useEffect( ()=>{
        doLogout().then( () => 
            {
                props.doLogin({ id: undefined, email: undefined, name: undefined })
                navigate('/')
            } )
    }, [] )

    return "Logging out..."

}

export {LoginForm, Logout}