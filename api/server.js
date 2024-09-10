const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const nodemailer = require("nodemailer");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Xử lý yêu cầu preflight OPTIONS
app.options("/login-business", (req, res) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send();
});
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "travelling",
});

const SECRET_KEY = "secret_key";

app.get("/account", (req, res) => {
  const sql = "select * from account";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

// get All hotels
app.get("/getAllHotels", (req, res) => {
  const sql =
    "SELECT DISTINCT h.* FROM hotels h INNER JOIN type_rooms tr ON h.Hotel_id = tr.Hotel_id where h.status = 1";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    // console.log(data);
    return res.json(data);
  });
});

// get top 8 hotels(random)
app.get("/get8Hotels", (req, res) => {
  const sql = "SELECT * FROM hotels where status = 1 limit 8";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    // console.log(data);
    return res.json(data);
  });
});


// get user's favorite hotels in home page
app.get("/getUserFavoriteHotel/:id", (req, res) => {
  var iduser = req.params.id;
  const sql = "SELECT Hotel_id FROM favorites where User_id = " + iduser;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    // console.log(data);
    return res.json(data);
  });
});

// show user's favorite hotels
app.get("/showUserFavoriteHotel/:id", (req, res) => {
  var iduser = req.params.id;
  const sql =
    "SELECT * FROM favorites, hotels where hotels.Hotel_id = favorites.Hotel_id and User_id = " +
    iduser;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    // console.log(data);
    return res.json(data);
    console.log(data);
  });
});

app.post("/showhotels", (req, res) => {
  const sql = "SELECT hotels.*, ( SELECT COUNT(*)FROM reviews WHERE reviews.Hotel_id = hotels.Hotel_id ) AS review_count, partners.Partner_Email FROM hotels JOIN partners ON hotels.Partner_id = partners.Partner_id";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json("Fail");
    }
  });
});

// get all image of the hotel in detail page
app.get("/showImgHotelDetail/:id", (req, res) => {
  const sql = `SELECT * FROM images_hotels where Hotel_id = ${req.params.id} limit 6`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Fail");
    }
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json([]);
    }
  });
});

//show typeRooms
app.get("/showTypeRooms/:idHotel", (req, res) => {
  const sql = `SELECT * FROM type_rooms where Hotel_id = ${req.params.idHotel}`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Fail");
    }
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json([]);
    }
  });
});

// get all typerooms of the hotel in detail page
app.get("/showTypeRoomsDetail/:idHotel", (req, res) => {
  const sql = `SELECT * FROM type_rooms where Hotel_id = ${req.params.idHotel}`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Fail");
    }
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json([]);
    }
  });
});

// get all images of the typeroom in detail page
app.get("/showImageTypeRooms/:id", (req, res) => {
  const sql = `SELECT * FROM images_typeroom where TypeRoom_id = ${req.params.id}`;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

// get all images of the hotels in search hotel
app.get("/showImageHotels/:id", (req, res) => {
  const sql = `SELECT * FROM images_hotels where Hotel_id = ${req.params.id}`;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

// search typeroom in detail hotel page
app.post("/searchTypeRoom", (req, res) => {
  const sql = `SELECT tr.TypeRoom_id, tr.TypeRoom_Name, tr.Hotel_id, tr.TypeRoom_Style, tr.TypeRoom_Price, tr.MaxLoad, tr.status, COUNT(r.Room_Id) AS num_rooms, (COUNT(r.Room_Id) * tr.MaxLoad) as tongsonguoi FROM type_rooms tr INNER JOIN rooms r ON tr.TypeRoom_id = r.TypeRoom_id LEFT JOIN orders o ON r.room_id = o.room_id WHERE r.status = 0 AND (DATE_FORMAT(CheckOut, '%e/%c/%Y') IS NULL OR DATE_FORMAT(CheckOut, '%e/%c/%Y') > DATE_FORMAT(STR_TO_DATE(?, '%d/%m/%Y'), '%Y-%m-%d')) AND (DATE_FORMAT(CheckIn, '%e/%c/%Y') IS NULL OR DATE_FORMAT(CheckIn, '%e/%c/%Y') < DATE_FORMAT(STR_TO_DATE(?, '%d/%m/%Y'), '%Y-%m-%d')) AND (DATE_FORMAT(CheckIn, '%e/%c/%Y') IS NULL OR DATE_FORMAT(CheckOut, '%e/%c/%Y') IS NULL OR NOT (DATE_FORMAT(CheckOut, '%e/%c/%Y') <= DATE_FORMAT(STR_TO_DATE(?, '%d/%m/%Y'), '%Y-%m-%d') OR DATE_FORMAT(CheckIn, '%e/%c/%Y') >= DATE_FORMAT(STR_TO_DATE(?, '%d/%m/%Y'), '%Y-%m-%d'))) GROUP BY tr.TypeRoom_id, tr.TypeRoom_Name, tr.Hotel_id, tr.TypeRoom_Style, tr.TypeRoom_Price, tr.MaxLoad, tr.status HAVING COUNT(r.Room_Id) >= ? AND (COUNT(r.Room_Id) * tr.MaxLoad) >= ? and tr.Hotel_id = ?`;
  var checkInDate = req.body.checkInDate;
  var checkOutDate = req.body.checkOutDate;
  var numPeoPle = req.body.numPeoPle;
  var idHotel = req.body.idHotel;
  var numRoom = req.body.numRoom;
  db.query(
    sql,
    [
      checkInDate,
      checkOutDate,
      checkInDate,
      checkOutDate,
      numRoom,
      numPeoPle,
      idHotel,
    ],
    (err, data) => {
      console.log(data);
      if (err) console.log(err);
      if (data.length > 0) {
        return res.json(data);
      } else {
        return res.json("Not exists");
      }
    }
  );
});

// get amount of hotels
app.get("/getAmoutHotels", (req, res) => {
  const sql = `SELECT COUNT(DISTINCT h.Hotel_id) AS total_count
  FROM hotels h
  JOIN type_rooms tr ON h.Hotel_id = tr.Hotel_id
  JOIN rooms r ON tr.TypeRoom_id = r.TypeRoom_id
  WHERE tr.Maxload >= 1
  HAVING COUNT(r.Room_id) >= 1;
  `;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

// get detail of the hotel
app.get("/detailHotel/:id", (req, res) => {
  const sql = `select * from hotels where Hotel_id = ${req.params.id}`;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

// get detail of the type
app.get("/detailTypeRoom/:id", (req, res) => {
  const sql = `select * from type_rooms where TypeRoom_id = ${req.params.id}`;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

// get all interior of the type room in detail page
app.get("/showInterior/:id", (req, res) => {
  const sql = `SELECT * FROM room_interior where TypeRoom_id = ${req.params.id}`;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json([]);
    }
  });
});

// // insert into order
app.post("/addOrder", (req, res) => {
  var Room_id = req.body.listIDRoom;
  var hotelId = req.body.hotelId;
  var typeRoomId = req.body.typeRoomId;
  var CheckIn = req.body.CheckIn;
  var CheckOut = req.body.CheckOut;
  var userId = req.body.userId;
  var userName = req.body.userName;
  var userPhone = req.body.userPhone;
  var userEmail = req.body.userEmail;
  var priceBefore = req.body.priceBefore;
  var discount = req.body.discount;
  var priceAfter = req.body.priceAfter;
  var timeNow = req.body.timeNow;

  const sql = `INSERT INTO orders(Hotel_id, TypeRoom_id, Room_id, User_id, User_Name, User_Phone, User_Email, CheckIn, CheckOut, PriceBefore, Discount, PriceAfter, Order_Status, TimeInsert) values(?, ?, ?, ?, ?, ?, ?, DATE_FORMAT(STR_TO_DATE(?, '%d/%m/%Y'), '%Y-%m-%d'), DATE_FORMAT(STR_TO_DATE(?, '%d/%m/%Y'), '%Y-%m-%d'), ?, ?, ?, 1, DATE_FORMAT(STR_TO_DATE(?, '%d/%m/%Y'), '%Y-%m-%d'))`;
  for (let i = 0; i < Room_id.length; i++) {
    db.query(
      sql,
      [
        hotelId,
        typeRoomId,
        Room_id[i],
        userId,
        userName,
        userPhone,
        userEmail,
        CheckIn,
        CheckOut,
        priceBefore,
        discount,
        priceAfter,
        timeNow,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.json("Error");
        } else {
          return res.json("Done order");
        }
      }
    );
  }
});

// cancel status list room in waiting
app.post("/cancelRoomWaitingif", (req, res) => {
  var listID = req.body.listID;
  const sqlUpdate = `UPDATE rooms SET status = 0 WHERE room_id = ?`;

  for (let i = 0; i < listID.length; i++) {
    db.query(sqlUpdate, [listID[i]], (err, result) => {
      if (err) {
        console.log(err);
        return res.json("Error");
      }
      console.log(`Room ${listID[i]} status updated to 0`);
    });
  }

  return res.json("Done");
});

// Set rooms are waiting
app.post("/setRoomWaiting", (req, res) => {
  const numRoom = req.body.numRoom;
  const type = req.body.typeRoom;

  const sqlSelect = `SELECT room_id FROM rooms WHERE status = 0 AND TypeRoom_id = ? LIMIT ?`;
  const sqlUpdate = `UPDATE rooms SET status = 1 WHERE room_id IN (?)`;

  db.query(sqlSelect, [type, numRoom], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error");
    }

    const roomIds = selectResult.map((row) => row.room_id);
    console.log("So phong: " + numRoom);
    console.log("TypeRoom_Id: " + type);
    console.log("Cac room id: " + roomIds);

    if (roomIds.length === 0) {
      console.log("No rooms found to update.");
      return res.json("No rooms found to update.");
    }

    db.query(sqlUpdate, [roomIds], (updateErr, updateResult) => {
      if (updateErr) {
        console.log(updateErr);
        return res.json("Error");
      } else {
        console.log("Update successful");
        return res.json(roomIds);
      }
    });
  });
});

// update view of hotel
app.post("/updateView", (req, res) => {
  var hotelID = req.body.hotelID;
  const sql = `update hotels set views = views + 1 where Hotel_id = ${hotelID}`;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json("Fail");
    }
  });
});

// add favorite
app.post("/updateFavoriteStatus", (req, res) => {
  const hotelID = req.body.hotelID;
  const userID = req.body.userID;

  // Check if the favorite entry already exists for the user and hotel
  const checkExistSql = `SELECT * FROM favorites WHERE Hotel_id = ? AND User_id = ?`;
  db.query(checkExistSql, [hotelID, userID], (err, result) => {
    if (err) {
      return res.json("Error");
    }

    if (result.length > 0) {
      // If entry exists, delete it
      const deleteSql = `DELETE FROM favorites WHERE Hotel_id = ? AND User_id = ?`;
      db.query(deleteSql, [hotelID, userID], (err) => {
        if (err) {
          return res.json("Error");
        }
        return res.json("Deleted");
      });
    } else {
      // If entry doesn't exist, insert it
      const insertSql = `INSERT INTO favorites (Hotel_id, User_id) VALUES (?, ?)`;
      db.query(insertSql, [hotelID, userID], (err) => {
        if (err) {
          return res.json("Error");
        }
        return res.json("Inserted");
      });
    }
  });
});

// show booking history of user
app.post("/showBookingHistory", (req, res) => {
  var userID = req.body.userID;
  const sql = `SELECT o.Order_id, o.Hotel_id, o.TypeRoom_id, o.Room_id, o.User_id, o.User_Name, o.User_Phone, o.User_Email, DATE_FORMAT(o.CheckIn, '%e/%c/%Y') as CheckIn, DATE_FORMAT(o.CheckOut, '%e/%c/%Y') as CheckOut, (o.CheckOut - o.CheckIn + 1) as SoNgay, o.PriceBefore, o.Discount, o.PriceAfter, DATE_FORMAT(o.TimeInsert, '%e/%c/%Y') as TimeInsert , o.Order_Status, h.Hotel_Name, tr.TypeRoom_Name, tr.TypeRoom_Price FROM orders o, type_rooms tr, hotels h WHERE o.Hotel_id = h.Hotel_id and h.Hotel_id = tr.Hotel_id and o.TypeRoom_id = tr.TypeRoom_id and User_id = ?`;
  db.query(sql, [userID], (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json([]);
    }
  });
});


// search hotel in home page
app.post("/searchHotel", (req, res) => {
  var numRoom = req.body.numRoom;
  var numPeople = req.body.numPeople;
  var input = req.body.input;
  const sql = `SELECT h.Hotel_id, h.Hotel_Name, h.Hotel_Location, h.Hotel_Rating, h.Category_id
  FROM hotels h
  JOIN type_rooms tr ON h.Hotel_id = tr.Hotel_id
  JOIN rooms r ON tr.Typeroom_id = r.Typeroom_id
  WHERE tr.Maxload >= ? and h.status = 1 AND (h.Hotel_Name LIKE ? OR h.Hotel_Location LIKE ?)
  GROUP BY h.Hotel_id, h.Hotel_Name, h.Hotel_Location, h.Hotel_Rating, h.Category_id
  HAVING COUNT(r.Room_id) >= ?;
  `;

  // Add '%' wildcards around the input for LIKE comparison
  const searchString = `%${input}%`;

  db.query(
    sql,
    [numPeople, searchString, searchString, numRoom],
    (err, data) => {
      if (err) {
        return res.json("Fail");
      }
      if (data.length > 0) {
        return res.json(data);
      } else {
        return res.json([]);
      }
    }
  );
});

// filter hotel category and rating
app.post("/filterHotel", (req, res) => {
  var conditions = req.body.conditions;
  const sql =
    `SELECT DISTINCT h.* FROM hotels h INNER JOIN type_rooms tr ON h.Hotel_id = tr.Hotel_id ` +
    conditions;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json([]);
    }
  });
});

// sort hotel category DESC
app.post("/sortHotelCateDESC", (req, res) => {
  const sql = `SELECT DISTINCT h.* FROM hotels h INNER JOIN type_rooms tr ON h.Hotel_id = tr.Hotel_id where h.status = 1 ORDER BY Category_id DESC`;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json([]);
    }
  });
});

// sort hotel Rating DESC
app.post("/sortHotelRatingDESC", (req, res) => {
  const sql = `SELECT DISTINCT h.* FROM hotels h INNER JOIN type_rooms tr ON h.Hotel_id = tr.Hotel_id where h.status = 1 ORDER BY Hotel_Rating DESC`;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json([]);
    }
  });
});

// add reviews
app.post("/insertReviews", (req, res) => {
  var idHotel = req.body.idHotel;
  var idUser = req.body.idUser;
  var rating = req.body.rating;
  var comment = req.body.comment;

  const sql = `insert into reviews(User_id, Hotel_id, Rating, Comment, DateCreate) values(?, ?, ?, ?, DATE_FORMAT(NOW(), '%Y-%m-%d'))`;
  db.query(sql, [idUser, idHotel, rating, comment], (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json([]);
    }
  });
});

// find id user and id hotel are exist in orders
app.post("/findUserHotel", (req, res) => {
  var idHotel = req.body.idHotel;
  var idUser = req.body.idUser;

  const sql = `select * from orders where Hotel_id = ? and User_id = ?`;
  db.query(sql, [idHotel, idUser], (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json([]);
    }
    // console.log(data)
  });
});

// show reviews
app.post("/showReviews", (req, res) => {
  var idHotel = req.body.idHotel;

  const sql = `SELECT u.User_Name, r.*, DATE_FORMAT(r.DateCreate, '%e/%c/%Y') as DateCreate FROM reviews r, users u where u.User_id = r.User_id and r.Hotel_id = ?`;
  db.query(sql, [idHotel], (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json([]);
    }
  });
});

// delete reviews
app.post("/deleteReviews", (req, res) => {
  var idReview = req.body.idReview;

  const sql = `DELETE FROM reviews WHERE Review_id = ?`;
  db.query(sql, [idReview], (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json([]);
    }
  });
});

// get count reviews
app.post("/countReviews", (req, res) => {
  var idHotel = req.body.idHotel;

  const sql = `select count(*) as count,(SUM(Rating) / COUNT(*)) AS AVE from reviews where Hotel_id = ?`;
  db.query(sql, [idHotel], (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json([]);
    }
    // console.log(data)
  });
});

// calculate rating for each hotel
app.post("/averageRatingHotel", (req, res) => {
  var idHotel = req.body.idHotel;

  // Step 1: Calculate average rating
  const sql1 = `SELECT (SUM(Rating) / COUNT(*)) AS AVE, count(*) as count FROM reviews WHERE Hotel_id = ?`;
  db.query(sql1, [idHotel], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      const averageRating = data[0].AVE; // Extract average rating from the result

      // Step 2: Update the hotel's average rating
      const sql2 = `UPDATE hotels SET Hotel_Rating = ? WHERE Hotel_id = ?`;
      db.query(sql2, [averageRating, idHotel], (updateErr, updateData) => {
        if (updateErr) {
          return res.json("Error updating rating");
        }
        return res.json({ message: "Average rating updated successfully" });
      });
    } else {
      return res.json([]);
    }
  });
});

app.post("/searchtyperoomidtroom", (req, res) => {
  const searchsql = "SELECT type_rooms.*, hotels.Hotel_Name FROM type_rooms JOIN hotels ON type_rooms.Hotel_id = hotels.Hotel_id WHERE TypeRoom_id = ?";
  db.query(
    searchsql,
    [req.body.idtroomsearchtr],
    (checkErrSearch, checkResultSearch) => {
      if (checkErrSearch) return res.json("Error");
      if (checkResultSearch.length > 0) {
        return res.json(checkResultSearch);
      } else {
        return res.json("Not find");
      }
    }
  );
});


app.post("/searchtyperoomidhotel", (req, res) => {
  const searchsql =
    "SELECT type_rooms.*, hotels.Hotel_Name FROM type_rooms JOIN hotels ON type_rooms.Hotel_id = hotels.Hotel_id WHERE type_rooms.Hotel_id = ? OR type_rooms.TypeRoom_Name LIKE ?";
  const searchTerm = `%${req.body.tentyperoomsearchtr}%`;
  db.query(
    searchsql,
    [req.body.idhotelsearchtr, searchTerm],
    (checkErrSearch, checkResultSearch) => {
      if (checkErrSearch) return res.json("Error");
      if (checkResultSearch.length > 0) {
        return res.json(checkResultSearch);
      } else {
        return res.json("Not find");
      }
    }
  );
});

app.post("/showdoanhthu", (req, res) => {
  const sql =
    "SELECT orders.*, hotels.Hotel_Name, type_rooms.TypeRoom_Name, rooms.Room_Name FROM orders JOIN hotels ON orders.Hotel_id = hotels.Hotel_id JOIN type_rooms ON type_rooms.TypeRoom_id = orders.TypeRoom_id JOIN rooms ON rooms.Room_id = orders.Room_id;";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
    }
  });
});

app.get("/getOrderDone", (req, res) => {
  const sql =
    "SELECT orders.*, hotels.Hotel_Name, type_rooms.TypeRoom_Name, rooms.Room_Name FROM orders JOIN hotels ON orders.Hotel_id = hotels.Hotel_id JOIN type_rooms ON type_rooms.TypeRoom_id = orders.TypeRoom_id JOIN rooms ON rooms.Room_id = orders.Room_id;";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.post("/searchhtidht", (req, res) => {
  const searchsql = "SELECT hotels.*, ( SELECT COUNT(*)FROM reviews WHERE reviews.Hotel_id = hotels.Hotel_id ) AS review_count, partners.Partner_Email FROM hotels JOIN partners ON hotels.Partner_id = partners.Partner_id WHERE Hotel_id = ?";
  db.query(
    searchsql,
    [req.body.idhtsearchht],
    (checkErrSearch, checkResultSearch) => {
      if (checkErrSearch) return res.json("Error");
      if (checkResultSearch.length > 0) {
        return res.json(checkResultSearch);
      } else {
        return res.json("Not find");
      }
    }
  );
});


app.use(cors());
//thay đổi trạng thái status
// Update order status route
app.post("/updateOrderStatus", (req, res) => {
  const { orderId, newStatus } = req.body;

  // Update order status in the database
  const updateQuery = `UPDATE orders SET Order_Status = ? WHERE Order_id = ?`;
  db.query(updateQuery, [newStatus, orderId], (err, result) => {
    if (err) {
      console.error("Error updating order status:", err);
      res.status(500).json({ message: "Error updating order status" });
    } else {
      res.status(200).json({ message: "Order status updated successfully" });
    }
  });
});

app.get("/getRoomsByHotelId", (req, res) => {
  const sql = "select * from reviews";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});
app.get("/getTypeRoomsByHotelId/:hotelId", (req, res) => {
  const hotelId = req.params.hotelId;
  const sql = "SELECT * FROM type_rooms WHERE Hotel_id = ?";
  db.query(sql, [hotelId], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error fetching data from database" });
    }
    return res.json(data);
  });
});
//lấy order đã hoàn thành
app.get("/getOrderDone", (req, res) => {
  const sql = "select * from orders where Order_Status = 3";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});
//lấy order đang chờ
app.get("/getOrderWaiting", (req, res) => {
  const sql = "select * from orders where Order_Status = 1";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});
//lấy order đang nhận
app.get("/getOrderCheckIn", (req, res) => {
  const sql = "select * from orders where Order_Status = 2";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});
//lấy order chưa thanh toán
app.get("/getOrderNoPay", (req, res) => {
  const sql = "select * from orders where Order_Status = 0";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});
//lấy typeroomID
app.get("/getTypeRoom", (req, res) => {
  const sql = "select * from type_rooms";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});
//lấy typeroombyID
app.get("/getTypeRoomsById/:TypeRoomId", (req, res) => {
  const TypeRoomId = req.params.TypeRoomId;
  const sql = "SELECT * FROM type_rooms WHERE TypeRoom_id = ?";
  db.query(sql, [TypeRoomId], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error fetching data from database" });
    }
    return res.json(data);
  });
});
//lấy dữ liệu order
app.get("/getPartnerOrder", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const partnerId = decoded.name.Partner_id;

    const sql = `
      SELECT *
      FROM orders
      WHERE Hotel_id IN (
        SELECT Hotel_id
        FROM hotels
        WHERE Partner_id = ${partnerId}
      )
    `;

    db.query(sql, (err, data) => {
      if (err) {
        console.error(err);
        return res.json({ message: "Error" });
      }
      return res.json(data);
    });
  });
});
//lấy dữ liệu doanh thu
app.get("/getOrderRevenue", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const partnerId = decoded.name.Partner_id;

    const sql = `
      SELECT *
      FROM orders
      WHERE Hotel_id IN (
        SELECT Hotel_id
        FROM hotels
        WHERE Partner_id = ${partnerId}
      )
      AND Order_Status = 3
    `;

    db.query(sql, (err, data) => {
      if (err) {
        console.error(err);
        return res.json({ message: "Error" });
      }
      return res.json(data);
    });
  });
});
//lấy dữ liệu review
app.get("/getReview", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const partnerId = decoded.name.Partner_id;

    const sql = `
      SELECT *
      FROM reviews
      WHERE Hotel_id IN (
        SELECT Hotel_id
        FROM hotels
        WHERE Partner_id = ${partnerId}
      )
    `;

    db.query(sql, (err, data) => {
      if (err) {
        console.error(err);
        return res.json({ message: "Error" });
      }
      return res.json(data);
    });
  });
});

app.get("/getReviewByHotelId/:hotelId", (req, res) => {
  const hotelId = req.params.hotelId;
  const sql = "SELECT * FROM reviews WHERE Hotel_id = ?";
  db.query(sql, [hotelId], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error fetching data from database" });
    }
    return res.json(data);
  });
});
//lấy room
app.get("/getRoom", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const partnerId = decoded.name.Partner_id;

    const sql = `
      SELECT r.*, tr.Hotel_id, tr.TypeRoom_id
      FROM rooms r
      JOIN type_rooms tr ON r.TypeRoom_id = tr.TypeRoom_id
      JOIN hotels h ON tr.Hotel_id = h.Hotel_id
      WHERE h.Partner_id = ${partnerId}
    `;

    db.query(sql, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching room data" });
      }

      return res.json(data);
    });
  });
});
//thêm phòng
app.post("/addRoom", (req, res) => {
  const { TypeRoom_id, Room_Name } = req.body;

  // Kiểm tra xem TypeRoom_id và Room_Name có tồn tại
  if (TypeRoom_id && Room_Name) {
    // Kiểm tra xem tên đã tồn tại trong bảng rooms hay chưa
    const checkQuery = "SELECT Room_Name FROM rooms WHERE Room_Name = ?";
    db.query(checkQuery, [Room_Name], (checkErr, checkResult) => {
      if (checkErr) {
        console.error("Error checking room name", checkErr);
        res.status(500).json({ error: "Error checking room name" });
      } else {
        if (checkResult.length > 0) {
          // Tên đã tồn tại, tăng số và thử lại
          let newRoomName = `${Room_Name} 1`;

          const incrementCheckQuery =
            "SELECT Room_Name FROM rooms WHERE Room_Name = ?";
          db.query(
            incrementCheckQuery,
            [newRoomName],
            (incCheckErr, incCheckResult) => {
              if (incCheckErr) {
                console.error(
                  "Error checking incremented room name",
                  incCheckErr
                );
                res
                  .status(500)
                  .json({ error: "Error checking incremented room name" });
              } else {
                if (incCheckResult.length > 0) {
                  // Tăng số tiếp tục cho tên mới
                  newRoomName = `${Room_Name} ${
                    parseInt(newRoomName.split(" ")[1]) + 1
                  }`;
                }

                // Thực hiện thêm dữ liệu với tên mới đã xử lý
                const insertQuery =
                  "INSERT INTO rooms (TypeRoom_id, Room_Name) VALUES (?, ?)";
                db.query(
                  insertQuery,
                  [TypeRoom_id, newRoomName],
                  (insertErr, insertResult) => {
                    if (insertErr) {
                      console.error("Error adding room", insertErr);
                      res.status(500).json({ error: "Error adding room" });
                    } else {
                      console.log("Room added successfully");
                      res
                        .status(200)
                        .json({ message: "Room added successfully" });
                    }
                  }
                );
              }
            }
          );
        } else {
          // Tên chưa tồn tại, thêm dữ liệu với tên gốc
          const insertQuery =
            "INSERT INTO rooms (TypeRoom_id, Room_Name) VALUES (?, ?)";
          db.query(
            insertQuery,
            [TypeRoom_id, Room_Name],
            (insertErr, insertResult) => {
              if (insertErr) {
                console.error("Error adding room", insertErr);
                res.status(500).json({ error: "Error adding room" });
              } else {
                console.log("Room added successfully");
                res.status(200).json({ message: "Room added successfully" });
              }
            }
          );
        }
      }
    });
  } else {
    res.status(400).json({ error: "Missing required data" });
  }
});

//delete phòng thêm lệnh app.use(cors());
app.delete("/deleteRoom/:id", (req, res) => {
  const roomId = req.params.id;

  const sql = "DELETE FROM rooms WHERE Room_id = ?";
  db.query(sql, [roomId], (err, result) => {
    if (err) {
      console.error("Error deleting room", err);
      return res.status(500).json({ error: "Failed to delete room" });
    }

    console.log("Room deleted successfully");
    return res.status(200).json({ message: "Room deleted successfully" });
  });
});
//tự cập nhật order status
app.post("/autoUpdateOrderStatus", (req, res) => {
  const updateQuery = `
    UPDATE orders
    SET Order_Status = CASE
      WHEN Order_Status  AND CheckOut <= NOW() THEN 3
      WHEN Order_Status  AND CheckIn = CURDATE() THEN 2
      ELSE Order_Status
    END
  `;

  db.query(updateQuery, (err, result) => {
    if (err) {
      console.error("Error auto-updating order status:", err);
      res.status(500).json({ message: "Error auto-updating order status" });
    } else {
      const affectedRows = result.affectedRows || 0;
      res.status(200).json({
        message: `${affectedRows} order(s) have been auto-updated`,
      });
    }
  });
});
//tự cập nhật order status
app.post("/autoUpdateOrderStatus", (req, res) => {
  const updateQuery = `
    UPDATE orders
    SET Order_Status = 3
    WHERE Order_Status <> 3 AND CheckOut <= NOW()
  `;

  db.query(updateQuery, (err, result) => {
    if (err) {
      console.error("Error auto-updating order status:", err);
      res.status(500).json({ message: "Error auto-updating order status" });
    } else {
      const affectedRows = result.affectedRows || 0;
      res.status(200).json({
        message: `${affectedRows} order(s) have been auto-updated`,
      });
    }
  });
});




app.post("/userLogin", (req, res) => {
  const sql =
    "SELECT * FROM users WHERE User_Email = ? and User_Password = ? or User_Phone = ? and User_Password = ?";
  db.query(
    sql,
    [req.body.email, req.body.matkhau, req.body.sdt, req.body.matkhau],
    (err, data) => {
      if (err) return res.json("Error");
      if (data.length > 0) {
        return res.json(data);
      } else {
        return res.json("Fail");
      }
    }
  );
});

app.post("/register", (req, res) => {
  const { email, hoten, sdt, matkhau } = req.body;
  const checkEmail = "SELECT COUNT(*) AS count FROM users WHERE User_Email = ?";
  const checkEmailpart =
    "SELECT COUNT(*) AS count FROM partners WHERE Partner_Email = ?";
  const checkSdt = "SELECT COUNT(*) AS count FROM users WHERE User_Phone = ?";
  const checkSdtpart =
    "SELECT COUNT(*) AS count FROM partners WHERE Partner_Phone = ?";

  db.query(
    checkEmail,
    [req.body.emailre],
    (checkErrEmail, checkResultEmail) => {
      if (checkErrEmail) {
        return res.json("Error1");
      }
      db.query(checkSdt, [req.body.sdtre], (checkErrSdt, checkResultSdt) => {
        if (checkErrSdt) {
          return res.json("Error2");
        }
        db.query(
          checkEmailpart,
          [req.body.emailre],
          (checkErrEmailPart, checkResultEmailPart) => {
            if (checkErrEmailPart) {
              return res.json("Error3");
            }
            db.query(
              checkSdtpart,
              [req.body.sdtre],
              (checkErrSdtPart, checkResultSdtPart) => {
                if (checkErrSdtPart) {
                  return res.json("Error4");
                }
                const existemail = checkResultEmail[0].count;
                const existsdt = checkResultSdt[0].count;
                const existemailpart = checkResultEmailPart[0].count;
                const existsdtpart = checkResultSdtPart[0].count;
                if (
                  (existemail > 0 || existemailpart > 0) &&
                  existsdt == 0 &&
                  existsdtpart == 0
                ) {
                  console.log("Email đã tồn tại");
                  return res.json("Email đã tồn tại");
                } else if (
                  (existsdt > 0 || existsdtpart > 0) &&
                  existemail == 0 &&
                  existemailpart == 0
                ) {
                  console.log("Số điện thoại đã tồn tại");
                  return res.json("Số điện thoại đã tồn tại");
                } else if (
                  (existsdt > 0 || existsdtpart > 0) &&
                  (existemail > 0 || existemailpart > 0)
                ) {
                  console.log("Email và số điện thoại đã tồn tại");
                  return res.json("Email và số điện thoại đã tồn tại");
                } else {
                  const insertSql =
                    "INSERT INTO users (User_Email, User_Name, User_Phone, User_Password) VALUES (?, ?, ?, ?)";
                  db.query(
                    insertSql,
                    [
                      req.body.emailre,
                      req.body.hoten,
                      req.body.sdtre,
                      req.body.matkhau,
                    ],
                    (insertErr, insertResult) => {
                      if (insertErr) {
                        console.log("Error");
                      } else {
                        console.log("Đăng ký thành công!");
                        return res.json("Đăng ký thành công!");
                      }
                    }
                  );
                }
              }
            );
          }
        );
      });
    }
  );
});

app.post("/showkh", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
    }
  });
});

app.post("/addkh", (req, res) => {
  const checkEmail = "SELECT COUNT(*) AS count FROM users WHERE User_Email = ?";
  const checkEmailpart = "SELECT COUNT(*) AS count FROM partners WHERE Partner_Email = ?";
  const checkSdt = "SELECT COUNT(*) AS count FROM users WHERE User_Phone = ?";
  const checkSdtpart = "SELECT COUNT(*) AS count FROM partners WHERE Partner_Phone = ?";


  db.query(checkEmail, [req.body.emailkh], (checkErrEmail, checkResultEmail) => {
    if (checkErrEmail) {
      return res.json("Error1");
    }
    db.query(checkSdt, [req.body.sdtkh], (checkErrSdt, checkResultSdt) => {
      if (checkErrSdt) {
        return res.json("Error2");
      } db.query(checkEmailpart, [req.body.emailkh], (checkErrEmailPart, checkResultEmailPart) => {
        if (checkErrEmailPart) {
          return res.json("Error3");
        }
        db.query(checkSdtpart, [req.body.sdtkh], (checkErrSdtPart, checkResultSdtPart) => {
          if (checkErrSdtPart) {
            return res.json("Error4");
          }
          const existemail = checkResultEmail[0].count;
          const existsdt = checkResultSdt[0].count;
          const existemailpart = checkResultEmailPart[0].count;
          const existsdtpart = checkResultSdtPart[0].count;
          if ((existemail > 0 || existemailpart > 0) && (existsdt == 0 && existsdtpart == 0)) {
            console.log("Email đã tồn tại");
            return res.json("Email đã tồn tại");
          } else if ((existsdt > 0 || existsdtpart > 0) && (existemail == 0 && existemailpart == 0)) {
            console.log("Số điện thoại đã tồn tại");
            return res.json("Số điện thoại đã tồn tại");
          } else if ((existsdt > 0 || existsdtpart > 0) && (existemail > 0 || existemailpart > 0)) {
            console.log("Email và số điện thoại đã tồn tại");
            return res.json("Email và số điện thoại đã tồn tại");
          } else {

            const insertSql =
              "INSERT INTO users (User_Email, User_Name, User_Phone, User_Password, Role) VALUES (?, ?, ?, ?, ?)";
            db.query(
              insertSql,
              [
                req.body.emailkh,
                req.body.hotenkh,
                req.body.sdtkh,
                req.body.matkhaukh,
                req.body.rolekh,
              ],
              (insertErr, insertResult) => {
                if (insertErr) {
                  console.log("Error");
                } else {
                  return res.json("Thêm thành công");
                }
              }
            );

          }
        });
      });
    });
  });
});

app.post("/updatekh", (req, res) => {
  const checkEmail =
    "SELECT COUNT(*) AS count FROM users WHERE User_Email = ? AND User_id <> ?";
  const checkSdt =
    "SELECT COUNT(*) AS count FROM users WHERE User_Phone = ? AND User_id <> ?";

  db.query(
    checkEmail,
    [req.body.emailkh, req.body.idkh],
    (checkErrEmail, checkResultEmail) => {
      if (checkErrEmail) {
        return res.json("Error");
      }
      db.query(
        checkSdt,
        [req.body.sdtkh, req.body.idkh],
        (checkErrSdt, checkResultSdt) => {
          if (checkErrSdt) {
            return res.json("Error");
          }

          const existemail = checkResultEmail[0].count;
          const existsdt = checkResultSdt[0].count;
          console.log(checkResultEmail);
          if (existemail > 0 && existsdt == 0) {
            console.log("Email đã tồn tại");
            return res.json("Email đã tồn tại");
          } else if (existsdt > 0 && existemail == 0) {
            console.log("Số điện thoại đã tồn tại");
            return res.json("Số điện thoại đã tồn tại");
          } else if (existsdt > 0 && existemail > 0) {
            console.log("Email và số điện thoại đã tồn tại");
            return res.json("Email và số điện thoại đã tồn tại");
          } else {
            const updatesql =
              "UPDATE users SET User_Name = ?, User_Phone = ?, User_Password = ?, Role = ? WHERE User_Email = ?";
            db.query(
              updatesql,
              [
                req.body.hotenkh,
                req.body.sdtkh,
                req.body.matkhaukh,
                req.body.rolekh,
                req.body.EmailKHWhere,
              ],
              (updateErr, updateResult) => {
                if (updateErr) {
                  console.log("Error");
                } else {
                  return res.json("Sửa thành công");
                }
              }
            );
          }
        }
      );
    }
  );
});


app.get("/checkTypeRoom/:typeRoomId", (req, res) => {
  const typeRoomId = req.params.typeRoomId;
  const typeRoomExists = typeRooms.some(
    (room) => room.TypeRoom_id === typeRoomId
  );

  res.json({ exists: typeRoomExists });
});

app.post("/deletekh", (req, res) => {
  const checkidreviews =
    "SELECT COUNT(*) AS count FROM reviews WHERE User_id = ?";
  const checkidorders =
    "SELECT COUNT(*) AS count FROM orders WHERE User_id = ?";

  db.query(
    checkidreviews,
    [req.body.idkh],
    (checkErridreviews, checkResultidreviews) => {
      if (checkErridreviews) {
        return res.json("Error");
      }
      db.query(
        checkidorders,
        [req.body.idkh],
        (checkErridorders, checkResultidorders) => {
          if (checkErridorders) {
            return res.json("Error");
          }
          const existidreviews = checkResultidreviews[0].count;
          const existidorders = checkResultidorders[0].count;

          console.log(existidreviews);
          console.log(existidorders);


          if (
            existidreviews > 0 &&
            existidorders == 0
          ) {
            console.log("Tài khoản đã có lịch sử đánh giá");
            return res.json("Tài khoản đã có lịch sử đánh giá");
          } else if (
            existidorders > 0 &&
            existidreviews == 0
          ) {
            console.log("Tài khoản đã có lịch sử đặt phòng");
            return res.json("Tài khoản đã có lịch sử đặt phòng");
          }
          else if (
            existidreviews > 0 &&
            existidorders > 0
          ) {
            console.log(
              "Tài khoản đã có lịch sử đánh giá và đặt phòng "
            );
            return res.json(
              "Tài khoản đã có lịch sử đánh giá và đặt phòng"
            );
          } else {
            const deletesql =
              "Delete From `users` WHERE `users`.`User_id` = ?;";
            db.query(
              deletesql,
              [req.body.idkh],
              (deleteErr, deleteResult) => {
                if (deleteErr) {
                  console.log(deleteErr);
                } else {
                  return res.json("Xóa thành công");
                }
              }
            );
          }
        }
      );
    }
  );
});

app.post("/searchkh", (req, res) => {
  const searchsql =
    "SELECT * FROM `users` WHERE User_Email = ? OR User_Phone = ?";
  db.query(
    searchsql,
    [req.body.emailsearch, req.body.sdtsearch],
    (checkErrSearch, checkResultSearch) => {
      if (checkErrSearch) return res.json("Error");
      if (checkResultSearch.length > 0) {
        return res.json(checkResultSearch);
      } else {
        return res.json("Not find");
      }
    }
  );
});

app.get("/hotelcategory", (req, res) => {
  const sql = "select * from hotel_category";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.post("/register-business", (req, res) => {
  const { email, hoten, sdt, matkhau } = req.body;
  const checkEmail = "SELECT COUNT(*) AS count FROM users WHERE User_Email = ?";
  const checkEmailpart =
    "SELECT COUNT(*) AS count FROM partners WHERE Partner_Email = ?";
  const checkSdt = "SELECT COUNT(*) AS count FROM users WHERE User_Phone = ?";
  const checkSdtpart =
    "SELECT COUNT(*) AS count FROM partners WHERE Partner_Phone = ?";

  db.query(checkEmail, [req.body.email], (checkErrEmail, checkResultEmail) => {
    if (checkErrEmail) {
      return res.json("Error1");
    }
    db.query(checkSdt, [req.body.phone], (checkErrSdt, checkResultSdt) => {
      if (checkErrSdt) {
        return res.json("Error2");
      }
      db.query(
        checkEmailpart,
        [req.body.email],
        (checkErrEmailPart, checkResultEmailPart) => {
          if (checkErrEmailPart) {
            return res.json("Error3");
          }
          db.query(
            checkSdtpart,
            [req.body.phone],
            (checkErrSdtPart, checkResultSdtPart) => {
              if (checkErrSdtPart) {
                return res.json("Error4");
              }
              const existemail = checkResultEmail[0].count;
              const existsdt = checkResultSdt[0].count;
              const existemailpart = checkResultEmailPart[0].count;
              const existsdtpart = checkResultSdtPart[0].count;
              if (
                (existemail > 0 || existemailpart > 0) &&
                existsdt == 0 &&
                existsdtpart == 0
              ) {
                console.log("Email đã tồn tại");
                return res.json("Email đã tồn tại");
              } else if (
                (existsdt > 0 || existsdtpart > 0) &&
                existemail == 0 &&
                existemailpart == 0
              ) {
                console.log("Số điện thoại đã tồn tại");
                return res.json("Số điện thoại đã tồn tại");
              } else if (
                (existsdt > 0 || existsdtpart > 0) &&
                (existemail > 0 || existemailpart > 0)
              ) {
                console.log("Email và số điện thoại đã tồn tại");
                return res.json("Email và số điện thoại đã tồn tại");
              } else {
                const insertSql =
                  "INSERT INTO partners (Partner_Name, Partner_Phone, Partner_Email, Partner_Password, CCCD, License ) VALUES (?, ?, ?, ?, ?, ?)";
                db.query(
                  insertSql,
                  [
                    req.body.name,
                    req.body.phone,
                    req.body.email,
                    req.body.password,
                    req.body.cccd,
                    req.body.license,
                  ],
                  (insertErr, insertResult) => {
                    if (insertErr) {
                      console.log("ERROR MESS", insertErr);
                    } else {
                      console.log("Đăng ký thành công!");
                      return res.json("Đăng ký thành công");
                    }
                  }
                );
              }
            }
          );
        }
      );
    });
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.post("/partner_account", (req, res) => {
  const token = req.headers.authorization;
  console.log("token", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    const partnerId = decoded.name.Partner_id;
    const { email, name, phone, password, address } = req.body;
    console.log(req.body);

    const sql = `UPDATE partners SET Partner_Email = ?, Partner_Name = ?, Partner_Phone = ?, Partner_Password = ?, WHERE Partner_id = ?`;
    db.query(
      sql,
      [email, name, phone, password, partnerId],
      (err, result) => {
        if (err) {
          console.error("Error updating data", err);
          return res.status(500).json({ message: "Error updating data" });
        }
        return res.status(200).json({ message: "Data updated successfully" });
      }
    );
  });
});

app.get("/partner-header", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    const partnerId = decoded.name.Partner_id;
    const sql = `select * from partners where partner_id = ${partnerId}`;
    db.query(sql, (err, data) => {
      if (err) return res.json("Error");
      return res.json(data);
    });
  });
});

app.get("/hotel_category", (req, res) => {
  const sql = "select * from hotel_category";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.get("/partner-on-progress", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    const partnerId = decoded.name.Partner_id;
    const sql = `select * from hotels where status = 0 and partner_id = ${partnerId}`;
    db.query(sql, (err, data) => {
      if (err) return res.json("Error");
      return res.json(data);
    });
  });
});

app.get("/partner-home", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    const partnerId = decoded.name.Partner_id;
    const sql = `select * from hotels where status = 1 and partner_id = ${partnerId}`;
    db.query(sql, (err, data) => {
      if (err) return res.json("Error");
      return res.json(data);
    });
  });
});

app.get("/updateHotels", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    const partnerId = decoded.name.Partner_id;
    const sql = `select * from hotels where and partner_id = ${partnerId}`;
    db.query(sql, (err, data) => {
      if (err) return res.json("Error");
      return res.json(data);
    });
  });
});

app.get("/rooms", (req, res) => {
  const { typeroomId } = req.body;
  console.log(typeroomId);
  const sql = `select * from rooms where TypeRoom_id = ?`;
  db.query(sql, [typeroomId], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.get("/getRoomsByHotelId", (req, res) => {
  const sql = "select * from reviews";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.get("/getTypeRoomsByHotelId/:hotelId", (req, res) => {
  const hotelId = req.params.hotelId;
  const sql = "SELECT * FROM type_rooms WHERE Hotel_id = ?";
  db.query(sql, [hotelId], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error fetching data from database" });
    }
    return res.json(data);
  });
});

app.get("/getRoomsByTypeRoomlId/:typeRoomId", (req, res) => {
  const typeRoomId = req.params.typeRoomId;
  const sql = "SELECT * FROM rooms WHERE TypeRoom_id = ?";
  db.query(sql, [typeRoomId], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error fetching data from database" });
    }
    return res.json(data);
  });
});

app.post("/login-business", (req, res) => {
  const sql =
    "SELECT * FROM partners WHERE Partner_Email = ? and Partner_Password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      const name = data[0];
      const token = jwt.sign({ name }, SECRET_KEY, { expiresIn: "10d" });
      res.cookie("token", token);
      // return res.json(data);
      return res.json({ Status: "Success", Token: token, Data: data });
    } else {
      return res.json({ Message: "Error" });
    }
  });
});

app.post("/partner-insert", async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Missing token" });
    }
    const decoded = await jwt.verify(token, SECRET_KEY);
    const partnerId = decoded.name.Partner_id;
    const {
      hotelName,
      hotelLocation,
      hotelCategory,
      hotelImage,
      hotelDescription,
      typeroomName,
      typeroomStyle,
      typeroomPrice,
      typemaxLoad,
      selectedImages,
      typeroomInterior,
    } = req.body;
    const typeroomStyleString = typeroomStyle.join(", ");
    const hotelId = await insertHotel(
      partnerId,
      hotelCategory,
      hotelName,
      hotelLocation,
      hotelImage[0],
      hotelDescription
    );
    await insertHotelImages(hotelId, hotelImage);
    const typeRoomId = await insertTypeRoom(
      hotelId,
      typeroomName,
      typeroomStyleString,
      typeroomPrice,
      typemaxLoad
    );
    await insertRoomImages(typeRoomId, selectedImages);
    await insertRoomInterior(typeRoomId, typeroomInterior);
    res.json({ message: "Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

async function insertHotel(
  partnerId,
  hotelCategory,
  hotelName,
  hotelLocation,
  hotelImage,
  hotelDescription
) {
  const sql =
    "INSERT INTO hotels (Partner_id, Category_id, Hotel_Name, Hotel_Location, Hotel_Image, Description) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    partnerId,
    hotelCategory,
    hotelName,
    hotelLocation,
    hotelImage,
    hotelDescription,
  ];
  const hotelResult = await queryDatabase(sql, values);
  return hotelResult.insertId;
}

async function insertHotelImages(hotelId, hotelImages) {
  const sql = "INSERT INTO images_hotels (Hotel_id, Image_URL) VALUES (?, ?)";
  for (const imgHotelName of hotelImages) {
    await queryDatabase(sql, [hotelId, imgHotelName]);
  }
}

async function insertTypeRoom(
  hotelId,
  typeroomName,
  typeroomStyleString,
  typeroomPrice,
  typemaxLoad
) {
  const sql =
    "INSERT INTO type_rooms (Hotel_id, TypeRoom_Name, TypeRoom_Style, TypeRoom_Price, MaxLoad) VALUES (?, ?, ?, ?, ?)";
  const values = [
    hotelId,
    typeroomName,
    typeroomStyleString,
    typeroomPrice,
    typemaxLoad,
  ];
  const typeRoomResult = await queryDatabase(sql, values);
  return typeRoomResult.insertId;
}

async function insertRoomImages(typeRoomId, roomImages) {
  const sql =
    "INSERT INTO images_typeroom (TypeRoom_id, Image_URL) VALUES (?, ?)";
  for (const imgRoomName of roomImages) {
    await queryDatabase(sql, [typeRoomId, imgRoomName]);
  }
}

async function insertRoomInterior(typeRoomId, roomInterior) {
  const sql =
    "INSERT INTO room_interior (Interior_name, TypeRoom_id) VALUES (?, ?)";
  for (const interiorName of roomInterior) {
    await queryDatabase(sql, [interiorName, typeRoomId]);
  }
}

async function queryDatabase(sql, values) {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

app.put("/partner-update/:hotelId", (req, res) => {
  const hotelId = req.params.hotelId;
  console.log(hotelId);
  const {
    hotelName,
    hotelLocation,
    hotelCategory,
    hotelDescription,
    // hotelImage,
  } = req.body;

  console.log(req.body);

  const sqlUpdateHotel =
    "UPDATE hotels SET Category_id=?, Hotel_Name=?, Hotel_Location=?, Description=? WHERE Hotel_id=?";
  db.query(
    sqlUpdateHotel,
    [
      hotelCategory,
      hotelName,
      hotelLocation,
      hotelDescription,
      // hotelImage,
      hotelId,
    ],
    (error, result) => {
      if (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
      } else {
        res.status(200).json({ message: "Hotel updated successfully" });
      }
    }
  );
});

app.delete("/partner-delete/:hotelId", (req, res) => {
  const hotelId = req.params.hotelId;
  const sqlDeleteHotelImages = "DELETE FROM images_hotels WHERE Hotel_id=?";
  db.query(sqlDeleteHotelImages, [hotelId], (error, result) => {
    if (error) {
      res.status(500).json({ error: error.message });
      console.log(error.message);
    } else {
      const sqlDeleteHotel = "DELETE FROM hotels WHERE Hotel_id=?";
      db.query(sqlDeleteHotel, [hotelId], (error, result) => {
        if (error) {
          res.status(500).json({ error: error.message });
          console.log(error.message);
        } else {
          res.status(200).json({ message: "Hotel deleted successfully" });
        }
      });
    }
  });
});

app.put("/partner-update/:hotelId", (req, res) => {
  const hotelId = req.params.hotelId;
  console.log(hotelId);
  const {
    hotelName,
    hotelLocation,
    hotelCategory,
    hotelDescription,
    // hotelImage,
  } = req.body;

  console.log(req.body);

  const sqlUpdateHotel =
    "UPDATE hotels SET Category_id=?, Hotel_Name=?, Hotel_Location=?, Description=? WHERE Hotel_id=?";
  db.query(
    sqlUpdateHotel,
    [
      hotelCategory,
      hotelName,
      hotelLocation,
      hotelDescription,
      // hotelImage,
      hotelId,
    ],
    (error, result) => {
      if (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
      } else {
        res.status(200).json({ message: "Hotel updated successfully" });
      }
    }
  );
});

app.patch("/typeroom-update/:typeroomId", (req, res) => {
  const typeroomId = req.params.typeroomId;

  const {
    typeroomName,
    typeroomStyle,
    maxLoad,
    typeroomPrice,
    typeroomInterior,
    selectedImages,
  } = req.body;

  const sqlUpdateTypeRoom =
    "UPDATE type_rooms SET TypeRoom_Name=?, TypeRoom_Style=?, TypeRoom_Price=?, MaxLoad=? WHERE TypeRoom_id=?";

  db.query(
    sqlUpdateTypeRoom,
    [typeroomName, typeroomStyle, typeroomPrice, maxLoad, typeroomId],
    (error, result) => {
      if (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
      } else {
        const sqlDeleteInterior =
          "DELETE FROM room_interior WHERE TypeRoom_id=?";
        db.query(sqlDeleteInterior, [typeroomId], (error, deleteResult) => {
          if (error) {
            res.status(500).json({ error: error.message });
            console.log(error.message);
          } else {
            const sqlInsertInterior =
              "INSERT INTO room_interior (Interior_name, TypeRoom_id) VALUES ?";
            const interiorDataArray = [];
            for (const interiorName of typeroomInterior) {
              interiorDataArray.push([interiorName, typeroomId]);
            }
            db.query(
              sqlInsertInterior,
              [interiorDataArray],
              (error, insertResult) => {
                if (error) {
                  res.status(500).json({ error: error.message });
                  console.log(error.message);
                } else {
                  res
                    .status(200)
                    .json({ message: "Type room updated successfully" });
                }
              }
            );
          }
        });
      }
    }
  );
});

app.delete("/typeroom-delete/:typeroomId", (req, res) => {
  const typeroomId = req.params.typeroomId;
  const sqlDeleteHotelImages =
    "DELETE FROM images_typeroom WHERE TypeRoom_id=?";
  db.query(sqlDeleteHotelImages, [typeroomId], (error, result) => {
    if (error) {
      res.status(500).json({ error: error.message });
      console.log(error.message);
    } else {
      const sqlDeleteHotel = "DELETE FROM room_interior WHERE TypeRoom_id=?";
      db.query(sqlDeleteHotel, [typeroomId], (error, result) => {
        if (error) {
          res.status(500).json({ error: error.message });
          console.log(error.message);
        } else {
          const sqlDeleteHotel = "DELETE FROM rooms WHERE TypeRoom_id=?";
          db.query(sqlDeleteHotel, [typeroomId], (error, result) => {
            if (error) {
              res.status(500).json({ error: error.message });
              console.log(error.message);
            } else {
              const sqlDeleteHotel =
                "DELETE FROM type_rooms WHERE TypeRoom_id=?";
              db.query(sqlDeleteHotel, [typeroomId], (error, result) => {
                if (error) {
                  res.status(500).json({ error: error.message });
                  console.log(error.message);
                } else {
                  res
                    .status(200)
                    .json({ message: "Hotel deleted successfully" });
                }
              });
            }
          });
        }
      });
    }
  });
});

app.post("/sendemail", (req, res) => {
  const { emailveri } = req.body;
  console.log(emailveri);

  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 8081,
    secure: true,
    service: "gmail",
    auth: {
      user: "leehuynmintc30@gmail.com",
      pass: "sibsofxlfulxatkj",
    },
  });

  async function sendEmail() {
    try {
      const info = await transporter.sendMail({
        from: "leehuynmintc30@gmail.com",
        to: `${emailveri}`,
        subject: "VERIFIED",
        text: "",
        html: "<b>Vui lòng xác minh tài khoản</br>http://localhost:3000/verified</b>",
      });

      console.log("success");
      return res.json("Gửi thành công");
    } catch (err) {
      console.error(err);
      return res.json("Fail");
    }
  }

  sendEmail();
});

app.post("/verified", (req, res) => {
  const sql =
    "UPDATE `users` SET `email_verified_at` = ? WHERE `users`.`User_Email` = ?";
  db.query(
    sql,
    [req.body.timeveri, req.body.emailveri],
    (checkErrUp, checkResultUp) => {
      if (checkErrUp) return res.json("Error");
      else {
        return res.json("Xác minh thành công");
      }
    }
  );
});

app.post("/sendemailpart", (req, res) => {
  const { emailveripart } = req.body;
  console.log(emailveripart);

  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 8081,
    secure: true,
    service: "gmail",
    auth: {
      user: "leehuynmintc30@gmail.com",
      pass: "sibsofxlfulxatkj",
    },
  });

  async function sendEmail() {
    try {
      const info = await transporter.sendMail({
        from: "leehuynmintc30@gmail.com",
        to: `${emailveripart}`,
        subject: "VERIFIED",
        text: "",
        html: "<b>Vui lòng xác minh tài khoản\nhttp://localhost:3000/verifiedpart</b>",
      });

      console.log("success");
    } catch (err) {
      console.error(err);
      return res.json("Fail");
    }
  }  

  sendEmail();
  return res.json("Gửi thành công");
});

app.post("/verifiedpart", (req, res) => {
  const sql =
    "UPDATE partners SET Partner_verified = ? WHERE partners.Partner_Email = ?";
  db.query(
    sql,
    [req.body.timeveri, req.body.emailveripart],
    (checkErrUp, checkResultUp) => {
      if (checkErrUp) return res.json("Error");
      else {
        return res.json("Xác minh thành công");
      }
    }
  );
});

app.post("/forgetMK", (req, res) => {
  const sql = "SELECT * FROM users WHERE User_Email =?";
  db.query(sql, [req.body.emailforget], (checkErrsql, checkResultsql) => {
    if (checkErrsql) return res.json("Error");
    if (checkResultsql.length > 0) {
      const user = checkResultsql[0];
      const userPassword = user.User_Password;

      const transporter = nodemailer.createTransport({
        host: "localhost",
        port: 8081,
        secure: true,
        service: "gmail",
        auth: {
          user: "leehuynmintc30@gmail.com",
          pass: "sibsofxlfulxatkj",
        },
      });

      async function sendEmail() {
        try {
          const info = await transporter.sendMail({
            from: "leehuynmintc30@gmail.com",
            to: `${req.body.emailforget}`,
            subject: "Mật khẩu Mytour",
            text: "",
            html: `<b>Mật khẩu của Mytour: ${userPassword}</b>`,
          });
        } catch (err) {
          console.error(err);
          return res.json("Fail");
        }
      }

      sendEmail();
      return res.json("Success");
    } else {
      return res.json("Fail");
    }
  });
});

app.post("/checkhotel", (req, res) => {
  const sql = "UPDATE `hotels` SET `status` = 1 WHERE `hotels`.`Hotel_id` = ?";
  db.query(sql, [req.body.hotelid], (checkErrUp, checkResultUp) => {
    if (checkErrUp) return res.json("Error");
    else {
      const partneremail = req.body.emailparttt;
      const hotelname = req.body.hotelnamett;


      const transporter = nodemailer.createTransport({
        host: "localhost",
        port: 8081,
        secure: true,
        service: "gmail",
        auth: {
          user: "leehuynmintc30@gmail.com",
          pass: "sibsofxlfulxatkj",
        },
      });

      async function sendEmail() {
        try {
          await transporter.sendMail({
            from: "leehuynmintc30@gmail.com",
            to: `${partneremail}`,
            subject: "Thông báo từ Mytour",
            text: "",
            html: `<b>${hotelname} đã được duyệt!</b>`,
          });
        } catch (err) {
          console.error(err);
          return res.json("Fail");
        }
      }

      sendEmail();
      return res.json("Duyệt thành công");
    }
  });
});

app.post("/uncheckhotel", (req, res) => {
  const sql = "UPDATE `hotels` SET `status` = 0 WHERE `hotels`.`Hotel_id` = ?";
  db.query(sql, [req.body.hotelid], (checkErrUp, checkResultUp) => {
    if (checkErrUp) return res.json("Error");
    else {
      const partneremail = req.body.emailparttt;
      const hotelname = req.body.hotelnamett;


      const transporter = nodemailer.createTransport({
        host: "localhost",
        port: 8081,
        secure: true,
        service: "gmail",
        auth: {
          user: "leehuynmintc30@gmail.com",
          pass: "sibsofxlfulxatkj",
        },
      });

      async function sendEmail() {
        try {
          await transporter.sendMail({
            from: "leehuynmintc30@gmail.com",
            to: `${partneremail}`,
            subject: "Thông báo từ Mytour",
            text: "",
            html: `<b>${hotelname} đã bị từ chối! <br/>Mọi thắc mắc vui lòng liên hệ 0246838583</b>`,
          });
        } catch (err) {
          console.error(err);
          return res.json("Fail");
        }
      }

      sendEmail();
      return res.json("Hủy duyệt thành công");
    }
  });
});	

app.post("/gethotelimages", (req, res) => {
  const sql =
    "SELECT * FROM `images_hotels` WHERE `images_hotels`.`Hotel_id` =? ";
  db.query(sql, [req.body.hotelIdImg], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.post("/showloaihotel", (req, res) => {
  const sql = "SELECT * FROM hotel_category";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.post("/addCateHotel", (req, res) => {
  const sql = "INSERT INTO hotel_category (Category_Name) VALUES (?)";
  db.query(sql, [req.body.tenLHT], (err, data) => {
    if (err) return res.json("Error");
    else {
      return res.json("Thêm thành công");
    }
  });
});

app.post("/upCateHotel", (req, res) => {
  const sql =
    "UPDATE `hotel_category` SET `Category_Name` = ? WHERE `hotel_category`.`Category_id` = ?";
  db.query(
    sql,
    [req.body.tenLHT, req.body.idLHT],
    (checkErrUp, checkResultUp) => {
      if (checkErrUp) return res.json("Error");
      else {
        return res.json("Sửa thành công");
      }
    }
  );
});

app.post("/deleteCateHotel", (req, res) => {
  const checkhotels =
    "SELECT COUNT(*) AS count FROM hotels WHERE Category_id = ?";
  db.query(
    checkhotels,
    [req.body.idLHT],
    (checkErrhotels, checkResulthotels) => {
      if (checkErrhotels) {
        return res.json("Error");
      } else {
        const existhotels = checkResulthotels[0].count;
        if (existhotels > 0) {
          return res.json("Mã loại này đang được Hotels sử dụng");
        } else {
          const sql =
            "Delete From `hotel_category` WHERE `hotel_category`.`Category_id` = ?;";
          db.query(sql, [req.body.idLHT], (checkErr, checkResult) => {
            if (checkErrhotels) {
              return res.json("Error");
            } else {
              return res.json("Xóa thành công");
            }
          });
        }
      }
    }
  );
});


//repair
app.post("/searchhtidpart", (req, res) => {
  const searchsql = "SELECT hotels.*, ( SELECT COUNT(*)FROM reviews WHERE reviews.Hotel_id = hotels.Hotel_id ) AS review_count, partners.Partner_Email FROM hotels JOIN partners ON hotels.Partner_id = partners.Partner_id WHERE hotels.Partner_id = ? OR hotels.Hotel_Name LIKE ?";
  const searchTerm = `%${req.body.tenhtsearchht}%`;
  db.query(
    searchsql,
    [req.body.idpartsearchht, searchTerm],
    (checkErrSearch, checkResultSearch) => {
      if (checkErrSearch) return res.json("Error");
      if (checkResultSearch.length > 0) {
        return res.json(checkResultSearch);
      } else {
        return res.json("Not find");
      }
    }
  );
});

app.post("/showtyperooms", (req, res) => {
  const sql =
    "SELECT type_rooms.*, hotels.Hotel_Name FROM type_rooms JOIN hotels ON type_rooms.Hotel_id = hotels.Hotel_id";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
    }
  });
});

app.post("/gettyperoomimages", (req, res) => {
  const sql =
    "SELECT * FROM `images_typeroom` WHERE `images_typeroom`.`TypeRoom_id` =? ";
  db.query(sql, [req.body.typeroomIdImg], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.post("/gettyperoominteriors", (req, res) => {
  const sql =
    "SELECT * FROM `room_interior` WHERE `room_interior`.`TypeRoom_id` =? ";
  db.query(sql, [req.body.typeroomIdInterior], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.post("/checktyperoom", (req, res) => {
  const sql =
    "UPDATE `type_rooms` SET `status` = 1 WHERE `type_rooms`.`TypeRoom_id` = ?";
  db.query(sql, [req.body.typeroomid], (checkErrUp, checkResultUp) => {
    if (checkErrUp) return res.json("Error");
    else {
      const sqlselect =
        "SELECT type_rooms.*, hotels.Partner_id, partners.Partner_Email FROM type_rooms  JOIN hotels ON type_rooms.Hotel_id = hotels.Hotel_id JOIN partners ON partners.Partner_id = hotels.Partner_id WHERE type_rooms.TypeRoom_id = ?";
      db.query(sqlselect, [req.body.typeroomid], (err, data) => {
        if (err) return res.json("Error");
        else if(data.length>0){
          const partneremail = data[0].Partner_Email;
          const typeroomname = data[0].TypeRoom_Name;


          const transporter = nodemailer.createTransport({
            host: "localhost",
            port: 8081,
            secure: true,
            service: "gmail",
            auth: {
              user: "leehuynmintc30@gmail.com",
              pass: "sibsofxlfulxatkj",
            },
          });

          async function sendEmail() {
            try {
              await transporter.sendMail({
                from: "leehuynmintc30@gmail.com",
                to: `${partneremail}`,
                subject: "Thông báo từ Mytour",
                text: "",
                html: `<b>${typeroomname} đã được duyệt!</b>`,
              });
            } catch (err) {
              console.error(err);
              return res.json("Fail");
            }
          }

          sendEmail();
        }
        else{
          console.log("Not found")
        }
      });

      return res.json("Duyệt thành công");
    }
  });
});


app.post("/unchecktyperoom", (req, res) => {
  const sql =
    "UPDATE `type_rooms` SET `status` = 0 WHERE `type_rooms`.`TypeRoom_id` = ?";
  db.query(sql, [req.body.typeroomid], (checkErrUp, checkResultUp) => {
    if (checkErrUp) return res.json("Error");
    else {
      const sqlselect =
        "SELECT type_rooms.*, hotels.Partner_id, partners.Partner_Email FROM type_rooms  JOIN hotels ON type_rooms.Hotel_id = hotels.Hotel_id JOIN partners ON partners.Partner_id = hotels.Partner_id WHERE type_rooms.TypeRoom_id = ?";
      db.query(sqlselect, [req.body.typeroomid], (err, data) => {
        if (err) return res.json("Error");
        else if(data.length>0){
          const partneremail = data[0].Partner_Email;
          const typeroomname = data[0].TypeRoom_Name;


          const transporter = nodemailer.createTransport({
            host: "localhost",
            port: 8081,
            secure: true,
            service: "gmail",
            auth: {
              user: "leehuynmintc30@gmail.com",
              pass: "sibsofxlfulxatkj",
            },
          });

          async function sendEmail() {
            try {
              await transporter.sendMail({
                from: "leehuynmintc30@gmail.com",
                to: `${partneremail}`,
                subject: "Thông báo từ Mytour",
                text: "",
                html: `<b>${typeroomname} đã bị từ chối! <br/>Mọi thắc mắc vui lòng liên hệ 0246838583</b>`,
              });
            } catch (err) {
              console.error(err);
              return res.json("Fail");
            }
          }

          sendEmail();
        }
        else{
          console.log("Not found")
        }
      });

      return res.json("Hủy duyệt thành công");
    }
  });
});




app.post("/showrooms", (req, res) => {
  const sql =
    "SELECT rooms.*, type_rooms.TypeRoom_Name FROM rooms JOIN type_rooms ON rooms.TypeRoom_id = type_rooms.TypeRoom_id";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
    }
  });
});

app.post("/checkroom", (req, res) => {
  const sql = "UPDATE `rooms` SET `status` = 1 WHERE `rooms`.`Room_id` = ?";
  db.query(sql, [req.body.roomid], (checkErrUp, checkResultUp) => {
    if (checkErrUp) return res.json("Error");
    else {
      return res.json("Duyệt thành công");
    }
  });
});

app.post("/uncheckroom", (req, res) => {
  const sql = "UPDATE `rooms` SET `status` = 0 WHERE `rooms`.`Room_id` = ?";
  db.query(sql, [req.body.roomid], (checkErrUp, checkResultUp) => {
    if (checkErrUp) return res.json("Error");
    else {
      return res.json("Hủy duyệt thành công");
    }
  });
});

app.post("/searchroomidroom", (req, res) => {
  const searchsql =
    "SELECT rooms.*, type_rooms.TypeRoom_Name FROM rooms JOIN type_rooms ON rooms.TypeRoom_id = type_rooms.TypeRoom_id WHERE `rooms`.Room_id = ?";
  db.query(
    searchsql,
    [req.body.idroomsearchr],
    (checkErrSearch, checkResultSearch) => {
      if (checkErrSearch) return res.json("Error");
      if (checkResultSearch.length > 0) {
        return res.json(checkResultSearch);
      } else {
        return res.json("Not find");
      }
    }
  );
});

app.post("/searchroomidtype", (req, res) => {
  const searchsql =
    "SELECT rooms.*, type_rooms.TypeRoom_Name FROM rooms JOIN type_rooms ON rooms.TypeRoom_id = type_rooms.TypeRoom_id WHERE `rooms`.TypeRoom_id = ?";
  db.query(
    searchsql,
    [req.body.idtypesearchr],
    (checkErrSearch, checkResultSearch) => {
      if (checkErrSearch) return res.json("Error");
      if (checkResultSearch.length > 0) {
        return res.json(checkResultSearch);
      } else {
        return res.json("Not find");
      }
    }
  );
});

app.post("/checkallidtype", (req, res) => {
  const sql = "UPDATE `rooms` SET `status` = 1 WHERE `rooms`.`TypeRoom_id` = ?";
  db.query(sql, [req.body.idtypecheckall], (checkErr, checkResult) => {
    if (checkErr) return res.json("Error");
    else {
      return res.json("Duyệt thành công");
    }
  });
});

app.post("/uncheckallidtype", (req, res) => {
  const sql = "UPDATE `rooms` SET `status` = 0 WHERE `rooms`.`TypeRoom_id` = ?";
  db.query(sql, [req.body.idtypecheckall], (checkErr, checkResult) => {
    if (checkErr) return res.json("Error");
    else {
      return res.json("Hủy duyệt thành công");
    }
  });
});

app.post("/checkexiststype", (req, res) => {
  const sql = "SELECT * FROM rooms WHERE TypeRoom_id = ?";
  db.query(sql, [req.body.idtypecheckall], (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json("Exists");
    } else {
      return res.json("Not exists");
    }
  });
});

app.post("/showpartner", (req, res) => {
  const sql = "SELECT * FROM partners";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
    }
  });
});

app.post("/selectpartnerbyid", (req, res) => {
  const sql = "SELECT * FROM partners WHERE Partner_id = ?";
  db.query(sql, [req.body.idpartner], (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    }
  });
});

app.post("/checkpartner", (req, res) => {
  const sql = "UPDATE partners SET status = 1 WHERE Partner_id = ?";
  db.query(sql, [req.body.partnerid], (checkErrUp, checkResultUp) => {
    if (checkErrUp) return res.json("Error");
    else {
      return res.json("Duyệt thành công");
    }
  });
});

app.post("/uncheckpartner", (req, res) => {
  const sql = "UPDATE partners SET status = 2 WHERE Partner_id = ?";
  db.query(sql, [req.body.partnerid], (checkErrUp, checkResultUp) => {
    if (checkErrUp) return res.json("Error");
    else {
      return res.json("Từ chối thành công");
    }
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/uploadcccd", upload.single("cccd"), (req, res) => {
  res.json("File uploaded successfully!");
});

app.post("/uploadlistense", upload.single("license"), (req, res) => {
  res.json("File uploaded successfully!");
});

app.post("/forgetMKpartner", (req, res) => {
  const sql = "SELECT * FROM partners WHERE Partner_Email =?";
  db.query(sql, [req.body.emailforgetpart], (checkErrsql, checkResultsql) => {
    if (checkErrsql) return res.json("Error");
    if (checkResultsql.length > 0) {
      const partner = checkResultsql[0];
      const partnerPassword = partner.Partner_Password;

      const transporter = nodemailer.createTransport({
        host: "localhost",
        port: 8081,
        secure: true,
        service: "gmail",
        auth: {
          user: "leehuynmintc30@gmail.com",
          pass: "sibsofxlfulxatkj",
        },
      });

      async function sendEmail() {
        try {
          await transporter.sendMail({
            from: "leehuynmintc30@gmail.com",
            to: `${req.body.emailforgetpart}`,
            subject: "Mật khẩu Mytour",
            text: "",
            html: `<b>Mật khẩu của Mytour: ${partnerPassword}</b>`,
          });
        } catch (err) {
          console.error(err);
          return res.json("Fail");
        }
      }

      sendEmail();
      return res.json("Success");
    } else {
      return res.json("Fail");
    }
  });
});

app.post("/searchidpart", (req, res) => {
  const searchsql =
    "SELECT * FROM partners WHERE Partner_Email = ? OR Partner_Phone = ?";
  db.query(
    searchsql,
    [req.body.emailpartsearch, req.body.sdtpartsearch],
    (checkErrSearch, checkResultSearch) => {
      if (checkErrSearch) return res.json("Error");
      if (checkResultSearch.length > 0) {
        return res.json(checkResultSearch);
      } else {
        return res.json("Not find");
      }
    }
  );
});

app.post("/sendemailcheckpart", (req, res) => {
  const { partneremail } = req.body;
  console.log(partneremail);

  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 8081,
    secure: true,
    service: "gmail",
    auth: {
      user: "leehuynmintc30@gmail.com",
      pass: "sibsofxlfulxatkj",
    },
  });

  async function sendEmail() {
    try {
      const info = await transporter.sendMail({
        from: "leehuynmintc30@gmail.com",
        to: `${partneremail}`,
        subject: "VERIFIED",
        text: "",
        html: "<b>Tài khoản của bạn đã được duyệt</b>",
      });

      console.log("success");
      return res.json("Gửi thành công");
    } catch (err) {
      console.error(err);
      return res.json("Fail");
    }
  }

  sendEmail();
});

app.post("/sendemailuncheckpart", (req, res) => {
  const { partneremail } = req.body;
  console.log(partneremail);

  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 8081,
    secure: true,
    service: "gmail",
    auth: {
      user: "leehuynmintc30@gmail.com",
      pass: "sibsofxlfulxatkj",
    },
  });

  async function sendEmail() {
    try {
      const info = await transporter.sendMail({
        from: "leehuynmintc30@gmail.com",
        to: `${partneremail}`,
        subject: "VERIFIED",
        text: "",
        html: "<b>Tài khoản của bạn đã bị từ chối<br/>Mọi thắc mắc vui lòng liên hệ 0246838583</b>",
      });

      console.log("success");
      return res.json("Gửi thành công");
    } catch (err) {
      console.error(err);
      return res.json("Fail");
    }
  }

  sendEmail();
});

app.post("/checkpass", (req, res) => {
  const sql = "SELECT * FROM users WHERE User_id = ? and User_Password = ?";
  db.query(sql, [req.body.iduser, req.body.matkhauxn], (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json("Fail");
    }
  });
});

app.post("/updatettuser", (req, res) => {
  const checkEmail =
    "SELECT COUNT(*) AS count FROM users WHERE User_Email = ? AND User_id <> ?";
  const checkSdt =
    "SELECT COUNT(*) AS count FROM users WHERE User_Phone = ? AND User_id <> ?";
  const checkEmailpart =
    "SELECT COUNT(*) AS count FROM partners WHERE Partner_Email = ?";
  const checkSdtpart =
    "SELECT COUNT(*) AS count FROM partners WHERE Partner_Phone = ?";

  db.query(
    checkEmail,
    [req.body.email, req.body.iduser],
    (checkErrEmail, checkResultEmail) => {
      if (checkErrEmail) {
        return res.json("Error");
      }
      db.query(
        checkSdt,
        [req.body.sdt, req.body.iduser],
        (checkErrSdt, checkResultSdt) => {
          if (checkErrSdt) {
            return res.json("Error");
          }
          db.query(
            checkEmailpart,
            [req.body.email, req.body.iduser],
            (checkErrEmailPart, checkResultEmailPart) => {
              if (checkErrEmailPart) {
                return res.json("Error");
              }
              db.query(
                checkSdtpart,
                [req.body.sdt, req.body.iduser],
                (checkErrSdtPart, checkResultSdtPart) => {
                  if (checkErrSdtPart) {
                    return res.json("Error");
                  }
                  const existemail = checkResultEmail[0].count;
                  const existsdt = checkResultSdt[0].count;
                  const existemailpart = checkResultEmailPart[0].count;
                  const existsdtpart = checkResultSdtPart[0].count;
                  if (
                    (existemail > 0 || existemailpart > 0) &&
                    existsdt == 0 &&
                    existsdtpart == 0
                  ) {
                    console.log("Email đã tồn tại");
                    return res.json("Email đã tồn tại");
                  } else if (
                    (existsdt > 0 || existsdtpart > 0) &&
                    existemail == 0 &&
                    existemailpart == 0
                  ) {
                    console.log("Số điện thoại đã tồn tại");
                    return res.json("Số điện thoại đã tồn tại");
                  } else if (
                    (existsdt > 0 || existsdtpart > 0) &&
                    (existemail > 0 || existemailpart > 0)
                  ) {
                    console.log("Email và số điện thoại đã tồn tại");
                    return res.json("Email và số điện thoại đã tồn tại");
                  } else {
                    const updatesql =
                      "UPDATE `users` SET `User_Name` = ?, `User_Email` = ?, `User_Phone` = ? WHERE `users`.`User_id` = ?;";
                    db.query(
                      updatesql,
                      [
                        req.body.hoten,
                        req.body.email,
                        req.body.sdt,
                        req.body.iduser,
                      ],
                      (updateErr, updateResult) => {
                        if (updateErr) {
                          console.log("Error");
                        } else {
                          return res.json("Thay đổi thành công");
                        }
                      }
                    );
                  }
                }
              );
            }
          );
        }
      );
    }
  );
});

app.post("/updatenewMK", (req, res) => {
  const sql = "SELECT * FROM users WHERE User_id = ? and User_Password = ?";
  db.query(sql, [req.body.iduser, req.body.matkhauxn], (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      const sql = "UPDATE users SET User_Password = ? WHERE User_id = ?";
      db.query(
        sql,
        [req.body.matkhaumoi, req.body.iduser],
        (checkErrUp, checkResultUp) => {
          if (checkErrUp) return res.json("Error");
          else {
            return res.json("Thay đổi thành công");
          }
        }
      );
    } else {
      return res.json("Mật khẩu cũ không đúng");
    }
  });
});

app.post("/sortprice", (req, res) => {
  const sql = `SELECT type_rooms.*, hotels.Hotel_Name FROM type_rooms JOIN hotels ON type_rooms.Hotel_id = hotels.Hotel_id ORDER By type_rooms.TypeRoom_Price ${req.body.orderby}`;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

//repair
app.post("/showdoanhthu", (req, res) => {
  const sql = "SELECT orders.*, hotels.Hotel_Name, type_rooms.TypeRoom_Name, rooms.Room_Name FROM orders JOIN hotels ON orders.Hotel_id = hotels.Hotel_id JOIN type_rooms ON type_rooms.TypeRoom_id = orders.TypeRoom_id JOIN rooms ON rooms.Room_id = orders.Room_id;";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
    }
  });
});

//repair
app.get("/showOrderDone", (req, res) => {
  const sql = "SELECT orders.*, hotels.Hotel_Name, type_rooms.TypeRoom_Name, rooms.Room_Name FROM orders JOIN hotels ON orders.Hotel_id = hotels.Hotel_id JOIN type_rooms ON type_rooms.TypeRoom_id = orders.TypeRoom_id JOIN rooms ON rooms.Room_id = orders.Room_id;";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});
//repair
app.post('/uploadhotel', upload.single('imghotel'), (req, res) => {
  res.json("File uploaded successfully!");
});

//repair
app.post("/showcomment", (req, res) => {
  const sql = "SELECT reviews.*, users.User_Email, hotels.Hotel_Name FROM reviews JOIN users ON reviews.User_id = users.User_id JOIN hotels ON reviews.Hotel_id = hotels.Hotel_id";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
    }
  });
});

//repair
app.post("/deletecomment", (req, res) => {
  const deletesql =
    "Delete From reviews WHERE Review_id = ?;";
  db.query(
    deletesql,
    [req.body.idcmt],
    (deleteErr, deleteResult) => {
      if (deleteErr) {
        console.log(deleteErr);
      } else {
        return res.json("Xóa thành công");
      }
    }
  );
});

//repair
app.post("/searchrating", (req, res) => {
  const searchsql = "SELECT reviews.*, users.User_Email, hotels.Hotel_Name FROM reviews JOIN users ON reviews.User_id = users.User_id JOIN hotels ON reviews.Hotel_id = hotels.Hotel_id Where reviews.Rating =?";
  db.query(
    searchsql,
    [req.body.ratingcmt],
    (checkErrSearch, checkResultSearch) => {
      if (checkErrSearch) return res.json("Error");
      if (checkResultSearch.length > 0) {
        return res.json(checkResultSearch);
      } else {
        return res.json("Not find");
      }
    }
  );
});
//repair
app.post("/searchidusercmt", (req, res) => {
  const searchsql = "SELECT reviews.*, users.User_Email, hotels.Hotel_Name FROM reviews JOIN users ON reviews.User_id = users.User_id JOIN hotels ON reviews.Hotel_id = hotels.Hotel_id Where users.User_Email =?";
  db.query(
    searchsql,
    [req.body.emailusercmt],
    (checkErrSearch, checkResultSearch) => {
      if (checkErrSearch) return res.json("Error");
      if (checkResultSearch.length > 0) {
        return res.json(checkResultSearch);
      } else {
        return res.json("Not find");
      }
    }
  );
});
//repair
app.post("/searchidhotelcmt", (req, res) => {
  const searchsql = "SELECT reviews.*, users.User_Email, hotels.Hotel_Name FROM reviews JOIN users ON reviews.User_id = users.User_id JOIN hotels ON reviews.Hotel_id = hotels.Hotel_id Where reviews.Hotel_id =?";
  db.query(
    searchsql,
    [req.body.idhotelcmt],
    (checkErrSearch, checkResultSearch) => {
      if (checkErrSearch) return res.json("Error");
      if (checkResultSearch.length > 0) {
        return res.json(checkResultSearch);
      } else {
        return res.json("Not find");
      }
    }
  );
});

//repair
app.post('/addVideo', (req, res) => {
  const sql =
    "UPDATE videos SET Status = 0";
  db.query(
    sql,
    [req.body.timeveri, req.body.emailveri],
    (checkErrUp, checkResultUp) => {
      if (checkErrUp) return res.json("Error");
      else {
        const insertQuery = `INSERT INTO videos (Video_clip,Status) VALUES (?,1)`;
        db.query(insertQuery, [req.body.namevideo], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Thêm video thành công');
            res.json('Thêm video thành công')
          }
        });
      }
    }
  );
});

//repair
app.post('/uploadvideo', upload.single('videoclip'), (req, res) => {
  res.json("Thêm video thành công");
});

//repair
app.post("/showvideohome", (req, res) => {
  const sql = "SELECT * FROM videos where Status = 1";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
    }
  });
});


//repair
app.post('/addanhnen', (req, res) => {
  const insertQuery = `INSERT INTO images (Images_url) VALUES (?)`;
  db.query(insertQuery, [req.body.nameanh], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Thêm ảnh thành công');
      res.json('Thêm ảnh thành công')
    }
  });
});

//repair
app.post('/uploadanhnen', upload.single('anhnen'), (req, res) => {
  res.json("Thêm ảnh thành công");
});

//repair
app.post("/showanhnen", (req, res) => {
  const sql = "SELECT * FROM images where Status = 1";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } else {
    }
  });
});

//repair
app.post("/showvideoadmin", (req, res) => {
  const sql = "SELECT * FROM videos";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } 
  });
});

//repair
app.post("/showanhadmin", (req, res) => {
  const sql = "SELECT * FROM images";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    } 
  });
});

app.post("/getvideocheck", (req, res) => {
  const sql =
    "SELECT * FROM videos WHERE Video_id =? ";
  db.query(sql, [req.body.videoid], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.post("/getanhnencheck", (req, res) => {
  const sql =
    "SELECT * FROM images WHERE Images_id =? ";
  db.query(sql, [req.body.idanhnen], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.post("/checkvideo", (req, res) => {
  const sql = "UPDATE videos SET status = 0";
  db.query(sql, (checkErrUp, checkResultUp) => {
    if (checkErrUp) return res.json("Error");
    else {
      const sql1 = "UPDATE videos SET status = 1 WHERE Video_id = ?";
      db.query(sql1, [req.body.idvideocheck], (checkErrUp1, checkResultUp1) => {
        if (checkErrUp1) return res.json("Error");
        else {
          return res.json("Đổi thành công");
        }
      });
    }
  });

});

app.post("/checkanhnen", (req, res) => {
  const sql = "UPDATE images SET status = 1 WHERE Images_id = ?";
  db.query(sql, [req.body.idanhnencheck], (checkErrUp, checkResultUp) => {
    if (checkErrUp) return res.json("Error");
    else {
      return res.json("Duyệt thành công");
    }
  });
});

app.post("/uncheckanhnen", (req, res) => {
  const checkcountimages = "SELECT COUNT(*) AS count FROM images WHERE Status = 1";
    db.query(checkcountimages, (checkErrcount, checkResultcount) => {
    if (checkErrcount) return res.json("Error");
    else {
      const existsiamages = checkResultcount[0].count;
      if(existsiamages >3){
        const sql = "UPDATE images SET status = 0 WHERE Images_id = ?";
        db.query(sql, [req.body.idanhnencheck], (checkErrUp, checkResultUp) => {
          if (checkErrUp) return res.json("Error");
          else {
            return res.json("Hủy duyệt thành công");
          }
        });
      }
      else{
        return res.json("Tối thiểu 3")
      }
    }
  });
});

app.listen(8081, () => {
  console.log("Connected!");
});
