const fs=require('fs')

function asyncReadFile(filePath,encoding)
{
return new Promise((resolve, reject) => {
    fs.readFile(filePath,encoding,(err,data)=>{
    if(!err){
    return resolve(data);
    }  
    reject(err)
})

}


}
function add(data)
{ 
    const readFile=fs.readFileSync("./db.json","utf-8");
    const todoList=JSON.parse(readFile);
    let  currentIndex;
    if(todoList.length==0){currentIndex=1}
    else{currentIndex=todoList[todoList.length-1].id+1;}
    const todo = {
    id:currentIndex,
    title:data.title,
    body:data.body,
    checked: false,
  };
  todoList.push(todo);
 fs.writeFileSync('./db.json',JSON.stringify(todoList));
}
function edit(data)
{
    const readFile=fs.readFileSync("./db.json","utf-8");
    const todoList=JSON.parse(readFile);
    todoList.map((elem)=>{
        if(data.id==elem.id){
            elem.title=data.title;
            elem.body=data.body
        }
    })
    fs.writeFileSync('./db.json',JSON.stringify(todoList));
}
function list(data){
    const readFile=fs.readFileSync("./db.json","utf-8");
    const todoList=JSON.parse(readFile);
    if(data[0]=="all"){
        console.log(todoList);
    }else if(data[0]=="checked"){
        console.log(todoList.filter(elem=>elem.checked));
    }
    else if(data[0]=="unchecked"){
        console.log(todoList.filter(elem=>!elem.checked));
    }
}
function remove(data){
    const readFile=fs.readFileSync("./db.json","utf-8");
    const todoList=JSON.parse(readFile);
    todoList.map((elem,index)=>{
        if(data.id == elem.id){
            todoList.splice(index,1);
        }
    })
    fs.writeFileSync('./db.json',JSON.stringify(todoList));
}
function checked(data){
    const readFile=fs.readFileSync("./db.json","utf-8");
    const todoList=JSON.parse(readFile);
    todoList.map((elem)=>{
        if(data.id==elem.id){
            elem.checked=true;
        }
    })
    fs.writeFileSync('./db.json',JSON.stringify(todoList));

}
function unchecked(data){
    const readFile=fs.readFileSync("./db.json","utf-8");
    const todoList=JSON.parse(readFile);
    todoList.map((elem)=>{
        if(data.id==elem.id){
            elem.checked=false;
        }
    })    
    fs.writeFileSync('./db.json',JSON.stringify(todoList));

}
module.exports={
    add,edit,list,remove,checked,unchecked
}