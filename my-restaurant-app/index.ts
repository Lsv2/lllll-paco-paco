const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const requestIp = require('request-ip');
const axios = require('axios');



// Create express app
const app = express();
const port = 3000;


// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: { rejectUnauthorized: false }
});

app.use(express.json())
app.use(requestIp.mw());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,SET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

process.on('SIGINT', function () {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

app.set("view engine", "ejs");

//---------------Getting Options---------------//


app.get('/menu_items', (req, res) => {
    pool
        .query('SELECT * FROM menu_item')
        .then((query_res) => {
            if (query_res.rows.length === 0) {
                res.status(404).json({ error: 'No menu items found' });
            }
            else {
                res.json(query_res.rows);
            }
        })
        .catch((error) => {
            console.error('Error executing the SQL query:', error);
            res.status(500).json({ error: error.message });
        });
});

app.get('/ingredients', (req, res) => {
    pool
        .query('SELECT * FROM ingredients')
        .then((query_res) => {
            if (query_res.rows.length === 0) {
                res.status(404).json({ error: 'No menu items found' });
            }
            else {
                res.json(query_res.rows);
            }
        })
        .catch((error) => {
            console.error('Error executing the SQL query:', error);
            res.status(500).json({ error: error.message });
        });
});

app.get('/drinks', (req, res) => {
    pool
        .query('SELECT * FROM drinks')
        .then((query_res) => {
            if (query_res.rows.length === 0) {
                res.status(404).json({ error: 'No menu items found' });
            }
            else {
                res.json(query_res.rows);
            }
        })
        .catch((error) => {
            console.error('Error executing the SQL query:', error);
            res.status(500).json({ error: error.message });
        });
});


app.get('/menu_item_ingredients', (req, res) => {
    pool
        .query('SELECT menu_item.id as item_id, ingredients.name_ing, ingredients.id, ingredients.add_on_price,ingredients.stock, ingredients.valid_add_on FROM menu_item JOIN menu_item_ingredient ON (menu_item.id = menu_item_ingredient.menu_id) JOIN ingredients ON (menu_item_ingredient.ingredient_id = ingredients.id) LIMIT 100')
        .then((query_res) => {
            if (query_res.rows.length === 0) {
                res.status(404).json({ error: 'No menu items found' });
            } 
            else {
                res.json(query_res.rows);
            }
        })
        .catch((error) => {
            console.error('Error executing the SQL query:', error);
            res.status(500).json({ error: error.message });
        });
});

//---------------Creating Options---------------//


app.post('/new_menu_option', (req,res) => {
    const {name, price, calories, ingredients} = req.body;
    console.log(req.body);
    pool
        .query("SELECT new_menu_option($1, $2, $3, $4)",[name, parseFloat(price), parseFloat(calories), ingredients])  
        .then(response => {
            res.status(200).send(response);
        })
})


app.post('/new_add_on', (req,res) => {
    const {name, stock, price, minStock, addOn} = req.body;
    console.log(req.body);
    pool
        .query("SELECT new_ingredient($1, $2, $3, $4, $5)",[name, Number(stock), parseFloat(price), Number(minStock), addOn])  

  
        .then(response => {
            res.status(200).send(response);
        })
})

app.post('/new_drink', (req, res) => {
    const { size, price } = req.body;
    console.log(req.body);
    pool
        .query("SELECT new_drink_size($1, $2)", [size, parseFloat(price)])
        .then(response => {
            res.status(200).send(response);
        })
})



app.post('/new_order', async (req, res) => {
    pool 

    const {cartItemNames,drinkNames, addOns, removedItems } = req.body;

    console.log(cartItemNames,drinkNames, addOns, removedItems)
    let orderId;
    
    const orderIdQuery = "SELECT new_order(1)"
    try{
        const client = await pool.connect();
        const result = await client.query(orderIdQuery)
        orderId = result.rows[0].new_order
        const result2 = await client.query("SELECT complete_order($1, $2, $3, $4, $5)", [orderId, cartItemNames, drinkNames, addOns, removedItems]);
        res.json({orderId: orderId})
    }
    catch(error){
        console.error("Error creating new order", error)
        res.status(500).json({error: error.message})
    }
})


//order id string array menu items string array drink items string array add ons
//---------------Deleting Options---------------//

app.delete('/delete_drink', (req, res) => {
    const { name } = req.body;
    console.log(req.body);
    pool
        .query("SELECT delete_drink($1)", [name])
        .then(response => {
            res.status(200).send(response);
        })
})

app.delete('/delete_menu_item', (req, res) => {
    const { name } = req.body;
    console.log(req.body);
    pool
        .query("SELECT delete_menu_item($1)", [name])
        .then(response => {
            res.status(200).send(response);
        })
})

app.delete('/delete_ingredient', (req, res) => {
    const { name } = req.body;
    console.log(req.body);
    pool
        .query("SELECT delete_ingredient($1)", [name])
        .then(response => {
            res.status(200).send(response);
        })
})

//---------------Update Options---------------//
app.put('/change_stock', (req, res) => {
    const { name, stock } = req.body;
    console.log(req.body);
    pool
        .query("SELECT update_stock($1,$2)", [name, Number(stock)])
        .then(response => {
            res.status(200).send(response);
        })
})

<
app.put('/change_price', (req,res) => {
    const {name, price} = req.body;
    const queryPrompt = "UPDATE menu_item SET price = " + price + " WHERE name = " + "\'" + name + "\'";
    console.log(queryPrompt);
    pool
        .query(queryPrompt)
        .then(response => {
            res.status(200).send(response);
        })
})


//---------------Getting Tables---------------//
// Format: select sales_report('2023-06-13', '2023-07-13');
app.put('/sales_report', (req, res) => {
    const {strDate, enDate} = req.body;
    const queryPrompt = "select * from sales_report(" + "\'" + strDate + "\'" + "," + "\'" + enDate + "\'" + ")";
    console.log(req.body);
    pool
        .query(queryPrompt)
        .then(response => {
            console.log(response);
            res.json(response.rows);
        })  
});

app.put('/excess_report', (req, res) => {
    const {strDate, enDate} = req.body;
    const queryPrompt = "select * from excess_report(" + "\'" + strDate + "\'" + "," + "\'" + enDate + "\'" + ")";
    console.log(req.body);
    pool
        .query(queryPrompt)
        .then(response => {
            console.log(response);
            res.json(response.rows);
        })  
});

app.put('/sells_together', (req, res) => {
    const {strDate, enDate} = req.body;
    const queryPrompt = "select * from sells_together(" + "\'" + strDate + "\'" + "," + "\'" + enDate + "\'" + ")";
    console.log(req.body);
    pool
        .query(queryPrompt)
        .then(response => {
            console.log(response);
            res.json(response.rows);
        })  
});



//---------------Temperature option---------------//
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

// Function to fetch temperature based on IP address
async function getTemperatureByIP(ipAddress) {
    try {
      // Fetch location information based on IP address
      console.log('Client IP Address:', ipAddress);
      const locationResponse = await axios.get(`http://ip-api.com/json/${ipAddress}`);
      const { city, country } = locationResponse.data;

      // Fetch weather information based on location
      const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`);
      const { main: { temp } } = weatherResponse.data;
  
      return temp;
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      throw new Error('Failed to fetch weather data');
    }
  }
  
  app.get('/temperature', async (req, res) => {
    let ipAddress = req.ip || req.connection.remoteAddress;
    if(ipAddress === '::1' || ipAddress === '127.0.0.1' || ipAddress === '::ffff:127.0.0.1') {
        // Use public IP address of the server if the client IP address is localhost
        ipAddress = '64.189.25.40';
    }
    console.log('Client IP Address:', ipAddress);
  
    try {
      const temperature = await getTemperatureByIP(ipAddress);
      res.json({ temperature });
    } catch (error) {
      console.error('Failed to fetch temperature:', error);
      res.status(500).json({ error: error.message });
    }
  });


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
