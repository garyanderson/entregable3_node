const request = require ('supertest');
const app = require ('../app');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');

let id;

test('GET /movies mostrar todas las peliculas', async () => { 
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

 test('POST /movies crear peliculas', async () => { 
    const newMovie = {
        name: "la prueba perros",
        image: "https://image.isu.pub/190306061426-0b1194bbbf4da593bd4233c95dd97241/jpg/page_1.jpg",
        synopsis: "Truman Burbank, un feliz agente de seguros, cree llevar una vida normal, pero no tiene idea de que las cámaras lo graban las 24 horas y que todo lo que hace se ve en televisión.",
        releaseYear: "1999"
    }
    const res = await request(app).post('/movies').send(newMovie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newMovie.name);
 });

 test('GET /movies/:id debe retornar la pelicula seleccionada', async () => { 
    const res = await request(app).get(`/movies/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.id).toBe(id);
    expect(res.body.name).toBeDefined();
});

 test('PUT /movies/:id debe actualizar la pelicula seleccionada', async () => { 
    const updatedovie = {
        name: "la prueba para editar, perros",
        image: "https://image.isu.pub/190306061426-0b1194bbbf4da593bd4233c95dd97241/jpg/page_1.jpg",
        synopsis: "Truman Burbank, un feliz agente de seguros, cree llevar una vida normal, pero no tiene idea de que las cámaras lo graban las 24 horas y que todo lo que hace se ve en televisión.",
        releaseYear: "1999"
    }
    const res = await request(app).put('/movies/'+id).send(updatedovie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedovie.name);
  });

  test('POST /movies/:id/genres insertar generos en las peliculas', async () => {
    const genre = await Genre.create({
        name: 'melancolia'
    })
    const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([genre.id]);
    await genre.destroy;
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
  });

  test('POST /movies/:id/actors insertar actores en las peliculas', async () => {
    const actor = await Actor.create({
        firstName: 'Chen ', 
        lastName: 'Gang Sheng',
        nationality: 'Hong Kong', 
        image: 'https://e.rpp-noticias.io/xlarge/2020/10/20/171317_1012190.png', 
        birthday: '1954-04-07'
    })
    const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([actor.id]);
    await actor.destroy;
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
  });

  test('POST /movies/:id/diectors insertar directores en las peliculas', async () => {
    const director = await Director.create({
        firstName: "Steven Allan",
        lastName: "Spielberg",
        nationality: "sidney",
        image: "https://static.wikia.nocookie.net/starwars/images/d/de/Steven_Spielberg.jpg/revision/latest?cb=20060127064420",
        birthday: "1946-12-18"
    })
    const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
    await director.destroy;
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
  });

 test('DELETE /movies/:id debe eliminar la pelicula seleccionada', async () => {  
    const res = await request(app).delete('/movies/'+id);
    expect(res.status).toBe(204);
 });
 

 // tb => tobbe
 //tbi => tobe instance
 // tbd => tode defined
 //thl => ToHaveLength