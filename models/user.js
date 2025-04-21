class User {
    
    constructor(id, username, password, isAdmin) {
        this.id = id;
        this.username = username;
        this.password = password; 
        this.isAdmin = isAdmin;
    }
}

const user1 = new User(1, 'admin', 'pass', 'true');
const user2 = new User(2, 'islam', 'pass', 'false');
const user3 = new User(3, 'user3', 'pass', 'false');
const users = [user1, user2, user3];

module.exports = { users, User };

