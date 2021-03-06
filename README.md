# Websockets Project - Lightning Clicks 

This application is a simple reaction based game. Once all users ready up, a bunch of squares will be 
drawn to the canvas. The user must click on the squares that match the target color to gain points. Once
all squares of the correct color are clicked, a new round will begin.

I used websockets to manage the drawing data, the user count, and the ready system. The number of users and
ready count are held server side. 

The things that went right with my project are the design and library use. I was able to learn Materialize
pretty quickly and it helped my application look a lot more modern and sleek. The overall look is clean and
neat. The things that went wrong were the idea for the game itself. It's a bit more simple than I had hoped.
I could have definitely spiced it up a little by maybe adding other images besides squares to click on. To 
improve the app, I was considering adding more game states with a win and lose condition as well as maybe adding
balloons as oppossed to squares. Then each user would be forced to click on the proper balloon more than once to
get the points.

For my Above & Beyond I focused on learning a new library and adding it's elements to my project. I used Materialize
to create the dropdown menus, pulsing target, table in the center, wave feature button, and grid layout. Compared to
previous projects this one looks much more neat and clean because of the consistent design of the elements. I definitely
could have implemented more components from the library but I am happy with the way it turned out. One thing I found a bit
difficult was properly linking the library from the server side. Wasn't exactly sure how to do this, but after reviewing how
the index.html was linked I was able to figure it out.

---- Credits ----

Materialize - http://materializecss.com/
jQuery - https://jquery.com/
Socket.io - https://socket.io/
Random color generator - https://stackoverflow.com/questions/1484506/random-color-generator