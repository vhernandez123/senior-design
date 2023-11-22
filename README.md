# CSI 4999 Pet Logger
Product Owner: Valeria Hernandez\
Scrum Master: Ruth Wager\
Development Team: William Eng\
Development Team: Mike Ward\
Development Team: Silair Sileewa

## Configuration
First, configure your .env with the following attributes: \
REACT_APP_AUTH0_DOMAIN = \
REACT_APP_AUTH0_CLIENT_ID = \
SECRET_KEY=*32 byte hex secret key* \
IV=*16 byte hex initialization vector* \
DB_USER= \
DB_HOST= \
DB_PORT= \
DB_PASSWORD= \
DB_DATABASE= 

If you do not wish to use AuthO, you will need to create your own login functionality

## Database
Create MySQL database using database_creation.sql

## Running
Need to run the following 2 commands in seperate terminals:

node backend/connection.js \
npm start

## Account Creation
Login to AuthO with your email and you will have created your account
