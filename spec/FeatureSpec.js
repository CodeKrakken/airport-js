'use strict';

describe('Feature Test:', function(){
  var plane;
  var planeTwo;
  var airport;
  var airportTwo;

  beforeEach(function(){
    plane = new Plane();
    planeTwo = new Plane(); 
    airport = new Airport();
    airportTwo = new Airport();
  });

  describe('under clement conditions', function(){
    beforeEach(function(){
      spyOn(Math, 'random').and.returnValue(0);
      plane.land(airport);
    });

    it('planes can be instructed to land at an airport', function(){
      expect(airport.planes()).toContain(plane);
    });

    it('planes can be instructed to take off', function(){
      plane.takeOff(airport);
      expect(airport.planes()).not.toContain(plane);
    });

    it('plane confirms departure', function(){
      expect(plane.takeOff(airport)).toEqual("Departure Successful.")
    });

    it('planes cannot land if airport is full', function(){
      airport.alterCapacity(1);
      console.log(airport.planes());
      expect(function(){planeTwo.land(airport);}).toThrowError('Cannot land - airport is full');
    });

    it('planes cannot take off if not at specified airport', function(){
      expect(function(){plane.takeOff(airportTwo);}).toThrowError('Cannot take off - not at that airport');
    });
  });

  describe('under stormy conditions', function(){

    it('blocks takeoff when weather is stormy', function(){
      spyOn(Math, 'random').and.returnValue(0);
      plane.land(airport)
      spyOn(airport._weather, 'isStormy').and.returnValue(true);
      expect(function(){plane.takeOff(airport);}).toThrowError('Cannot take off during storm');
      expect(airport.planes()).toContain(plane);
    });
  
    it('blocks landing when weather is stormy', function(){
      spyOn(Math, 'random').and.returnValue(1);
      expect(function(){plane.land(airport);}).toThrowError('Cannot land during storm');
    });
  });
});
