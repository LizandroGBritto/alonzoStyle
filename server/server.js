const {PORT} = require("./config/settings");
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());
const corsOptions = {
    credentials: true,
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require("./config/mongoose.config");
const AgendaRouter = require("./routes/agenda.route");
app.use("/api/agenda", AgendaRouter);

const UserRouter = require("./routes/user.route");
app.use("/api/auth", UserRouter);

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); } );