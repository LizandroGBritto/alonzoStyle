const mongoose = require('mongoose');

const AgendaSchema = new mongoose.Schema({
  Hora: {
    type: String,
    required: [true, "La hora de la cita es requerida"],
    minlength: [3, "La hora debe tener al menos 3 caracteres"]
  },
  NombreCliente: {
    type: String
  },
  NumeroCliente: {
    type: String
  },
  UserId: {
    type: String
  }
}, { timestamps: true });

module.exports.AgendaModel = mongoose.model('Agenda', AgendaSchema);