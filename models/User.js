const
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    userSchema = new mongoose.Schema({
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        favorites: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brewery'
        }]
    }, {timestamps: true});

// add a method to a user document object to create hashed password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

// adds a method to user document object to check if provided password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

// middleware: before saving check if password was changed
// if so, encrypt new password before saving
userSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        this.password = this.generateHash(this.password)
    }
    next()
})

const User = mongoose.model("User", userSchema)
module.exports = User