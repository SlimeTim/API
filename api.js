var Order = require("./order");
const dboperations = require("./func.js");
const fetch = require('node-fetch');
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());



// router.use((request, response, next) => {
//   console.log("middleware");
//   next();
// });

// const RateLimit = require("express-rate-limit");
// const { request } = require("express");
// const { response } = require("express");

// Middleware để giới hạn số lần yêu cầu trong 1 phút (60 requests trong 1 phút)
// const minuteLimiter = RateLimit({
//   windowMs: 60 * 1000, // 1 phút
//   max: 100000, // Số lượng yêu cầu tối đa trong 1 phút
//   message: "Quá giới hạn số lần yêu cầu trong 1 phút",
//   statusCode: 429, // Mã lỗi trả về là 429
// });

// Middleware để giới hạn số lần yêu cầu trong 1 ngày (1000 requests trong 1 ngày)
// const dayLimiter = RateLimit({
//   windowMs: 24 * 60 * 60 * 1000, // 1 ngày
//   max: 1000, // Số lượng yêu cầu tối đa trong 1 ngày
//   message: "Quá giới hạn số lần yêu cầu trong 1 ngày",
//   statusCode: 429, // Mã lỗi trả về là 429
// });

// Sử dụng middleware giới hạn số lần yêu cầu cho các route cần áp dụng
// dayLimiter,
// minuteLimiter
router
  .get("/product/:id",( request, response) => {
    dboperations.getProduct(request.params.id).then((result) => {
      response.json(result[0]);
    });
  });


// router.route("/user").get(minuteLimiter, dayLimiter, (request, response) => {
//   dboperations.getUsers().then((result) => {
//     response.json(result);
//   });
// });

// router.route("/checkout").post(minuteLimiter, dayLimiter, (request, response) => {
//   const productIds = request.body.productIds; // Lấy productIds từ body của yêu cầu
//   const today = new Date();

//   const year = today.getFullYear();
//   const month = String(today.getMonth() + 1).padStart(2, '0');
//   const day = String(today.getDate()).padStart(2, '0');
//   const formattedDate = `${year}-${month}-${day}`;
//   response.json({ message: "Checkout successful" });

//   // Chuyển đổi mảng productIds thành một chuỗi phân tách bằng dấu phẩy
//   const productIdsString = productIds.join(',');

//   // Tạo truy vấn INSERT để chèn productIds vào bảng "Invoice"
//   const query = `INSERT INTO Invoice (product_id, purchase_date) VALUES ('${productIdsString}', '${formattedDate}')`;

//   // Thực thi truy vấn
//   sql.query(query, (error, results) => {
//     if (error) {
//       // Xử lý lỗi nếu có
//       console.error(error);
//       response.status(500).json({ error: 'An error occurred while saving productIds' });
//     } else {
//       // Phản hồi với thông báo thành công
//     }
//   });
// });

router.post("/login", (request, response) => {
  const {username, password} = request.body;
  console.log(request.body);
  dboperations.signIn(username, password).then((result) => {
    response.json(result);
  })
});

router.get("/getAllProduct", (request, response) => {
  dboperations.getAllProducts().then(result => response.json(result));  
})

app.use("/api", router);

var port = process.env.PORT || 8090;
app.listen(port, () => console.log("Order API is running at " + port));