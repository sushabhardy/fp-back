# Backend for Filmy Profiles

This is a prototype Node API for filmy profiles.

* This project uses the following technologies:
  * Docker
  * PostgreSQL
  * NodeJS
  * Express

<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>

## Getting started

* Clone this repo.

* Install `Visual Studio Code` IDE for development.

* Install `ESlint ^2.1.13` visual studio code extension.

* Install `Docker` visual studio extension to work with Dockerfiles

* Install `Remote - Containers` visual studio extension to work with visual studio code for docker containers.

* Install Docker Desktop in your local system. (Then, make sure docker is running and docker cli is working)
  * [Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows)
  * [macOS](https://hub.docker.com/editions/community/docker-ce-desktop-mac)

* Install PostgreSQL and pgAdmin

* Create `fp-dev` database in postgres

* Run `docker pull sushabhardy/fp-be` to pull latest image.

* Run `docker tag sushabhardy/fp-be fp-be_fp-be` to clone image.

* Run `docker-compose up` to start the server.

* Open `Docker` image tab in the left status bar.

* You can see the container named `fp-be_fp-be` running. Right click that container and click on `Attach Visual Studio Code`.

* A new VSCode window will open. This is the VSCode running inside the container.

* Do `CTRL + SHIFT + P` to open palette. Search and click on `Debug: Attach to Node Process`. This will attach debugger to your VSCode and the project will be hosted on localhost:3000

* You can add breakpoints, update code and then restart the debugger to see changes in the server.

* This project uses `Github's standard CodeStyle.`. More info about it [here](https://standardjs.com/rules.html)

* Best practices and rules are defined in `.eslintrc.json` file.

## Available scripts

* Run `npm run lint` to see if code style is followed and build passes.
* Run `npm test` for to see if all tests pass.

## Deployment

* Connect to RDS instance and create a new DB named `fp`.
* Checkout `develop` branch of `fp-node` repo and change `.env` file endpoints to point to this DB.
* Run `node app.js` on this and this will run all the DDL, DML and MML on the DB.
* Checkout `master` branch and change endpoints in `.env` file.
* Build a docker image by running `docker-compose up`
* This will create an image named `fp-be_fp-be`.
* Run `docker tag fp-be_fp-be sushabhardy/fp-be`.
* Run `docker push sushabhardy/fp-be` to push the image to docker hub.
* Login to AWS and connect to the EC2 instance and run the following command to run container from this image.
`sudo service docker start`
`sudo docker pull sushabhardy/fp-be`
`sudo docker run -d --rm -p 3000:3000 sushabhardy/fp-be`
* Now the `fp-be` will run on the ec2 instance on port `3000`.
