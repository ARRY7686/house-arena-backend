# House Arena Backend

Welcome to the **House Arena backend repository**!

I made this project as part of **Buildspace N&W's5** Project as well as my *MERN* course project.

# Frontend
for backend please use this link as reference: [Backend repository](https://github.com/sailingsam/house-arena_frontend)

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/sailingsam/house-arena-backend
   
   cd house-arena-backend
   ```

2. Navigate to the project directory:

3. Install the dependencies:

   ```sh
   npm install
   ```

4. Setup DataBase in MongoDB atlas
 - head to https://account.mongodb.com/account/login
 - Sign up / Log in
 - Create new Project
 - Select M0 Free version for deploying cluster and click create deployment
 - It will ask for add connection IP address, click allow access from anywhere
 - create username and password and save password in safe for future use
 - click choose a connection method
 - click on drivers
 - In third point copy connection string
 - create a new file .env in your backend local folder
 - copy ..env file data to .env and for MONGO_URI=(paste here conenction string) and in this string replace <db_password> with your user password
 
### Adding some basic sample data

- in your postman create new http request
- enter url http://localhost:4000/api/events with POST method
- in body select raw and format as json, and paste this data
- - {
    "name":"render test-1",
  "date" : "2024-01-11",
  "housePoints": {
    "kong": 1,
    "leo": 2,
    "phoenix": 3,
    "tusker": 4
  },
  "description":"test description 1"
}
- send request, your object should have been created in atlas
- go to collection in mongoDB atlas and in collection you will see events, there you will find your just created event

### Running the App

To start the development server, run:

```sh
npm run dev
```

You should get this in console:
```console
Server running on http://localhost:4000
MongoDB connected
```
- now you can connect your frontend to backend at http://localhost:4000

## Contributing

All code contributions must go through a pull request and be approved by a core developer before being merged. This is to ensure a proper review of all the code.

We truly ❤️ pull requests! If you wish to help, you can learn more about how you can contribute to this project in the [**contribution guide**](https://github.com/sailingsam/House-Arena_frontend/blob/main/CONTRIBUTING.md).

## Contact

If you have any questions or suggestions, feel free to contact me at [jainsaksham1004@gmail.com](mailto:jainsaksham1004@gmail.com).
