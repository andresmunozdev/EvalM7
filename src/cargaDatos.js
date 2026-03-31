require('dotenv').config();
const { Personaje, Habilidad, PersonajeHabilidad, sequelize } = require('./models');

const seed = async () => {
    try {
        console.log('Iniciando seed de datos...');

        // Limpiar datos existentes (CUIDADO: esto borra todo)
        // Descomenta esto solo si quieres empezar de cero
        // await sequelize.truncate({ cascade: true });

        // ==================
        // CREAR HABILIDADES
        // ==================
        const habilidades = await Habilidad.bulkCreate([
        {
            nombre: 'Física Teórica',
            descripcion: 'Especialidad en física teórica y relatividad',
            categoria: 'Científica'
        },
        {
            nombre: 'Física Experimental',
            descripcion: 'Realización de experimentos y laboratorios',
            categoria: 'Científica'
        },
        {
            nombre: 'Astrofísica',
            descripcion: 'Estudio de estrellas, galaxias y fenómenos cósmicos',
            categoria: 'Científica'
        },
        {
            nombre: 'Ingeniería Aeroespacial',
            descripcion: 'Diseño y construcción de sistemas aeroespaciales',
            categoria: 'Técnica'
        },
        {
            nombre: 'Microbiología',
            descripcion: 'Estudio de microorganismos',
            categoria: 'Científica'
        },
        {
            nombre: 'Neurobiología',
            descripcion: 'Estudio del cerebro y sistema nervioso',
            categoria: 'Científica'
        },
        {
            nombre: 'Humor y Entretenimiento',
            descripcion: 'Capacidad para hacer bromas y entretener',
            categoria: 'Entretenimiento'
        },
        {
            nombre: 'Trivia y Cultura General',
            descripcion: 'Conocimiento amplio de datos curiosos y cultura',
            categoria: 'Entretenimiento'
        },
        {
            nombre: 'Videosjuegos',
            descripcion: 'Experto en videojuegos y estrategia',
            categoria: 'Entretenimiento'
        },
        {
            nombre: 'Comunicación Social',
            descripcion: 'Habilidad para interactuar socialmente',
            categoria: 'Social'
        }
        ], { validate: false });

        console.log(`${habilidades.length} habilidades creadas`);

        // ==================
        // CREAR PERSONAJES
        // ==================
        const personajes = await Personaje.bulkCreate([
        {
            nombre: 'Sheldon Cooper',
            actor: 'Jim Parsons',
            edad: 40,
            ocupacion: 'Físico teórico',
            estado: 'Activo',
            fraseIconica: 'Bazinga!',
            grupo: 'Amigos'
        },
        {
            nombre: 'Leonard Hofstadter',
            actor: 'Johnny Galecki',
            edad: 38,
            ocupacion: 'Físico experimental',
            estado: 'Activo',
            fraseIconica: 'Our babies will be smart and beautiful.',
            grupo: 'Amigos'
        },
        {
            nombre: 'Penny',
            actor: 'Kaley Cuoco',
            edad: 35,
            ocupacion: 'Actriz / Vendedora farmacéutica',
            estado: 'Activo',
            fraseIconica: 'Sweetie...',
            grupo: 'Amigos'
        },
        {
            nombre: 'Howard Wolowitz',
            actor: 'Simon Helberg',
            edad: 37,
            ocupacion: 'Ingeniero aeroespacial',
            estado: 'Activo',
            fraseIconica: "I'm an astronaut!",
            grupo: 'Amigos'
        },
        {
            nombre: 'Rajesh Koothrappali',
            actor: 'Kunal Nayyar',
            edad: 36,
            ocupacion: 'Astrofísico',
            estado: 'Activo',
            fraseIconica: "I can't talk to women unless I'm drunk.",
            grupo: 'Amigos'
        },
        {
            nombre: 'Amy Farrah Fowler',
            actor: 'Mayim Bialik',
            edad: 38,
            ocupacion: 'Neurobióloga',
            estado: 'Activo',
            fraseIconica: "I'm a neurobiologist.",
            grupo: 'Pareja de Sheldon'
        },
        {
            nombre: 'Bernadette Rostenkowski',
            actor: 'Melissa Rauch',
            edad: 34,
            ocupacion: 'Microbióloga',
            estado: 'Activo',
            fraseIconica: 'I am not cute, I\'m deadly.',
            grupo: 'Pareja de Howard'
        }
        ], { validate: false });

        console.log(` ${personajes.length} personajes creados`);

        // ==================
        // ASIGNAR HABILIDADES A PERSONAJES
        // ==================
        const asignaciones = [
        // Sheldon
        { personajeId: personajes[0].id, habilidadId: habilidades[0].id, nivelDominio: 'Experto' }, // Física Teórica
        { personajeId: personajes[0].id, habilidadId: habilidades[7].id, nivelDominio: 'Experto' }, // Trivia
        { personajeId: personajes[0].id, habilidadId: habilidades[8].id, nivelDominio: 'Avanzado' }, // Videojuegos

        // Leonard
        { personajeId: personajes[1].id, habilidadId: habilidades[1].id, nivelDominio: 'Experto' }, // Física Experimental
        { personajeId: personajes[1].id, habilidadId: habilidades[0].id, nivelDominio: 'Avanzado' }, // Física Teórica

        // Penny
        { personajeId: personajes[2].id, habilidadId: habilidades[6].id, nivelDominio: 'Experto' }, // Humor
        { personajeId: personajes[2].id, habilidadId: habilidades[9].id, nivelDominio: 'Experto' }, // Comunicación Social

        // Howard
        { personajeId: personajes[3].id, habilidadId: habilidades[3].id, nivelDominio: 'Experto' }, // Ingeniería Aeroespacial
        { personajeId: personajes[3].id, habilidadId: habilidades[6].id, nivelDominio: 'Avanzado' }, // Humor

        // Raj
        { personajeId: personajes[4].id, habilidadId: habilidades[2].id, nivelDominio: 'Experto' }, // Astrofísica
        { personajeId: personajes[4].id, habilidadId: habilidades[7].id, nivelDominio: 'Avanzado' }, // Trivia

        // Amy
        { personajeId: personajes[5].id, habilidadId: habilidades[5].id, nivelDominio: 'Experto' }, // Neurobiología
        { personajeId: personajes[5].id, habilidadId: habilidades[0].id, nivelDominio: 'Avanzado' }, // Física Teórica

        // Bernadette
        { personajeId: personajes[6].id, habilidadId: habilidades[4].id, nivelDominio: 'Experto' }, // Microbiología
        { personajeId: personajes[6].id, habilidadId: habilidades[6].id, nivelDominio: 'Avanzado' } // Humor
        ];

        await PersonajeHabilidad.bulkCreate(asignaciones);
        console.log(` ${asignaciones.length} relaciones personaje-habilidad creadas`);

        console.log('\n ¡Seed completado exitosamente!');
        process.exit(0);
    } catch (error) {
        console.error(' Error en el seed:', error);
        process.exit(1);
    }
};

seed();