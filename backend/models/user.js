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

    static save(user){
        
        return db.execute(
            'INSERT INTO cheval.User (name, mail, hash) VALUES (?, ?, ?)',
            [user.name, user.email, user.password]
        );
    }
};

