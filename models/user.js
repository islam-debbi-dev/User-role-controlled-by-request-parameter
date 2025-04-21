class User {
    
    constructor(id, username, password, isAdmin) {
        this.id = id;
        this.username = username;
        this.password = password; 
        this.isAdmin = isAdmin;
    }
}

const user1 = new User(1, 'admin', 'adminp', 'true');
const user2 = new User(2, 'islam', 'islamp', 'false');
const user3 = new User(3, 'user3', 'user3p', 'false');
const users = [user1, user2, user3];

module.exports = { users, User };

