class Products{
    constructor(product_id,name,price,img_link){
        this.product_id = product_id;
        this.name = name; 
        this.price = price; 
        this.img_link = img_link;
    }
}

class User {
    constructor(user_id, username, password, name) {
      this.user_id = user_id;
      this.username = username;
      this.password = password;
      this.name = name;
    }
  }

  module.exports = {
    Products: Products,
    User: User
  };
