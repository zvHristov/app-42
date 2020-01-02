var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');
const filePathEmployees = 'employees.json';
/* POST companies listing. */
router.post('/companies', function(req, res, next) {
  const content = fs.readFileSync(path.join(__dirname, '..', 'data', 'companies.json'), 'utf8');
  res.header('Content-Type', 'application/json');
  res.status(200).end(content);
});
/* POST company-addresses listing. */
router.post('/company-addresses', function(req, res, next) {
  const content = fs.readFileSync(path.join(__dirname, '..', 'data', 'company-addresses.json'), 'utf8');
  res.header('Content-Type', 'application/json');
  res.status(200).end(content);
});
/* POST employees listing. */
router.post('/employees', function(req, res, next) {
  const content = fs.readFileSync(path.join(__dirname, '..', 'data', 'employees.json'), 'utf8');
  res.header('Content-Type', 'application/json');
  res.status(200).end(content);
});
router.delete('/deleteEmployee/:id', function(req, res, next) {
  const content = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'employees.json'), 'utf8'));
  for (let item in content) {
    if(req.params.id === content[item].id ){
      content[item].companyId = 'deleted';
    }
  }
  //write file
  fs.writeFile(path.join(__dirname, '..', 'data', 'employees.json'), JSON.stringify(content), 'utf8', (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  res.header('Content-Type', 'application/json');
  res.status(200).end();
});
router.post('/addEmployee', function(req, res, next) {
  const content = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'employees.json'), 'utf8'));
  content.push(req.body);
  //write file
  fs.writeFile(path.join(__dirname, '..', 'data', 'employees.json'), JSON.stringify(content), 'utf8', (err) => {
    if (err) throw err;
    console.log('The file has been updated!');
  });
  res.header('Content-Type', 'application/json');
  res.status(200).end();
});
router.post('/updateEmployee/:id', function(req, res, next) {
  const content = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'employees.json'), 'utf8'));
  for (let item in content) {
    if(req.params.id === content[item].id ){
      content[item] = req.body;
    }
  }
  //write file
  fs.writeFile(path.join(__dirname, '..', 'data', 'employees.json'), JSON.stringify(content), 'utf8', (err) => {
    if (err) throw err;
    console.log('The file has been updated!');
  });
  res.header('Content-Type', 'application/json');
  res.status(200).end();
});
router.post('/updateEmployees', function(req, res, next) {
  const content = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'employees.json'), 'utf8'));
  for (let item in content) {
    for (let itemNewEmployee in req.body) {
      if(content[item].id === req.body[itemNewEmployee].id ){
        content[item].companyId = req.body[itemNewEmployee].companyId;
      }
    }
  }

  //write file
  fs.writeFile(path.join(__dirname, '..', 'data', 'employees.json'), JSON.stringify(content), 'utf8', (err) => {
    if (err) throw err;
    console.log('The file has been updated!');
  });
  res.header('Content-Type', 'application/json');
  res.status(200).end();
});
/* POST projects listing. */
router.post('/projects', function(req, res, next) {
  const content = fs.readFileSync(path.join(__dirname, '..', 'data', 'projects.json'), 'utf8');
  res.header('Content-Type', 'application/json');
  res.status(200).end(content);
});
router.delete('/deleteProject/:id', function(req, res, next) {
  const content = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'projects.json'), 'utf8'));
  for (let item in content) {
    if(req.params.id === content[item].id ){
      content[item].companyId = 'deleted';
    }
  }
  //write file
  fs.writeFile(path.join(__dirname, '..', 'data', 'projects.json'), JSON.stringify(content), 'utf8', (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  res.header('Content-Type', 'application/json');
  res.status(200).end();
});
router.post('/addProject', function(req, res, next) {
  const content = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'projects.json'), 'utf8'));
  content.push(req.body);
  //write file
  fs.writeFile(path.join(__dirname, '..', 'data', 'projects.json'), JSON.stringify(content), 'utf8', (err) => {
    if (err) throw err;
    console.log('The file has been updated!');
  });
  res.header('Content-Type', 'application/json');
  res.status(200).end();
});
router.post('/updateProject/:id', function(req, res, next) {
  const content = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'projects.json'), 'utf8'));
  for (let item in content) {
    if(req.params.id === content[item].id ){
      content[item].name = req.body.name;
      content[item].department = req.body.department;
      content[item].employeesId = req.body.employeesId;
    }
  }
  //write file
  fs.writeFile(path.join(__dirname, '..', 'data', 'projects.json'), JSON.stringify(content), 'utf8', (err) => {
    if (err) throw err;
    console.log('The file has been updated!');
  });
  res.header('Content-Type', 'application/json');
  res.status(200).end();
});
module.exports = router;
