const user = require("../utils/users")


const login = (req, res) => {
    const { email, password } = req.query;
    let sendResponse = false
    for(let i = 0; i < user.length; i++){
        if(email===user[i].email&&password===user[i].password){
            sendResponse=true          
        }
    }
    if(sendResponse)return res.status(200).json({access : true})
    return res.status(200).json({access : false})

}


module.exports = login;