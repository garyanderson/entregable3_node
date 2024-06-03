const request = require ('supertest');
const app = require ('../app');

let id;

test('GET /directors mostrar todos los directores', async () => { 
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

 test('POST /directors crear director', async () => { 
    const newDirector = {
        firstName: "Steven Allan",
        lastName: "Spielberg",
        nationality: "sidney",
        image: "https://static.wikia.nocookie.net/starwars/images/d/de/Steven_Spielberg.jpg/revision/latest?cb=20060127064420",
        birthday: "1946-12-18"
    }
    const res = await request(app).post('/directors').send(newDirector);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newDirector.name);
 });

 test('PUT /directors/:id debe actualizar el director seleccionado', async () => { 
    const updatedDirector = {
        firstName: "Steven Allan",
        lastName: "Spielberg",
        nationality: "Estados Unidos",
        image: "https://static.wikia.nocookie.net/starwars/images/d/de/Steven_Spielberg.jpg/revision/latest?cb=20060127064420",
        birthday: "1946-12-18",
    }
    const res = await request(app).put('/directors/'+id).send(updatedDirector);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedDirector.name);
  });

 test('DELETE /directors/:id debe eliminar el director seleccionado', async () => {  
    const res = await request(app).delete('/directors/'+id);
    expect(res.status).toBe(204);
 });

 // tb => tobbe
 //tbi => tobe instance
 // tbd => tode defined
 //thl => ToHaveLength