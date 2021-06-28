const express = require('express');

const app = express();
const expressHbs = require('express-handlebars');

const fs = require('fs');
const path = require('path');

const dirname = __dirname;

app.listen(3001, () => {
    console.log('app listen port 3001');
});



app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
app.set('views', path.join(dirname, 'static'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(dirname, 'static')));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/registration', (req, res) => {
    res.render('registration');
});

app.post('/registration', (req, res) => {
    const { login } = req.body;
    const users = getUsers();

    if (users.find((user) => user.login === login)) {
        res.render('err', { errType: 'Login is already taken' });
        return;
    }

    users.push({ ...req.body, userId: Date.now() });

    fs.writeFile(path.join(dirname, 'users', 'users.json'), JSON.stringify(users), (err) => {
        console.log(err);
    });
    res.redirect('login');
});

app.get('/users', (req, res) => {
    const users = getUsers();

    res.render('users', { users });
});

app.get('/users/:userId', (req, res) => {
    const users = getUsers();
    const user = users.find((user) => user.userId === +req.params.userId);
    res.render('user', { user });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { login, password } = req.body;
    const users = getUsers();
    const user = users.find((user) => (user.login === login && user.password === password));

    if (!user) {
        res.render('err', { errType: 'pass or log incorrect' });
        return;
    }
    res.redirect(`users/${user.userId}`);
});

function getUsers() {
    return JSON.parse(fs.readFileSync(path.join(dirname, 'users', 'users.json')).toString());
}
