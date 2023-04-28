const app = require('../src/app');
const session = require('supertest');
const agent = session(app);

let character = {
    id : 54,
    name : "Ricardo",
    species : "Human",
    gender : "Male",
    status : "Alive",
    origin : "Earth",
    image : "image.png"
}

let access = {
    access : true
}

describe("Test de RUTAS",() => {
    describe('GET /rickandmorty/character/:id',() => {
        it("Responde con status : 200",async () => {
            await agent.get('/rickandmorty/character/1').expect(200);
        });
        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"',async () => {
            const res = await agent.get('/rickandmorty/character/1')
            for (props in character){
                expect(res.body).toHaveProperty(props)
            }
        });
        it('Si hay un error responde con status: 500',async () => {
            const res = await agent.get('/rickandmorty/character/name');
            expect(res.statusCode).toBe(500);
        });
    });
    describe("GET /rickandmorty/login", () => {
        it("Valida que el email y password son correcto", async ()=>{
            const res = await agent.get("/rickandmorty/login?email=chrismai32@gmail.com&password=patito232")
            expect(res.body).toEqual(access)
        });

        it("Valida que el email y password son incorrectos", async () => {
            const res = await agent.get("/rickandmorty/login?email=chrismai34442@gmail.com&password=patito233232")
            access.access = false
            expect(res.body).toEqual(access)
        });
    });

    describe("POST /rickandmorty/fav", () => {
        it("Debe guardar el personaje en favoritos", async() => {
            const res = await agent.post("/rickandmorty/fav").send(character)
            expect(res.body).toContainEqual(character)
        });

        it("Si se agrega un nuevo personaje, debe incluir el personaje previo " , async() => {
            character.id = 45
            character.name = "Martin"
            const res = await agent.post("/rickandmorty/fav").send(character)
            expect(res.body).toContainEqual(character)
        });
    });

    describe("DELETE /rickandmorty/fav/:id", () => {
        it("Si el id que se envia no coincide con ningun personaje, debe devolver el mismo arreglo",async () => {
            const res = await agent.delete("/rickandmorty/fav/999").send(character)
            expect(res.body.length).toBe(2)
        });

        it("Si el id coincide con un personaje, debe eliminarse exitosamente", async () => {
            const res = await agent.delete("/rickandmorty/fav/54").send(character)
            expect(res.body.length).toBe(1)
        })
    })
});
