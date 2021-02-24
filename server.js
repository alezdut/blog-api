const express = require('express');
const app = express();
const db = require('./models');
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require('./routes/routes');
app.use('/', routes);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('listening at 3000')
    })
})