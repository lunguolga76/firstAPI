const express = require('express')
fs=require('fs');
const myData=require('./myData.json')
const app = express()
const cors = require('cors');
app.use(cors())
const myList = []
// Returns the full list of elements
app.get('/products', (req, res) => {
  res.send(myList);
});

// Adds a new element to the list
app.post('/products', (req, res) => {
  const parameters = req.query;
  if (!parameters.name ||!parameters.description||!parameters.price||!parameters.availability) {
    res.send({ error: 'Could not add element to list' })
  } else {
    myList.push({ name: parameters.name, description: parameters.description, price: parameters.price, availability: parameters.availability})
    fs.writeFileSync('./myData.json', JSON.stringify(myList));
const extractedData = fs.readFileSync('myData.json');
const recoveredObject = JSON.parse(extractedData)
console.log(recoveredObject);
    res.send({ message: "Element has been added" })
  }
})


// Deletes an element based on the ID
app.delete('/products/:elementId', (req, res) => {
  const elementId = req.params.elementId;
  if (myList[elementId] !== undefined) {
    myList.splice(elementId, 1);
    res.send({ message: "Element has been deleted" })
  } else {
    res.send({ error: "Could not find element with such ID" })
  }

})

app.listen(3000)