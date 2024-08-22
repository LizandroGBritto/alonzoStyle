const express = require("express");
const {authenticate} = require("../config/jwt.config");

const AgendaController = require("../controllers/agenda.controller");
const AgendaRouter = express.Router();

AgendaRouter.get("/", AgendaController.getAllAgendas);

AgendaRouter.get("/:id", authenticate, AgendaController.getOneAgenda);

AgendaRouter.post("/new", AgendaController.createAgenda);

AgendaRouter.put("/:id", authenticate, AgendaController.updateOneAgendaById);

AgendaRouter.delete("/:id", authenticate, AgendaController.deleteOneAgendaById);

module.exports = AgendaRouter;