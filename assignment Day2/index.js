const express = require("express");
const helpers = require("./helpers");
const { fstat } = require("fs");
const { title } = require("process");
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

//-----call add ---------------
app.post("/todo", (req, res) => {
  const preparedData = {
    title: req.body.title,
    body: req.body.body,
  };
  helpers.add(preparedData);
  res.send("done");
});

//edit
//res.send("hello")
// const preparedData = {
//     title: req.body.title,
//     body: req.body.body
// }
// helpers.add(req.body);
// res.send("add done");
//})

//-----call edit---------------
app.put("/todo/:id", (req, res) => {
  const preparedData = {
    id: req.params.id,
    title: req.body.title,
    body: req.body.body,
  };
  helpers.edit(preparedData);
  res.send("edit done");
});

// //-----call remove -------------
app.delete("/todo/:id", (req, res) => {
  const preparedData = {
    id: req.params.id,
  };
  helpers.remove(preparedData); // helpers.
  res.send("remove done");
});

//-----call list ---------------
app.get("/todo", (req, res) => {
  console.log("type");
  const preparedData = {
    list: req.query.list,
  };
  const back = helpers.list(preparedData);
  res.send(back);

  res.send("list done");
});

//-----call checked ------------
// app.patch('/todo/:id/', (req,res)=>{
//     //console.log(req.query.name);
//     const preparedData = {id:req.params.id}
//     console.log("dddddd");
//     if (req.query.check == true){
//         helpers.checked(preparedData);
//         res.send("checked change done");
//     } else{
//         helpers.unchecked(preparedData);
//     }
// })

app.patch("/todo/:id", (req, res) => {
  const preparedData = {
    id: req.params.id,
  };
console.log(preparedData.id);
  if(req.query.check == "true") {
    helpers.checked(preparedData);
    return res.send("checked change done");
  } else {
    helpers.unchecked(preparedData);
    return res.send("unchecked change done");
  }
});

//node index.js checked id=2

// //----call unchecked -----------
// app.post('/req1',(req,res)=>{
//     res.send("hello")
//     helpers.add();
// })

app.listen(PORT, (err) => {
  if (!err) return console.log(`Server Starts at Port ${PORT}`);
  console.log(err);
});

//////////////////////////
