# AC_FullStack
## Brief Background
This project has been created using ReactJS and Node.js. I chose this stack because it is the industry standard and a suitable stack for the task of creating a FrontEnd application to coomunicate to an API backend. This is my first experience with this stack (and with server side JavaScript). I enjoyed the experience and will be looking to get formal training in FrontEnd Development in the next few months.

## Installing Dependencies
### Node and NPM
This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (the download includes NPM) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).

### Project Dependencies
All project dependencies are defined in the `package.json` file inside the `boarderectors-client` directory.
Before you can run the application, navigate to the `boarderectors-client` directory and run the following command:
```bash
npm install
```
This command will install all the required packages as defined in the `package.json` file inside the `boarderectors-client` directory.

## Running the Application
To run the application, navigate to the `boarderectors-client` directory and run the following command:
```bash
npm start
```
## Operation
Once tha aplication starts, instructions for testing a `200` response scenario and a `404` response scenario are posted on the home page with button links for each scenario. There is limited navigation with a `Home` link in the navigation bar.

To test displaying from the API, use the following link to see the output from a `200` response:
```bash
http://localhost:3000/agent/ACC001
```

and the following link to see the output from a `404` response:
```bash
http://localhost:3000/agent/ACC002
```
