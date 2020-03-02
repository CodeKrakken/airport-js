'use strict';

describe('Plane', function(){
  var plane;
  var airport;
  var crab;

  beforeEach(function() { 
    plane = new Plane();
    airport = jasmine.createSpyObj('airport',['clearForLanding','clearForTakeOff','isAirport']);
    crab = jasmine.createSpyObj('crab',['walkSideways']);
    plane._location = "in flight";
    plane.land(airport);
  });

  it('can land at an airport', function(){
    expect(airport.clearForLanding).toHaveBeenCalledWith(plane);
  });

  it('can be instructed to take off', function(){
    plane.takeOff(airport);
    expect(airport.clearForTakeOff).toHaveBeenCalledWith(plane);
  });

  it('confirms departure', function(){
    expect(plane.takeOff(airport)).toEqual("Departure Successful.");
  });

  it('will only land at an airport', function(){
    plane.takeOff(airport);
    expect(function(){plane.land(crab);}).toThrowError("Cannot land - invalid airport");
  });

  it('will not land when already on ground', function(){
    expect(function(){plane.land(airport);}).toThrowError("Cannot land - already grounded");
  });

  it('will not tke off when already in flight', function(){
    plane.takeOff(airport);
    expect(function(){plane.takeOff(airport);}).toThrowError("Cannot take off - already in flight");
  });
});