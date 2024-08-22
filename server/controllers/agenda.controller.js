const { AgendaModel } = require('../models/agenda.model');

module.exports = {
  getAllAgendas: (req, res) => {
    AgendaModel.find({})
      .then(allAgendas => res.status(200).json({ agendas: allAgendas }))
      .catch(err => res.status(400).json({ message: "Algo salió mal", error: err }));
  },
  getOneAgenda: (req, res) => {
    AgendaModel.findOne({ _id: req.params.id })
      .then(oneSingleAgenda => res.status(200).json({ agenda: oneSingleAgenda }))
      .catch(err => res.status(400).json({ message: "Algo salió mal", error: err }));
  },
  createAgenda: (req, res) => {
    AgendaModel.create(req.body)
      .then(newlyCreatedAgenda => res.status(201).json({ agenda: newlyCreatedAgenda }))
      .catch(err => res.status(400).json({ message: "Algo salió mal", error: err }));
  },
  updateOneAgendaById: (req, res) => {
    AgendaModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(updatedAgenda => res.status(200).json({ agenda: updatedAgenda }))
      .catch(err => res.status(400).json({ message: "Algo salió mal", error: err }));
  },
  deleteOneAgendaById: (req, res) => {
    AgendaModel.deleteOne({ _id: req.params.id })
      .then(result => res.status(200).json({ result: result }))
      .catch(err => res.status(400).json({ message: "Algo salió mal", error: err }));
  }
};