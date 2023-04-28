import { useState } from "react"
import validate from "./validation"

const Form = (props) => {

const [userData , setUserData] = useState({
    email : "",
    password : "",
})

const [errors , setErrors] = useState({
    email : "",
    password : "",
})

const handleChange = (event) => {
setUserData({
    ...userData,
    [event.target.name] : 
    event.target.value
})
validate ({...userData,
    [event.target.name] : 
    event.target.value},errors, setErrors)
}

const handleSumbit = (event) => {
event.preventDefault()
props.login(userData)
}



    return (
        <form onSubmit={handleSumbit}>
            <label htmlFor="">EMAIL</label>
            <br />
            <input name="email" type="email" value={userData.email} onChange={handleChange}/>
            <p>{errors.email}</p>
            <br/>
            <label htmlFor="password">PASSWORD</label>
            <br></br>
            <input type="password" name = "password" value={userData.password} onChange = {handleChange}/>
            <p>{errors.password}</p>
            <br/>
            <button type="sumbit">Enviar</button>

        </form>
    )
}


export default Form