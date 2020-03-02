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
  })

  describe('plane on ground', function(){
    beforeEach(function(){
      plane._location = airport;
    })
  
    it('planes cannot take off if not at specified airport', function(){
      airportTwo = new Airport();
      expect(function(){plane.takeOff(airportTwo);}).toThrowError('Cannot take off - not at that airport');
      expect(airportTwo.planes()).not.toContain(plane);
    });
  })
  
  describe('test must begin with plane in flight', function(){

    beforeEach(function(){
      plane._location = 'in flight';
    });

    it('planes will only land at an airport', function(){
      crab = jasmine.createSpyObj('crab', ['walkSideways']);
      expect(function(){plane.land(crab);}).toThrowError("Cannot land - invalid airport");
    });

    it('airport blocks landing when weather is stormy', function(){
      spyOn(Math, 'random').and.returnValue(1);
      expect(function(){plane.land(airport);}).toThrowError('Cannot land during storm');
      expect(airport.planes()).not.toContain(plane);
    });

    describe('in clement weather', function(){
      beforeEach(function(){
        spyOn(Math, 'random').and.returnValue(0);
        plane.land(airport);
      });

      it('planes can be instructed to land at an airport', function(){
        expect(airport.planes()).toContain(plane);
      });
  
      it('planes can be instructed to take off and confirm departure', function(){
        expect(plane.takeOff(airport)).toEqual("Departure Successful.")
        expect(airport.planes()).not.toContain(plane);
      });
  
      it('airport blocks takeoff when weather is stormy', function(){
        spyOn(airport._weather, 'isStormy').and.returnValue(true);
        expect(function(){plane.takeOff(airport);}).toThrowError('Cannot take off during storm');
        expect(airport.planes()).toContain(plane);
      });
  
      it('planes cannot land if airport is full', function(){
        airport.alterCapacity(1);
        planeTwo = new Plane();
        planeTwo._location = "in flight";
        expect(function(){planeTwo.land(airport);}).toThrowError('Cannot land - airport is full');
        expect(airport.planes()).not.toContain(planeTwo);
      });
    });
  });
});
