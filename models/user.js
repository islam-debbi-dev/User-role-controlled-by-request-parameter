class User {
    
    // Constructor to initialize user object
    constructor(id, username, password, isAdmin) {
        this.id = id;
        this.username = username;
        this.password = password; 
        this.isAdmin = isAdmin; // Changed role to isAdmin as a boolean
    }
}

module.exports = User;
