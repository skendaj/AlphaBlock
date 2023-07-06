const UserController = require('../controllers/user.controller');  

module.exports = (app) => {
    app.post("/api/register", UserController.register);
    app.get('/api/user',  UserController.findAllUsers);
    app.get('/api/user/:id', UserController.getUser);
    app.post("/api/login", UserController.login);
    app.post("/api/logout", UserController.logout);
    app.patch('/api/user/edit/:id', UserController.updateUser);
    app.delete('/api/user/:id', UserController.deleteUser);
    app.post("/api/buycoin/:id", UserController.buyCoin);
}
