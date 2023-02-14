const User = require('../models/user.m')
const bcrypt = require('bcrypt');

class authController{
      //[GET]: /login
    showLogin(req, res, next){
        res.render('user/login');
    }

    //[GET]: /register
    showRegister(req, res, next){
        res.render('user/register');
    }
    //[POST]: /login
    async login(req, res, next){
        const {username , password} = req.body;
        let errors = [];

        if(!username || !password){
            errors.push({ message: "Please enter all fields" });
        }

        if(errors > 0){
            return res.render('user/login', {errors, username, password})
        }else{
            const user = await User.getUserByName(username);
            if(!user){
                errors.push({ message: "Username not found" });
                return res.render('user/login', {errors, username, password});
            }
            
            const validPassword = await bcrypt.compare(password, user.password);
            if(!validPassword){
                errors.push({ message: "Username or password not true" });
                return res.render('user/login', {errors, username, password});
            }

            req.session.regenerate(function (err) {
                if (err) next(err)
            
                // store user information in session, typically a user id
                req.session.user = {
                    ...user,
                };

                // save the session before redirection to ensure page
                // load does not happen before session is saved
                req.session.save(function (err) {
                    if (err) return next(err)
                    res.redirect('/')
                })
            })
        }
    }

    //[POST]: /register
    async register(req, res, next){
        const {username, password, confirmPassword} = req.body;
        let errors = [];
        if(!username || !password ||!confirmPassword){
            errors.push({ message: "Please enter all fields" });
        }

        if (password.length < 6) {
            errors.push({ message: "Password must be a least 6 characters long" });
        }

        if(password !== confirmPassword){
            errors.push({message: "Confirm password is not correct"})
        }

        if(errors.length > 0){
            return res.render('user/register', {errors, username, password, confirmPassword});
        }
        else{
            const existsUsername = await User.getUserByName(username);
            if(existsUsername){
                errors.push({message: "User already registered"})
                return res.render('user/register', {errors, username, password, confirmPassword})
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const number = await User.getMaxID();
            const user = await User.addUser({
                uid: number.max + 1,
                username,
                password: hashedPassword,
            })
            res.redirect('/user/login')
        }
    }

    //[GET]: /logout
    logout(req, res, next){
        req.session.destroy();
        res.redirect('/user/login');
    }
}

module.exports = new authController();