const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
//жишээ блогны апп-н back-end /API/ хэсэг
// доорх замыг сонсоод тус бүрт нь тохирох хариуг mysql баазаас шалгаж илгээнэ. "/api/user" нь хэрэглэгчийн мэдээлэл, "/api/" нь поснтны мэдээлэлийг хариуцна.  Mysql бааз нь user, post гэсэн 2 хүснэгттэй.
const app = express();
app.use(bodyParser.json());
app.use("front", express.static(path.join(__dirname, "./front")));

//shine post uusgeh
app.post("/api/create", async (req, res) => {
  console.log(req.body);
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "blog",
  });
  con.connect((err) => {
    if (err) throw err;
    console.log("connected via create");
    let createReq = req.body;
    // console.log("createReq title: " + createReq.title);
    let table = "post";
    let sql = `INSERT INTO ${table} (title,content, created_dt, create_user_id) VALUES ('${createReq.title}', '${createReq.content}', '${createReq.date}','${createReq.user}')`;
    try {
      con.query(sql, (err, result) => {
        res.send({ status: "Amjilttai /frm server/", result });
      });
    } catch {
      res.send({ status: "amjiltgui / frm server/", err });
    }
    // console.log(createReq);
  });

  //con.end();
});
//buh postnii medeelliig butsaah
app.get("/api/read", async (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "blog",
  });
  let table = "post";
  connection.connect();

  connection.query(`select * from ${table}`, (error, results, fields) => {
    if (error) {
      res.send({ status: "failed" });
      throw error;
    }
    res.send({ status: "ok", results });
    console.log("The solution is: ", results);
  });

  connection.end();
});
//tuhailsan 1 id r post nii medeelel butsaah===!
app.get("/api/read/:id", async (req, res) => {
  const { id = "" } = req.params || {};
  if (!id) {
    return res.send({ post: null, error: { message: "invalid parameter" } });
  }
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "blog",
  });
  let table = "post";
  con.connect((err) => {
    if (err) throw err;
    console.log("connected read id");
    const readReq = req.body;
    let counter, post;
    //`select id from ${table} limit ${readReq.limit}`;
    let sqlPost = `SELECT * FROM ${table}  where id = ${id} `;
    con.query(sqlPost, (err, result) => {
      if (err) {
        return res.send({ error: { message: err.message } });
      }
      // res.send(result);
      post = result[0] || null;
      console.log(post);
      return res.send({ post });
    });
  });
});
//irsen id nii hargalzah post iin delgerenguig butsaana/ post oor umnu ashiglaj bnsa/
app.post("/api/read/id", async (req, res) => {
  console.log(`id ni: ${req.body.id}`);
  let id = req.body.id;
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "blog",
  });
  let table = "post";
  connection.connect((err) => {
    if (err) throw err;
    console.log("read/id dotroos ");
    let sql = `SELECT * FROM ${table} WHERE id =${id}`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      let data1 = result;
      res.send(result);
      console.log(result);
    });
    connection.end();
  });
});
//irsen id deerh row g ustgah
app.delete("/api/delete", async (req, res) => {
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "blog",
  });
  con.connect((err) => {
    if (err) throw err;
    console.log("connected through delete");
    let deleteReq = req.body;
    console.log(`deleteReq.id===${deleteReq.id} `);
    let table = "post";
    var sql = `DELETE FROM ${table}  WHERE id = '${deleteReq.id}'`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
      console.log(`deleted`);
    });
    console.log(deleteReq.id);
  });
});
//irsen id deerh row g update hiih
app.put("/api/update", async (req, res) => {
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "blog",
  });
  con.connect((err) => {
    if (err) throw err;
    console.log("Connected through update");
    let updateReq = req.body;
    let table = "post";
    let sql = `UPDATE ${table} SET title='${updateReq.title}', content='${updateReq.content}' , update_user_id='${updateReq.user}' , updated_dt='${updateReq.date}' WHERE id='${updateReq.id}'`;
    try {
      con.query(sql, (err, result) => {
        if (err) console.log("aldaa", err);
        res.send({ status: "Server: amjilttai", result });
      });
    } catch {
      res.send({ status: "amjiltgui / frm server/", err });
    }
  });
});
// user table tei ajillah heseg
//buh user g butsaah

app.get("/api/user", async (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "blog",
  });
  // console.log(`req is ${req}`);
  let table = "user";
  connection.connect();

  connection.query(`select * from ${table}`, (error, results, fields) => {
    if (error) {
      res.send({ status: "failed" });
      throw error;
    }
    res.send({ status: "ok", results });
    console.log("The solution is: ", results);
  });

  connection.end();
});
//shine user uusgeh
app.post("/api/user/create", async (req, res) => {
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "blog",
  });
  con.connect((err) => {
    if (err) throw err;
    console.log("connected through user/create. body===", req.body);
    let createReq = req.body;
    let table = "user";
    let sql = `INSERT INTO ${table} (name, password, created_dt) VALUES ('${createReq.user}', '${createReq.pass}', '${createReq.mydate}')`;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.send({ status: "amjiltgui", err });
      }
      res.send({ status: "User amjilttai uuslee", result });
    });
  });
});

//login hiij bga user g tanih
app.post("/api/user/login", async (req, res) => {
  console.log("req.body ===" + JSON.stringify(req.body));
  let user = req.body.user;
  let password = req.body.password;
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "blog",
  });
  let table = "user";
  con.connect((err) => {
    if (err) console.log(err);
    console.log("api/user/login s holbogdov");
    let sql = `SELECT * FROM ${table} WHERE name='${user}'`;
    con.query(sql, (err, result) => {
      try {
        if (Object.keys(result[0]).length > 0) {
          if (password == result[0].password) {
            res.cookie("LOGIN", `${result[0].name}`, { domain: "blog.mn" });
            res.cookie("created_dt", `${result[0].created_dt}`, {
              domain: "blog.mn",
            });
            res.cookie("id", `${result[0].id}`, { domain: "blog.mn" });
            res.send({
              cookie: true,
              status: "amjilttai nevterlee",
              result: result[0],
            });
          } else {
            res.send({
              cookie: false,
              status: "Amjiltgui bolloo",
              result: null,
            });
          }
        }
      } catch {
        res.send({
          cookie: false,
          status: "Iim hereglegch oldsongui",
          result: null,
        });
      }
    });
  });
});
const port = 5501;

app.listen(port, (err) => {
  if (err) {
    logger.crit("app start err", err);
    return;
  }
  console.log("app started ...", port);
});
