const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () =>
{
    console.log("Database connected");
});


const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async ()=>{
    await Campground.deleteMany({});
    for(let iterator = 0; iterator < 300; iterator ++)
    {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10 ;
        const camp = new Campground(
            {
                author:'619b49e3af44cd6d48b8a3b7',
                location: `${cities[random1000].city},${cities[random1000].state}`,
                title: `${sample(descriptors)} ${sample(places)}`,
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam numquam corporis, repudiandae temporibus doloribus quia quis mollitia sint nobis saepe omnis consectetur nesciunt corrupti voluptatum qui enim itaque asperiores quasi!',
                price: price,
                geometry :{ 
                    type : "Point", 
                    coordinates :
                    [
                        cities[random1000].longitude,
                        cities[random1000].latitude
                    ]
                 },
                images: [
                    {
                      url: 'https://images.unsplash.com/photo-1560065569-fc53b0b6b94e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
                      filename: 'YelpCamp/pe6hlynwtkzntyeqvkee'
                    },
                    {
                      url: 'https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
                      filename: 'YelpCamp/rifqypxm3kjvg2xfhtf6'
                    }
                  ]                  
            }
        )
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})