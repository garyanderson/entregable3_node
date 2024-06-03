const request = require ('supertest');
const app = require ('../app');

let id;

test('GET /genres mostrar todos los generos', async () => { 
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

 test('POST /genres crear genero', async () => { 
    const newGenre = {
        name: 'tragicomedia'
    }
    const res = await request(app).post('/genres').send(newGenre);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newGenre.name);
 });

 test('PUT /genres/:id debe actualizar el genero seleccionado', async () => { 
    const updatedGenre = {
        name: 'genios'
    }
    const res = await request(app).put('/genres/'+id).send(updatedGenre);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedGenre.name);
  });

 test('DELETE /genres/:id debe eliminar el genero seleccionado', async () => {  
    const res = await request(app).delete('/genres/'+id);
    expect(res.status).toBe(204);
 });

 // tb => tobbe
 //tbi => tobe instance
 // tbd => tode defined
 //thl => ToHaveLength