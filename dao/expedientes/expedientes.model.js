const getDb = require("../db");
let db = null;

class Expedientes {
  constructor() {
    getDb()
      .then((database) => {
        db = database;
        if (process.env.MIGRATE === "true") {
          const createStatement =
            "CREATE TABLE IF NOT EXISTS expedientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, fecha TEXT, descripcion TEXT, observaciones TEXT, registros INTEGER, ultimoActualizacion TEXT);";
          db.run(createStatement);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  //Nuevo Registro en la db
  new(
    identidad,
    fecha,
    descripcion,
    observaciones,
    registros,
    ultimoActualizacion
  ) {
    return new Promise((accept, reject) => {
      db.run(
        "INSERT INTO expedientes (identidad, fecha, descripcion, observaciones, registros, ultimoActualizacion) VALUES (?, ?, ?, ?, ?, ?);",
        [
          identidad,
          fecha,
          descripcion,
          observaciones,
          registros,
          ultimoActualizacion,
        ],
        (err, rslt) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          accept(rslt);
        }
      );
    });
  }

  getAll() {
    return new Promise((accept, reject) => {
      db.all("SELECT * FROM expedientes;", (err, rows) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        accept(rows);
      });
    });
  }

  getById(id) {
    return new Promise((accept, reject) => {
      db.run("SELECT * FROM expedientes WHERE id=?;", [id], (err, row) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          accept(row);
        }
      });
    });
  }

  updateOne(
    id,
    identidad,
    fecha,
    descripcion,
    observaciones,
    registros,
    ultimoActualizacion
  ) {
    return new Promise((accept, reject) => {
      const sqlUpdate =
        "UPDATE expedientes SET identidad = ?, fecha = ?, descripcion = ?, observaciones = ?, registros = ?, ultimoActualizacion = ? WHERE id = ?";
      db.run(
        sqlUpdate,
        [
          identidad,
          fecha,
          descripcion,
          observaciones,
          registros,
          ultimoActualizacion,
          id,
        ],
        function (err) {
          if (err) {
            reject(err);
          } else {
            accept(this);
          }
        }
      );
    });
  }

  deleteOne(id) {
    return new Promise((accept, reject) => {
      const sqlDelete = "DELETE FROM expedientes WHERE id = ?";
      db.run(sqlDelete, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          accept(this);
        }
      });
    });
  }
}

module.exports = Expedientes;
