# Javascript-Practice

These exercises intentionally skip browser quirks and security issues etc, so a begginer user can easily follow them. Please don't implement them on production environment. 


### Calculator
This exercise shows a basic example of event delegation. It also shows how to create a Javascript Object through invoking the constructor. Only one of the ways you can create an object in javascript. Uses eval to run math operation and doesn't check for input value, so don't run on production environment. 

### Todo List 
This exercise shows dom manipulation - traversing the Dom and adding new Elements. It also shows a simple of use of Javascript promises. You can drag and move the taks. The drag and drop functionality is very simple and doesn't utilize html5 drag and drop functionality. 

### Carousel
This exercise shows how to create a simple carousel that slides left. It shows how to run array methods on dom elements, combine css transitions and absoltue positioning to mimic slide effect. For simplicity we are removing the entire HTML of our container, which is inefficient. You can just remove the first element and add it to the end of the list. 

### Simple Slider
Build a really simple slider using javascript timer and css transition. It has two effects, slide and fade and there is a slight inconsistency when switching between effects. You learn how to set and clear intervals and time your css timers with css transitions. 

### Horizontal Chart Div
Build a simple horizontal chart with divs. You learn how to add custom data attributes to HTML and read those values in javascript. The divs are intially set to width: 0 and the animation is hardcoded in css -> transition-duration: 2s; transition-property: width. So javascript simply reads the data attribute and sets the div height to it. 

### Horizontal Chart Canvas
This is a slightly complex version of Horizontal Charts, which uses canvas to draw the chart. The input is similar to chart.js (a popular charting library). The purposes of this excersize is to learn how to draw and animate canvas elements. You can't use css with canvas so you have to manually calculate / animate the chart elements. 

### SVG animation
This exercise shows how to parse a SVG file from the same server and perform a simple animation. You learn how to use xml serializer and get #document - xml that was read from the svg file and convert it to dom element. 

### Tic-Tac-Toe
We build a simple tic tac toe game that you can play against computers. It checks to see if you are going to win and blocks the index. Right now it fails under certain scenarios but I am going to fix that so it's unbetable. We are aslo not stopping the game or showing a notification when someone has won. The game simple 

### Chess
Here we are building a simple chess board that shows you how to drag and drop objects. You can setup the colors of the chess board, provide new images for your chess pieces and move your elements on the board. Right now it doesn't check for valid moves. In future we are going to only allow valid moves. You can pass in two colors or even / odd square or just one and the chess board will calculate the other color. 
