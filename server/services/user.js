const userModel = require('../models/user')

module.exports.createUser = async ({
    firstname, lastname, email, password, image = ""
}) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        image
    })

    return user;
}