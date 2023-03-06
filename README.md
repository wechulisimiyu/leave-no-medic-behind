# Leave no medic behind

## 2023

The Leave No Medic Behind Initiative Charity Run is a fundraising project by the Association of Medical Students of the University of Nairobi (AMSUN) to meet the financial needs of underprivileged students in the School of Medicine.

It began in 2017 when the then 5th year MBChB Class had a classmate who was almost denied to sit for their end of year exams because of a fees balance of less than sh 20,000. His classmates rallied together, each giving what they could and with that the student was able to sit for his exams and hence LNMB was born.

From 2017 to 2021, LNMB has primarily done student-centered funds drive using the harambee model however in 2022 there emerged the idea to organise for a charity run.

The project is being run in conjunction with the AMSUN Running Club- a registered club of runners in the School of Medicine. The project involves raising funds from sponsors and well-wishers plus the sale of T-shirts to participants who will take part in the run.

### Developments

- Welcoming any changes, refactoring and issues

## The Tech Stack, so far

- [Node.js](https://nodejs.org) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express](https://expressjs.com//) - Fast, unopinionated, minimalist web framework for Node.js
- [Ejs](https://ejs.co/) - Embedded JavaScript templating
- [Mongoose](https://mongoosejs.com/) - elegant mongodb object modeling for node.jssupport, relations, eager and lazy loading, read replication and more.
- [MongoDb](https://www.mongodb.com/) - NoSQL database built for modern application architectures

## To run it locally

### Linux

Install node, using the [Node Version Manager](https://github.com/nvm-sh/nvm "Official Node Version Manager Github page").
On your terminal, run ```npm install```, and create a `config/config.env` file using the `sample.env` file.

### Windows

- Install node and npm.
- Node can be installed from the [official website](https://nodejs.org/en/). Install it.
- check node version use WIN+R => cmd => node -v
- check npm version use WIN+R => cmd => npm -v

To update npm (i = install, -g = global)
```npm i -g npm@latest # npm install -g npm@latest```

To find npm on your machine`, run
```%AppData%\npm```

On Windows, if still unsuccessful, try this blog by [Jaydeep Patadiya](https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac)

Afterwards, on your terminal, run ```npm install```, and create a `config/config.env` file using the `sample.env` file.

N.B: If you want to make a frontend change without dealing with the backend, the code will run if you comment out the `connectDb()` function in `index.js`

### From Github to your machine

Fork this repository.

```

git clone git@github.com:wechu07/leave-no-medic-behind.git
cd leave-no-medic-behind
npm install
```

- I am using SSH-based authentication. The alternative for token-based authentication is:

```
https://github.com/wechu07/leave-no-medic-behind.git
```

### Running the project
- Type `npm run dev` to start the server from your terminal

### Configuration

Included with the code is a sample.env file with fields you will need to configure

### Communication

<ul>
    <li><a href="https://twitter.com/amsunuonbi">AMSUN UONBI Official Twitter Page</a></li>
    <li><a href="https://www.amsun-uon.org/">AMSUN UONBI Official Webpage</a></li>
    <li><a href="https://twitter.com/AMSUNrunning">AMSUN Running Club Official Twitter Page</a></li>
    <li><a href="https://twitter.com/wechuli_eugene">Primary Contributor's Twitter Handle</a></li>
</ul>

### Contributors

[Wechuli Simiyu (Github)](https://github.com/wechu07)
