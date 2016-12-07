# medcircle_project

## Scripts
* ````npm run prepare-database-prod```` - Prepares hosted AWS database named `medcircle` with the table `articles.`
* ````npm run destroy-database-prod```` - Deletes table `articles` from the `medcircle` database.

### Setup

1. Clone the repo.
2. Insert the given `default.json` file in the config directory.
3. Navigate to the root directory. Run `npm i`. 
4. Now, run `npm prepare-database-prod.` This will create a database named `medcircle` with the table `articles.` 
5. Run `npm test` to confirm everything is working properly. This script will test all endpoints as well as run the linter.
6. Spin up the server on port 3000 by running `npm start.`

#### Notes
* Comment out line 7 in authRoutes.js before you spin up the server and visit localhost:3000/api/1.0 to be greeted by instructions.
