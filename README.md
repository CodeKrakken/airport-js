# Airport Challenge

This application provides a basic air traffic control system. It was programmed in JavaScript using TDD. See my original Ruby version [here](https://github.com/CodeKrakken/airport-ruby)

User stories
------

```
As an air traffic controller 
So I can get passengers to a destination 
I want to instruct a plane to land at an airport

As an air traffic controller 
So I can get passengers on the way to their destination 
I want to instruct a plane to take off from an airport and confirm that it is no longer in the airport

As an air traffic controller 
To ensure safety 
I want to prevent landing when the airport is full 

As the system designer
So that the software can be used for many different airports
I would like a default airport capacity that can be overridden as appropriate

As an air traffic controller 
To ensure safety 
I want to prevent takeoff when weather is stormy 

As an air traffic controller 
To ensure safety 
I want to prevent landing when weather is stormy

As the system designer
In order to prevent confusion
I want to prevent landing at anywhere other than an airport

As the system designer
In order to prevent confusion
I want to prevent the plane from receiving 'land' instructions when already grounded

As the system designer
In order to prevent confusion
I want to prevent the plane from receiving 'launch' instructions when already in flight

As the system designer
In order to prevent confusion
I want to prevent the plane from receiving 'launch' instructions when not at specified airport
```

Setup and usage
----

* You will need Node.js 13.9.0. To get it, visit `https://nodejs.org/en/`

* To install the project - `git clone https://github.com/CodeKrakken/airport-js`

* Open `./airport-js/SpecRunner.html` in your browser to run the unit and feature tests
