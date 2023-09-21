const { default: mongoose } = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email Id is already registered"]
    },
    password: {
        type: String,
        required: [true, "Password is requires"]
    }
}, {
    timestamps: true
}
)

module.exports = mongoose.model("User", userSchema);