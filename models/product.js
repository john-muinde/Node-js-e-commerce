
const fs = require('fs');
const path = require('path');
const dirName = require('../util/path');
const p = path.join(dirName,'data','products.json');

const getProductsFromFile = cb =>{
    fs.readFile(p,(err,fileContent)=>{
      if(err){
        return cb([])
      }
      cb(JSON.parse(fileContent));
    })
  }

module.exports = class Product {
  constructor(title,description, imageUrl, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
  save() {
    this.id = Math.random().toString();
    getProductsFromFile(products =>{
      products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) =>{
            console.log(err);
        });
    });
  }
  delete() {
    var filtered = products.filter((ele) => {
      return ele != this;
    });
    fs.delete()
    products = filtered;
  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
};
static findById(id, cb){
  getProductsFromFile(products =>{
    const product = products.find(p=> p.id === id)
    cb(product);
  })
}
}
