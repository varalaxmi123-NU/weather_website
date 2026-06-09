const express = require('express');
const axios = require('axios');
const path=require('path');

const app = express();



app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"../views"));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

app.get('/', (request, response) => {
    response.render(
        "index", { weather: null }
    );
});                           //add data from backend to front end-get


app.post('/weather', async (request, response) => {
    try {
        const city = request.body.city;

        const apikey = "bd92f015b03356c8932851ceff0b757e";     //opnewhether map search in google
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

        // https://api.openweathermap.org/data/2.5/weather?q=karkala&appid=bd92f015b03356c8932851ceff0b757e&units=metric`

        const result = await axios.get(url);
        response.render("index", { weather: result.data })



    } catch (error) {
        // response.send(`city not found,${error}`);
        response.render("index",{weather:null,error:error})
    }
})


module.exports=app;
// app.listen(5000, () => {
//     console.log('Running on port 5000')
// });

