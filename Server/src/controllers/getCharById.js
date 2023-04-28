const axios = require("axios")


const URL = "https://rickandmortyapi.com/api/character/"

const getCharById = async (req, res) => {
    try
    {
        const { id } = req.params;
        const {data} = await axios(URL + id)
            if (data) {
                let character = {
                id : data.id,
                name : data.name,
                status : data.status,
                species : data.species,
                origin : data.origin.name,
                image : data.image,
                gender : data.gender
            };
        return res.status(200).json(character)
        }
        else {
            return res.status(404).send("Not fount");
        }}
        catch(error){
            return res.status(500).send("Para flaco, enviaste cualquiera")
        }
}

module.exports = getCharById


































// const axios = require("axios")
// const http = require("http")

// const getCharById = ( response , id) => {
//     axios(`https://rickandmortyapi.com/api/character/${id}`)
//     .then(res => res.data)
//     .then(res => { 
//         let character = {
//             id : res.id,
//             name : res.name,
//             gender : res.gender,
//             species : res.species,
//             origin : res.origin.name,
//             image : res.image
//         }
//         return response
//         .writeHead(200,{"Content-Type" : "application/json"})
//         .end(JSON.stringify(character)) })
    
//     .catch(error => {return response.writeHead(500,{"Content-Type" : "text/plain"}).end(error)})
// }

// module.exports = getCharById


