const fs = require('fs')


function add(data) {

  if (!fs.existsSync('./db.json')) { fs.writeFileSync('./db.json', JSON.stringify([])) }

  const todosString = fs.readFileSync('./db.json', 'utf8')
  const todoList = JSON.parse(todosString)
  
let lastIndex = todoList.length + 1;
todoList.forEach(element => {
 if(element.id == lastIndex)
 {
  lastIndex++;
 }
});
  const todo = {
    id: lastIndex, // last element in todoli st.id + 1,, 
    title: data.title,
    body: data.body,
    checked: false
  }

  todoList.push(todo)
  fs.writeFileSync('./db.json', JSON.stringify(todoList))
}

//----------------------------------------//
function edit(data) {
  console.log("edit");
  console.log(data);
  //read file todoList
  // loop map if data.id == elm.id  data and so on push and write  
  const todosString = fs.readFileSync('./db.json', 'utf8')
  const todoList = JSON.parse(todosString)
  todoList.map((elm) => {
    if (data.id == elm.id) {
      elm.title = data.title;
      elm.body = data.body;
    }

  }
  )
  fs.writeFileSync('./db.json', JSON.stringify(todoList))
}

//------------------------------------------------------------------//
function list(data) {
  // console.log("list");  
  console.log(data);
  const todosString = fs.readFileSync('./db.json', 'utf8')
  const todoList = JSON.parse(todosString)

  if (data.list == "all") {
   return(todoList)
  }
  else if (data.list == "checked") {
    return(todoList.filter(elm => elm.checked))

  }
  else if (data.list == "unchecked") {
    return(todoList.filter(elm =>! elm.checked))
  }
}
//--------------------------------------------------------//
function remove(data) {
  //console.log("remove");
  //console.log(data);
  const todosString = fs.readFileSync('./db.json', 'utf8')
  const todoList = JSON.parse(todosString)
  todoList.map((elm,index) => {
    if (data.id == elm.id) {
      todoList.splice(index, 1)
    }
  }
  )
  fs.writeFileSync('./db.json', JSON.stringify(todoList))
}
//----------------------------------------------------------------//
function checked(data) {
  const todosString = fs.readFileSync('./db.json', 'utf8')
  const todoList = JSON.parse(todosString)
  todoList.map((elm) => {
    if (elm.id == data.id) {
      elm.checked = true
      console.log("didddddd");
    }

})
fs.writeFileSync('./db.json', JSON.stringify(todoList))
}

function unchecked(data) {
  const todosString = fs.readFileSync('./db.json', 'utf8')
  const todoList = JSON.parse(todosString)
  todoList.map((elm) => {
    if (elm.id == data.id) {
      elm.checked = false
      // console.log("didddddd");
    }
})
fs.writeFileSync('./db.json', JSON.stringify(todoList))
}

module.exports = {
  add, edit, list, remove, checked, unchecked
}
//-------------------------------------------------------------//
