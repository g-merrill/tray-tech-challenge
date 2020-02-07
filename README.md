## Getting Started

Clone this repo into a local directory of your choice

cd into the `tray-tech-challenge/` directory

Open the project in your code editor

In the project directory, run:

`yarn install && yarn run build && nodemon server`

After you see the message `Express app running on port 3001` - keep that terminal tab running, and open up a new terminal for the repo and do:

`yarn start`

You should see a 'compiled successfully' message and a browser window should automatically open [http://localhost:3000](http://localhost:3000)

### Change the values of the input.txt file in your code editor as desired. Then, refresh your browser page to see the changes and visualize the hoover doing its thing!

Notes:
* In the browser, the hoover's final location is logged to the console, followed by the number of dirt spots that the hoover cleaned

* If you want, you can also view the JSON version of the current room/hoover input values if you navigate to [http://localhost:3001/api/v1/input](http://localhost:3001/api/v1/input)

* My deployed version of this challenge can be found [here](https://tray-gam.herokuapp.com), but currently, the input parameters on this deployed version cannot be modified by other users.