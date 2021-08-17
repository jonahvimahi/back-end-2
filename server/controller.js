const { send } = require('process')
const houses = require('./db.json')

// globalId = 4

module.exports = {
    getAllHouses: (req, res) => {
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        let {address, price, imageURL} = req.body
        let newHouse = {
            id: houses[houses.length-1].id +1,
            price,
            imageURL
        }
        houses.push(newHouse)
        res.status(200).send(houses)     
        // globalId++
    },
    updateHouse: (req, res) => {
        let {id} = req.params
        let {type} = req.body

        let index = houses.findIndex(elem => elem.id === +id)

        if(houses[index].price === 0 && type === 'minus'){
            res.status(400).send("That is too low friend")
        } else if(type === 'plus'){
            houses[index].price += 10000
            res.status(200).send(houses)
        } else if(type === 'minus'){
            houses[index].price -= 10000
            res.status(200).send(houses)
        } else{
            res.status(400).send("something went wrong friend")
        }
    },
    deleteHouse: (req, res) => {
        let index = houses.findIndex(elem => elem.id === +req.params.id)
        houses.splice(index, 1)
        res.status(200).send(houses)

    } 
}
