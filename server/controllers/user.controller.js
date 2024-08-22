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
        UserModel.findOne({ userName: req.body.userName }) // Fixed property name to 'userName'
            .then(user => {
                if (user === null) {
                    res.status(400).json({ msg: "Invalid login attempt" });
                } else {
                    if (req.body.password === undefined) {
                        res.status(400).json({ msg: "Invalid login attempt" });
                    }
                    console.log(req.body);
                    bcrypt
                        .compare(req.body.password, user.password)
                        .then(passwordIsValid => {
                            if (passwordIsValid) {
                                console.log("password is valid: ", passwordIsValid);
                                const userInfo = {
                                    _id: user._id,
                                    userName: user.userName // Fixed property name to 'userName'
                                };
                                console.log("userInfo: ", userInfo);

                                const secret = "secretKey";
                                const newJWT = jwt.sign(userInfo, secret);
                                res
                                    .status(200)
                                    .cookie("usertoken", newJWT, {
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 900000000),
                                    })
                                    .json({ msg: "success!", user: userInfo });
                            } else {
                                res.status(400).json({ msg: "Invalid login attempt" });
                            }
                        })
                        .catch(err => res.status(400).json({ msg: "Invalid login attempt" }));
                }
            })
            .catch(err => res.status(400).json({ error: err }));
    }
}
