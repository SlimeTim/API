var config = require('./config');
const sql = require('mssql');

async function getProduct(productname) {
  try {
    let pool = await sql.connect(config);

    if(pool.connected) {
      console.log("Connected to the database successfully.");
    } else {
      console.log("Failed to connect to the database.");
    }

    const result = await sql.query`select * from Product where product_name = ${productname}`
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function signIn(username, password) {
  try {
    let pool = await sql.connect(config);
    if(pool.connected) {
      console.log("Connected to the database successfully.");
    } else {
      console.log("Failed to connect to the database.");
    }

    const result = (await sql.query`select * from [User] where username = ${username}`).recordset;
    console.log(result[0].password);
    if (result[0].password === password) {
        return {message: "login successfully", fullname: result[0].name};
    }
    else {
      return {message: "login fail"};
    }

  } catch (error) {
    console.log(error);
  }
}

async function getAllProducts() {
  try {
    let pool = await sql.connect(config);
    if(pool.connected) {
      console.log("Connected to the database successfully.");
    } else {
      console.log("Failed to connect to the database.");
    }

    const results = (await sql.query`select * from Product`).recordsets;
    return results;

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    getProduct : getProduct,
    signIn: signIn,
    getAllProducts: getAllProducts
}