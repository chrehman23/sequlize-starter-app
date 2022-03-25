const express = require("express");
const app = express();
require("./models");
const PORT = process.env.PORT || 9090;
const cors = require('cors');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));
// routers

const apiRoutes = require("./routes/api");

app.use('/api', apiRoutes);


app.get('*', (req, res) => {
    res.status(404).json({
        Error: true,
        msg: 'Url not valid.',
    })
})

app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`);
});