
# Interactive realtime board

### Virtual collaboraive sketching canvas for your design ideas! :smile:

Getting started on a new project and ideating with your teams virtually?

Our [interactive realtime interactive board](https://realtime-interactive-board.herokuapp.com/) will help with your team's design thinking process, providing you a platform for collaborative sketching and discussions.

The application is optimised for mobile devices - ditch your mouse and draw on your mobile instead!

:link: Live demo: https://realtime-interactive-board.herokuapp.com/

> This project is a submission for the [Realtime Apps IAP Workshop](http://realtime-apps-iap.github.io/competition) and uses WebSockets as a realtime component.

## Getting Started :arrow_forward:
Open the application at https://realtime-interactive-board.herokuapp.com/.

1. Enter your display name (leaving it blank would autogenerate a display name).
2. Join an existing room or create a new room by leaving the Room ID blank. Your Room ID would appear at the bottom of the page after creating a room. 
3. Select your desired pen colour and thickness. Select the thrash can icon to clear the canvas.
4. Draw and discuss away!


## Creativity and Innovation :heavy_check_mark:
As most collaboration have shifted virtually due to the ongoing pandemic, our realtime application would allow multiple parties to collaboratively design and share ideas using the realtime canvas and chatbox. Compared to sharing screens on video conferencing applications, our application promotes collaborative work (supports interaction of multiple parties on a single canvas) at a much lower bandwidth. The application is also made responsive for mobile use to provide convenience in drawing instead of using a mouse/touchpad. Individual rooms allow multiple groups to use the platform at a time. Overall, the application is made straightforward and easy to use.

## Setting up the project :memo: 
**Technical Considerations:** 
This application is built using Node, React and Sockets.IO.

Clone this repository and ensure that you have npm installed.

Run the following commands on terminal in the directory of the repository: 

To start the server:
```command
npm install
node server
```

To start the client (change directory into /ui):
```command
npm install
npm start
```

The client will be hosted on ``` localhost:3000```.
