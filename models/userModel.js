const MongoUtil = require('../MongoUtil');
let db = MongoUtil.getDB();
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt.js');

createUser = async (username, email, password) => {
    let salt = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(password, salt);
    let result = await db.collection('users').insertOne({
        username, email, password
    })
    return result.insertedId;
}

findUserByEmail = async (email) => {
    let user = await db.collection('users').findOne({
        'email': email
    })
    return user;
}

findUserById = async (id) => {
    let user = await db.collection('users').findOne({
        '_id': ObjectId(id)
    })
    return user;
}

module.exports = { createUser, findUserByEmail, findUserById }