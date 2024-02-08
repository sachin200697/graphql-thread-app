## Documentation 


## Prisma

npm install prisma typescript ts-node @types/node --save-dev

npx prisma init //to setup a prisma project, it will generate prisma folder and .env file

1. inside .env file change the URL accordingly:

DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<databasename>?schema=public"

2. open prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"   // can give othre database if want to connect
  url      = env("DATABASE_URL")    //this is databse url from .env file to connect
}

// we can create schema here
model User {
  id String @id @default(uuid())  //@id means it is id filed and we can give default value generated from uuid method
  firstName String @map("first_name") //here at code level it will be firstName and inside database it will be first_name
  lastName String @map("last_name)
  profileImageURL String @map("profile_image_url")
  email String @unique
  password String 
  salt String // to has the password 

  @@map("users")
}


## Map prisma schema to postgres database 

npx prisma migrate dev --name create_user_table 

## for token

npm i jsonwebtoken
npm i  @types/jsonwebtoken -d


