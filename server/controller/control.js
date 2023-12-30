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
                ('Finance', 'IBM', .0409, 12.79),
                ('Finance', 'IBM', .0409, 52.36),
                ('Finance', 'IBM', .0409, 128.94),
                ('Finance', 'IBM', .0409, 128.94);

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

