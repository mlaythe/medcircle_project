# medcircle_project

## Scripts
* ````npm run prepare-database```` - Prepares database named `medcircle` with the table `articles.`
* ````npm run destroy-database```` - Deletes table `articles` from the `medcircle` database.

### Setup

1. Clone the repo.
2. Insert the given `test.json` file in the config directory.
3. Navigate to the root directory. Run `npm i`. 
4. Now, run `npm prepare-database.` This will create a database named `medcircle` with the table `articles.` 
5. Run `npm test` to confirm everything is working properly.
6. Spin up the server on port 3000 by running `npm start` or `npm start-dev`.

#### Notes
* Comment out lines 7 through 9 in authRoutes.js once server has spun up and visit localhost:3000/api/1.0 to be greeted by instructions.
