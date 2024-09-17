const { UserModel } = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: (req, res) => {
        const user = new UserModel(req.body);
        user.save()
            .then(() => {
                res.json({ msg: "success!", user: user });
            })
            .catch(err => res.json(err));
    },
    
    login: (req, res) => {
        // Verifica que los datos recibidos en req.body sean correctos
        console.log("Datos recibidos en el login:", req.body);

        if (!req.body.userName || !req.body.password) {
            return res.status(400).json({ msg: "Username and password are required" });
        }

        UserModel.findOne({ userName: req.body.userName })
            .then(user => {
                if (!user) {
                    console.log("Usuario no encontrado");
                    return res.status(400).json({ msg: "Invalid login attempt" });
                }

                // Compara la contraseña con bcrypt
                bcrypt.compare(req.body.password, user.password)
                    .then(passwordIsValid => {
                        if (!passwordIsValid) {
                            console.log("Contraseña incorrecta");
                            return res.status(400).json({ msg: "Invalid login attempt" });
                        }

                        // Si la contraseña es válida, genera el token JWT
                        const userInfo = {
                            _id: user._id,
                            userName: user.userName
                        };

                        console.log("Usuario encontrado y contraseña válida:", userInfo);

                        const secret = "secretKey";
                        try {
                            const newJWT = jwt.sign(userInfo, secret);
                            res.cookie("usertoken", newJWT, {
                                httpOnly: true,
                                expires: new Date(Date.now() + 900000000),
                            }).json({ msg: "success!", user: userInfo });
                        } catch (error) {
                            console.error("Error generando JWT:", error);
                            return res.status(500).json({ msg: "Error generating token" });
                        }
                    })
                    .catch(err => {
                        console.error("Error comparando contraseñas:", err);
                        return res.status(400).json({ msg: "Invalid login attempt" });
                    });
            })
            .catch(err => {
                console.error("Error buscando usuario:", err);
                return res.status(400).json({ error: err });
            });
    }
};
