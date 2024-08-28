const express = require("express");
const {authenticate} = require("../config/jwt.config");

const AgendaController = require("../controllers/agenda.controller");
const AgendaRouter = express.Router();

AgendaRouter.get("/", AgendaController.getAllAgendas);

AgendaRouter.get("/:id", AgendaController.getOneAgenda);

AgendaRouter.post("/new", AgendaController.createAgenda);

AgendaRouter.put("/:id", AgendaController.updateOneAgendaById);

AgendaRouter.delete("/:id", AgendaController.deleteOneAgendaById);

module.exports = AgendaRouter;