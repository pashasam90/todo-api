const User = require('../models/user');

async function register (req, res) {
    const body = req.body;

    try {
        const newUser = await User.create({email: body.email, password: body.password});
        const userStatus = await User.findById(newUser._id).select('-password');
        res.status(201).json(userStatus);
    } catch (err){
        if (err.code === 11000) return res.status(400).json({error: "Такой email уже зарегистрирован"});
        return res.status(500).json({ error: "Ошибка сервера" });
    }
}

async function userLogIn (req, res) {
    const {email, password} = req.body;
    try{
        const userEmail = await User.findOne({email: email});
        if (!userEmail) {
            return res.status(401).json("Неверный логин или пароль");
        } else {
            if (userEmail.password === password) {
                const userWithoutPassword = userEmail.toObject();
                delete userWithoutPassword.password;
                return res.status(200).json(userWithoutPassword);
            } else {
                return res.status(401).json("Неверный логин или пароль");
            }
        }
    } catch (err) {
        return res.status(500).json({ error: "Ошибка сервера" });
    }
}

module.exports = {register, userLogIn};