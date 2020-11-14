const bcrypt = require('bcryptjs');

class EncPass {
    static EncryptePass(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 11).then(hashedPassword => {
                resolve(hashedPassword);
            }).catch(error => {
                reject(error);
            })
        })
    }

    static ComparePasswords(password, hashedPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hashedPassword).then(same => {
                if (same) {
                    resolve(true)
                } else {
                    reject(false)
                }
            })
        })
    }
}

module.exports = EncPass;