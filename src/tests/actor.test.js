const request = require ('supertest');
const app = require ('../app');

let id;

test('GET /actors mostrar todos los actores', async () => { 
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

 test('POST /actors crear actor', async () => { 
    const newActor = {
        firstName: 'Chen ', 
        lastName: 'Gang Sheng',
        nationality: 'Hong Kong', 
        image: 'https://e.rpp-noticias.io/xlarge/2020/10/20/171317_1012190.png', 
        birthday: '1954-04-07'
    }
    const res = await request(app).post('/actors').send(newActor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newActor.name);
 });

 test('GET /actors/:id debe retornar el actor seleccionado', async () => { 
   const res = await request(app).get(`/actors/${id}`);
   expect(res.status).toBe(200);
   expect(res.body).toBeDefined();
   expect(res.body.id).toBe(id);
});

 test('PUT /actors/:id debe actualizar el actor seleccionado', async () => { 
    const updatedActor = {
        firstName: 'Chen ', 
        lastName: 'Gang Sheng (yakie chan)',
        nationality: 'Hong Kong', 
        image: 'https://e.rpp-noticias.io/xlarge/2020/10/20/171317_1012190.png', 
        birthday: '1954-04-07'
    }
    const res = await request(app).put('/actors/'+id).send(updatedActor);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedActor.name);
  });

 test('DELETE /actors/:id debe eliminar el actor seleccionado', async () => {  
    const res = await request(app).delete('/actors/'+id);
    expect(res.status).toBe(204);
 });

 // tb => tobbe
 //tbi => tobe instance
 // tbd => tode defined
 //thl => ToHaveLength