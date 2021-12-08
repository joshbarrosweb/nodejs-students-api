# Project Title

Students API

---

## Requirements

For development, you will need Node.js, Yarn, and Docker installed in your environment.

### Yarn installation

After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/joshbarrosweb/nodejs-students-api
    $ cd nodejs-students-api
    $ yarn install
    $ docker-compose up
    $ yarn sequelize:migrate

P.S.: If there is a error, you should create a "students" database, on dockerized PHPMYADMIN that runs on http://localhost:9002 (user: root, password: root)

## Configure app

## Running the project

    $ yarn dev
