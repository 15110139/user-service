# user-service


[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

# Features!

  - Method management user in system 
     * Create user

# Technology

Project uses a number of open source projects to work properly:

* [Node.js](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [gRPC](https://grpc.io/docs/guides/) - gRPC is a modern open source high performance RPC framework that can run in any environment.
* [Monogodb](https://www.mongodb.com/) - MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. No database makes you more productive..
* [Clean Architecture](https://www.freecodecamp.org/news/a-quick-introduction-to-clean-architecture-990c014448d2/) - Resilient software is divided into layers, underpinned by business logic and is independent of technologies.


# Installation

Project requires [Node.js](https://nodejs.org/) v10+ to run.

Clone repository and clone submodule protobuf
```sh
$ git clone https://github.com/15110139/user-service.git
$ cd user-service
$ git submodule init 
$ git submodule update
```
Prepare environment variables for project
 * create file .env in root Project
 * copy content in file env.example
 * change config environment variables 


Install the dependencies and devDependencies and start the server.

```sh
$ cd user-service
$ npm install 
$ npm run grpc
```

