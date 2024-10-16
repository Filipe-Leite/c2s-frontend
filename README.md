#### This project is a microsservice and it's part of a system. This project was a senior test for a company, the test consisted in make some microservices of authentication, web-scraping, tasks and notification, the project should have a frontend and works on the following manner: The user create a task containing a link of a market web page and this task should have a button to make a web scraping for extract data from a product(the market place chosen for me was the HAVAN `https://www.havan.com.br/`. You can choose any product), when the task status change all the users should receive a notification. The project stack is listed below:

### Ruby - Ruby on rails:
#### The microservices was wrote in ruby and each microservice has one responsibility

Authentication [back-end] <br>
Web-scraping [back-end] <br>
Tasks [back-end] <br>
Notifications [back-end] <br>

### Typescript – React.js:
#### The frontend consumes all the microservices.

Front-end

### Databases:
#### Each microservice has one different database, the redis dabase is for store the notifications.

MySql <br>
Redis

### Typescript – Node.js:
#### The websocket is listening the Redis channel for tasks updates notifications and seding a message to all logged users.

Websocket

## 1 - To run the project clone the following back-end repositories:

#### `https://github.com/Filipe-Leite/c2s-authetication`

`git clone git@github.com:Filipe-Leite/c2s-authetication.git`

#### `https://github.com/Filipe-Leite/c2s-notifications`

`git clone git@github.com:Filipe-Leite/c2s-notifications.git`

#### `https://github.com/Filipe-Leite/c2s-tasks`

`git clone git@github.com:Filipe-Leite/c2s-tasks.git`

#### `https://github.com/Filipe-Leite/c2s-web-scrapping`

`git@github.com:Filipe-Leite/c2s-web-scrapping.git`

## 2 - After clone the microservices go to each cloned repository (make sure you are using the correct Ruby language and Ruby On Rails versions) and run:

rails db:create db:migrate db:seed <br>
Rails server #on each terminal session for each repository above

## 3 - Clone the front-end repository

#### `https://github.com/Filipe-Leite/c2s-frontend`

`git@github.com:Filipe-Leite/c2s-frontend.git`

## 4 - Open 3 terminal sessions:

### 4.1 - Go to c2s-frontend directory and run to run the front-end system:

npm install <br>
npm start

### 4.2 - Make sure your machine has redis installed and run to run the redis server:

redis-server

### 4.3 - Go to c2s-frontend/server directory and run:
#### This step is for run the websocket for listen to redis modifications in task_updates channel

npm install <br>
npm run dev

## 5 - Success!!! Now you can create two or more accounts and login at same time

![image](https://github.com/user-attachments/assets/a7aa6bca-6bb0-43ae-9e49-121abe7d0172)

![image](https://github.com/user-attachments/assets/b99113be-f98e-43e0-a3eb-8e4659e67452)

![image](https://github.com/user-attachments/assets/91bfa568-ce59-43c3-b8cd-cf9f57fea58b)

![image](https://github.com/user-attachments/assets/84e3caeb-286b-4633-ad29-2f7a165adba6)
