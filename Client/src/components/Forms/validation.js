let regeaxEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

let regeaxPassword = /\d/;

const validate = (userData , errors, setErrors) => {
    if(userData.email === ""){
        setErrors({...errors, email : "Por favor ingrese un email" }) 
    }
    else if (userData.email.length > 35) {
        setErrors ({...errors, email : "Su email supera los 35 caracteres"})
    }
    else if(!regeaxEmail.test(userData.email)){
        setErrors ({...errors,email : "Por favor ingrese un email valido"})
    }
    else setErrors({
        ...errors, email : ""
    })

    if (userData.password.length > 6 && userData.password.length < 10){
        setErrors({...errors, password : "La contraseña debe tener entre 6 a 10 caracteres"})
    }
    else if (!regeaxPassword.test(userData.password)){
        setErrors({...errors, password : "Su contraseña debe tener al menos un numero"})
    }
    else {
        setErrors({...errors , password : ""})
    }
}


export default validate