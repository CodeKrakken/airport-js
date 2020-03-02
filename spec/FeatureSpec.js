'use strict';

describe('Feature Test:', function(){
  var plane;
  var planeTwo;
  var airport;
  var airportTwo;
  var crab;

  beforeEach(function(){
    plane = new Plane();
    airport = new Airport();
  });

    it('planes can be instructed to land at an airport', function(){
      spyOn(Math, 'random').and.returnValue(0);
      plane._location = 'in flight';
      plane.land(airport);
      expect(airport.planes()).toContain(plane);
    });

    it('planes will only land at an airport', function(){
      plane._location = 'in flight';
      crab = jasmine.createSpyObj('crab', ['walkSideways']);
      expect(function(){plane.land(crab);}).toThrowError("Cannot land - invalid airport");
    });

    it('planes can be instructed to take off', function(){
      plane._location = airport;
      spyOn(Math, 'random').and.returnValue(0);
      plane.takeOff(airport);
      expect(airport.planes()).not.toContain(plane);
    });

    it('plane confirms departure', function(){
      spyOn(Math, 'random').and.returnValue(0);
      plane._location = airport;
      expect(plane.takeOff(airport)).toEqual("Departure Successful.")
    });

    it('planes cannot land if airport is full', function(){
      airport.alterCapacity(1);
      spyOn(Math, 'random').and.returnValue(0);
      planeTwo = new Plane();
      planeTwo._location = "in flight";
      plane._location = "in flight";
      plane.land(airport);
      expect(function(){planeTwo.land(airport);}).toThrowError('Cannot land - airport is full');
      expect(airport.planes()).not.toContain(planeTwo);
    });

    it('planes cannot take off if not at specified airport', function(){
      plane._location = airport;
      expect(function(){plane.takeOff(airportTwo);}).toThrowError('Cannot take off - not at that airport');
    });

    it('airport blocks takeoff when weather is stormy', function(){
      spyOn(Math, 'random').and.returnValue(0);
      plane._location = "in flight";
      plane.land(airport)
      spyOn(airport._weather, 'isStormy').and.returnValue(true);
      expect(function(){plane.takeOff(airport);}).toThrowError('Cannot take off during storm');
      expect(airport.planes()).toContain(plane);
    });
  
    it('airport blocks landing when weather is stormy', function(){
      spyOn(Math, 'random').and.returnValue(1);
      plane._location = "in flight";
      expect(function(){plane.land(airport);}).toThrowError('Cannot land during storm');
    });
});
