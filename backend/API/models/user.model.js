module.exports = (mongoose) => {
    var schema = mongoose.Schema(
        {
            id: String,
            username: String,
            discriminator: String,
            email: String
        },
        { timestamps: true }
    );

    const User = mongoose.model('user', schema);
    return User;
};
