const Sequelize = require("sequelize");
require("dotenv").config();
const{CONNECTION_STRING} = process.env;
const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

function removeDollarSign(string){
    return parseFloat(string.replace("$", ""))
}

module.exports = {
    seed: (req, res) => {
        sequelize.query(
            `
                drop table if exists stocks;
    
                create table stocks (
                    id serial primary key, 
                    company_type varchar(255),
                    company_name varchar(255),
                    yield numeric(5,4),
                    cost numeric(5,2)
                );

                insert into stocks (company_type, company_name, yield, cost)
                values
                ('Finance', 'IBM', .0409, 128.94),
                ('Finance', 'Allstate Corp', .0263, 138.25),
                ('Finance', 'Metlife', .0317, 66.40),
                ('Finance', 'Progressive Corp', .0026, 157.68),
                ('Finance', 'New Mountain Finance Corporation', .0986, 12.79),
                ('Finance', 'Horizon Technology Finance', .1026, 13.23),
                ('Finance', 'Logan Ridge Finance', .0553, 23.20),
                ('Finance', 'Willis Lease Finance', .00, 52.36),
                ('Finance', 'Wells Fargo', .0316, 70.52),
                ('IT', 'Texas Instruments', .0312, 168.50),
                ('IT', 'Seagate Tech', .0332, 83.90),
                ('IT', 'Paypal', 0.00, 63.01),
                ('IT', 'Park City Group', 0.00, 10.45),
                ('IT', 'Unity Software Inc', 0.00, 39.21),
                ('IT', 'Investors Title Company', .0114, 162.39),
                ('IT', 'Logitech International', .0155, 92.58),
                ('IT', 'Microsoft', .0080, 373.26),
                ('IT', 'Intel', .8398, 46.66),
                ('Energy', 'ExxonMobil', .0365, 102.99),
                ('Energy', 'Marathon Oil', .0179, 24.84),
                ('Energy', 'Phillips 66', .0313, 133.80),
                ('Energy', 'Valero Energy', .0317, 133.60),
                ('Energy', 'Baker Hughes', .0235, 34.07),
                ('Energy', 'U.S energy Corp', .0763, 1.09),
                ('Energy', 'Chesapeake Energy', .0297, 77.28),
                ('Energy', 'Centrus Energy Corp', 0.00, 54.17),
                ('Energy', 'Eversource', .0443, 61.08);

            `
        )
        res.sendStatus(200)
    },
    getStocks:(req, res) => {
        let{type,price} = req.params
        price = price.toString().split("-$")
        priceRange = price.map(e => {
            return removeDollarSign(e)
        })
        console.log(type, priceRange)
        if (priceRange.length === 2){
        sequelize.query(`select * from stocks where cost between ${priceRange[0]} and ${priceRange[1]};`).then(dbRes => {
            res.status(200).send(dbRes[0])
        })
        }else{
            sequelize.query(`select * from stocks where cost > ${priceRange[0]};`).then(dbRes => {
                res.status(200).send(dbRes[0])
            })
        }
    }

}

