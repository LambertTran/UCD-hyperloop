# Hyperloop team at UC. Davis

***

__**Note**__: Pls email me at lb.tran648@gmail.com if you are interested in developing website for hyperloop team at UC Davis or need some help to configure the project

***
## Getting start
#### To run this project, you need to
##### 1. Install NodeJS
##### 2. Create a folder called *"identity"*
##### 3. Copy all files in *"identity-sample"* to the newly created *"identity"* folder
##### 4. Setup MySQL database 
```
* username
* password
* database name: hyperloop
```
##### 5. Input username and password of your *MySQL server* to *"db-identity.jb"* inside *identity* folder
##### 6. Obtain GCP storage key (json key) [link](https://cloud.google.com/iam/docs/creating-managing-service-account-keys), and copy this GCP key to *"identity"* folder and rename it to *"GCP-key.json"*
##### 7. Follow commands below to run server

```
1. npm install
2. npm run dev
```
##### 8. Follow intruction in [create-db.js](https://github.com/LambertTran/UCD-hyperloop/blob/master/routes/database/create-db.js#L2)

## Tools

#### This project is built on: 

 + Node/Express: server for data storage
 + Handlebars: template engine for displaying pages
 + Sass: styling 
 + Bootstrap: styling
 + Gulp: task runner
 + MySQL: store text, image links
 + Gcloud engine: host server
 + Gcloud storage: storage images 

#### This project consist of 2 separated routes: 
 + admins (http://localhost:3000/login)
 + clients

