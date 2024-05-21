const db = require('../util/database');

module.exports = class User {
    constructor(name, email, password){
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static find(email){
        return db.execute('SELECT * FROM cheval.User WHERE mail = ?', [email]);
    }

    static getUserByUsername(username){
        return db.execute('SELECT * FROM cheval.User WHERE userName = ?', [username]);
    }

    static save(user){
        
        return db.execute(
            'INSERT INTO cheval.User (userName, mail, hash) VALUES (?, ?, ?)',
            [user.name, user.email, user.password]
        );
    }

    static isAdmin(id){
        const administrator =  db.execute(
            'SELECT isAdmin FROM cheval.User WHERE idUser = ?', [id]
        );
        return administrator;
    }
};


