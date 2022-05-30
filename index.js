const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json()) // get the body in json

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/books/insertbooks', (req, res) => {

    const title = req.body.title
    const infautor = req.body.infautor
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO books (title, infautor, pageqty) VALUES ('${title}','${infautor}','${pageqty}')`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }

        res.redirect('/books')
    })

})


app.get('/books', (req, res) => {
    const sql = "SELECT * FROM books"

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const books = data

        console.log(books)
        
        res.render('books', {books})
    })
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "password",
    database: 'dbdocker'
})

conn.connect(function (err) {
    if (err) {
        console.log(err)
    }

    console.log('Connected in mysql')

    app.listen(3000)
})