# medcircle_project

## Scripts
````npm run prepare-database```` - Prepares database named `medcircle` with the table `articles.`
````npm run destroy-database```` - Deletes table `articles` from the `medcircle` database.

### This is assuming you're on OSX and have Homebrew installed. If not, you'll have install it first.

1. Clone the repo.
2. Insert the given `test.json` file in the config directory.
3. Navigate to the root directory. Run `npm i`. 
4. Now, run `npm prepare-database.` This will create a database named `medcircle` with the table `articles.` 
5. Run `npm test` to confirm everything is working properly.