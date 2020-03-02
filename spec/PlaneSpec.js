'use strict';

describe('Plane', function(){
  var plane;
  var airport;
  var crab;

  beforeEach(function() { 
    plane = new Plane();
    airport = jasmine.createSpyObj('airport',['clearForLanding','clearForTakeOff','isAirport']);
    crab = jasmine.createSpyObj('crab',['walkSideways']);
    plane._location = airport;
  });

  it('confirms departure', function(){
    expect(plane.takeOff(airport)).toEqual("Departure Successful.");
  });

  it('will not land when already on ground', function(){
    expect(function(){plane.land(airport);}).toThrowError("Cannot land - already grounded");
  });

  describe('in flight', function(){

    beforeEach(function(){
      plane.takeOff(airport);
    });

    it('was successfully instructed to take off', function(){
      expect(airport.clearForTakeOff).toHaveBeenCalledWith(plane);
    });

    it('can land at an airport', function(){
      plane.land(airport);
      expect(airport.clearForLanding).toHaveBeenCalledWith(plane);
    });
  
    it('will only land at an airport', function(){
      expect(function(){plane.land(crab);}).toThrowError("Cannot land - invalid airport");
    });
  
    it('will not take off when already in flight', function(){
      expect(function(){plane.takeOff(airport);}).toThrowError("Cannot take off - already in flight");
    });
  });
});