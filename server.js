let mysql = require('mysql');
const express=require('express');
const app=express();
const bodyParser = require("body-parser"); 
var urlencodedParser = bodyParser.urlencoded({ extended: false }) 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employeedb'
});
connection.connect((err)=> {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });

  connection.query('select * from employeedetails; ', 
      function (err, result) {
        if(err)
          console.log(`Error executing the query - ${err}`)
        else
          console.log("Result: ",result) 
      })
  

      app.get('/',(req,res)=>{
connection.query('select * from employeedetails;',(err,result)=>{
    res.json(result)
})
      })


      app.post('/', urlencodedParser,(req,res)=>{
        console.log(req.body.name)
        let emp_name=req.body.name;
        const emp_account=req.body.account;
        const emp_salary=req.body.salary;
        const emp_project=req.body.project;
        const emp_gender=req.body.gender;
        connection.query('insert into employeedetails(name,account,salary,project,gender) values(?);',[{name:emp_name,account:emp_account,salary:emp_salary,project:emp_project,gender:emp_gender}],(err,result)=>{
            res.json(result)
        })
      })

      app.put('/:id',urlencodedParser,(req,res)=>{
        const upId=req.params.id;
        console.log(req.body.name)
        let emp_name=req.body.name;
        const emp_account=req.body.account;
        const emp_salary=req.body.salary;
        const emp_project=req.body.project;
        const emp_gender=req.body.gender;
          connection.query("UPDATE employeedetails SET ? WHERE id=?;",[{name:emp_name,account:emp_account,salary:emp_salary,project:emp_project,gender:emp_gender},upId],(err,result)=>{
            if(err){
                console.log(err)}
                else{
                    res.send("updated")}
                    console.log(result)
            })
          })
        

      app.delete('/:id',(req,res)=>{
          const deletId=req.params.id;

          connection.query("delete from employeedetails where id=?;",deletId,(err,result)=>{
              if(err){
                  console.log(err)}
                  else{
                      res.send("DELETED")}
                      console.log(result)
              })
        //   res.json(result)
      })


      app.listen('8080',()=>{
          console.log ("server connected to port 8080")
      })


