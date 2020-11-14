const jwt = require('jsonwebtoken');

class Auth {
    static CreateToken(payload) {
        return new Promise((resolve, reject) => {
            try {
                const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" })
                resolve(token);
            } catch (error) {
                reject(error)
            }
        });
    }

    static CheckToken(token) {
        return new Promise((resolve, reject) => {
            try {
                const decodeToken = jwt.verify(token, process.env.JWT_KEY);
                resolve(decodeToken);
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = Auth;