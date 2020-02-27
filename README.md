# Toy Robot Simulator - CLI Application

## Project Scope

This application is a Node.JS command-cli simulator to simulate a toy robot moving on a 5 units x 5 units square tabletop. The robot is free to roam on the table surface without obstacle to block the movement. Any movement causing the robot falling from the table is prohibited. All movements are controlled by certain commands as described in below section for details.

## Assumptions

* The robot is only allowed to roam freely on a 5x5 units tabletop as illustrated below

 **N (North)**
 
|             4             | 0,4 | 1,4 | 2,4 | 3,4 | 4,4 | 
|:--------------:|:---:|:---:|:---:|:---:|:---:|
|             3             | 0,3 | 1,3 | 2,3 | 3,3 | 4,3 | 
|             2             | 0,2 | 1,2 | 2,2 | 3,2 | 4,2 | 
|             1             | 0,1 | 1,1 | 2,1 | 3,1 | 4,1 |
|             0             | 0,0 | 1,0 | 2,0 | 3,0 | 4,0 |
| Row / Column  |   0   |   1   |   2  |   3   |  4   |

* Falling from the table must be prevented
* The robot can only move 1 unit forward on each  movement
* The origin (0,0) must be the South West most corner 
* The end point of x-coordinate is 4.
* The end point of y-coordinate is 4.

## Requirements

* The appliation must be operated by command line.
* The square tabletop must be with dimensions of 5 units x 5 units.
* The first valid command is a ``PLACE`` command along with position arguments (X,Y) and facing argument (NORTH, SOUTH, EAST, or WEST). ie. PLACE 3,4,SOUTH
* Multiple valid PLACE commands are allowed.
* Any position values outside the coordinate range are not allowed.
* The x-coordinate and y-coordinate of the origin are 0 and 0 respectively.
* All commands should be discarded until a valid PLACE command has been executed.
* A ``MOVE`` command will move the robot one unit forward in the facing direction.
* The MOVE command leading the robot to move outside the grid must be ignored.
* A ```LEFT``` command will rotate the robot 90 degrees in anti-clockwise direction without changing the position of the robot.
* A ```RIGHT``` command will rotate the robot 90 degrees in clockwise direction without changing the position of the robot.
* A ```REPORT``` command will output the X,Y coordinates and the orientation of the robot.
* A ```QUIT``` command will exit the application.
* Test data is provided to exerise the application.

## Get Started

### System Requirements

* [Node.js](https://nodejs.org/en/), a Javascript runtime environment for building server-side web applications.
	* To download Node.JS, check out the options [here](https://nodejs.org/en/download/).
* [npm](https://www.npmjs.com), a default package manager for the Node.js.
	* Node.js comes with npm installed.
	* You can also install npm by following the options [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
* (Optional) [Docker](https://www.docker.com), bundle the software and run it on OS-level virtual environment.
	* You can use docker to run the project, but it is optional.

### Installation

* To get the application by cloning the repo from []() via

```
$ git clone git@github.com:kelvinlwy/nodejs-cli-toy-robot-simulator.git
```

* Then go to the directory and install all dependencies

```
$ cd nodejs-cli-toy-robot-simulator
$ npm install
```

### Start the application

* To start the application with following options:

```
$ npm run start
```
```
$ node app.js
```
```
$ chmod +x app.js		# Make sure the app.js is executable
$ ./app.js       
$ node.cmd app.js       # For Windows user
```
```
$ npm link && toy-robot
```
```
# Using docker to run the application
$ docker image build -t toy-robot -f Dockerfile .  # build the image
$ docker run -it toy-robot                         # built and run the container
```

### Testing with Jest

```
$ npm run test
```

### Running the application using a file 
All commands should be seperated by new line. You can check out the seed.txt file as reference.
To run the application using a file via following command with the file as first argument:

```
$ npm run start:file seed.txt
```

### Running application with test data

To exercise the application using test data in a file, seed.txt via

```
$ npm run seed
```
All commands inside the file will be excuted and printed out in the terminal.

## Application Usage

The list of available commands:

```node
PLACE 1,2,EAST	
# PLACE command format: PLACE X,Y,D 
# X is a integer representing x coordinate with a range from 0 to 4.
# Y is a integer representing y coordinate with a range from 0 to 4.
# D is a string representing direction with following options: NORTH, EAST, SOUTH, WEST
```
```node
MOVE
```
```node
LEFT
```
```node
RIGHT
```
```node
REPORT   # Output: 2,2,EAST
```
```node
QUIT
```
