"use strict";

const cars = [
  {
    id: 1,
    brand: "Seat",
    model: "Iniza",
    year: 2019,
    engine: "Diesel",
    cv: 60,
  },
  {
    id: 2,
    brand: "Seat",
    model: "Toledo",
    year: 1999,
    engine: "Diesel",
    cv: 120,
  },
  {
    id: 3,
    brand: "Fiat",
    model: "Panda",
    year: 2016,
    engine: "Gasolina",
    cv: 90,
  },
];

function findAllCars() {
  // const sql = 'SELECT * FROM cars';
  return cars;
}

function findCarById(id) {
  // const sql = 'SELECT * FROM cars where id = id'
  return cars.find((car) => car.id === +id);
}

module.exports = {
  findAllCars,
  findCarById,
};
