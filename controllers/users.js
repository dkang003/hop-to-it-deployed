const 
    User = require('../models/User.js'),
    signToken = require('../serverAuth').signToken;

module.exports = {
    index: (req,res) => {
        User.find({}, (err, users) => {
            if (err) res.json({ message: "ERROR", payload: null, code: err.code })
            res.json({ message:"SUCCESS", payload: users })
        })
    },
    show: (req,res) => {
        User.findById(req.params.id, (err, user) => {
            if (err) res.json({ message: "ERROR", payload: null, code: err.code })
            res.json({ message: "SUCCESS", payload: user })
            })      
    },
    create: (req, res) => {
        User.create(req.body, (err, newUser) => {
            if (err) res.json({ message: "ERROR", payload: null, code: err.code })
            const token = signToken(newUser)
            res.json({ message: "SUCCESS", token })
        })
    },
    update: (req, res) => {
        User.findById(req.params.id, (err, updatedUser) => {
            if (!req.body.password) delete req.body.password
            Object.assign(updatedUser, req.body)
            updatedUser.save((err, updatedUser) => {
                if (err) res.json({ message: "ERROR", payload: null, code: err.code })
                res.json({ message: "SUCCESS", payload: updatedUser })
            })
        })
    },
    destroy: (req,res) => {
        User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
            if (err) res.json({ message: "ERROR", payload: null, code: err.code })
            res.json({ message: "SUCCESS", payload: deletedUser })
        })
    },
    authenticate: (req,res) => {
        let { email, password } = req.body;
        User.findOne({ email }, (err, authenticatedUser) => {
            if (!authenticatedUser || !authenticatedUser.validPassword(password)) {
                return res.json({ success: false, message: "INVALID CREDENTIALS" })
            }
            const token = signToken(authenticatedUser);
            res.json({ success: true, token })
        })
    }
}