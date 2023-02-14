const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const addDatafromJson = require('./db/importDb');
const app = express();
const port = 20619;


const routes = require('./routes');
app.use(express.static(path.join(__dirname, 'public')));


app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());


app.engine('hbs', handlebars.engine(
    {extname: '.hbs', helpers: {
        isActive: (pageIndex, pageActive) => {
            return parseInt(pageIndex) === parseInt(pageActive)
        }
    }}
));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.set('trust proxy', 1) // trust first proxy
app.use(
    session({
        secret: "manhtuong",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);


//nơi import file có thể thay thế 2 đường dẫn này
const movies = require('./jsons/movies.json')
const casts = require('./jsons/casts.json')

//hàm thêm data từ file json thành bảng trong sql
addDatafromJson(movies, casts)

routes(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});