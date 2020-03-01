'use strict';

describe('Plane', function(){
  var plane;
  var airport;
  var crab;

  beforeEach(function() { 
    plane = new Plane();
    airport = jasmine.createSpyObj('airport',['clearForLanding','clearForTakeOff','isAirport']);
    crab = jasmine.createSpyObj('crab',['isNotAirport']);
    plane.land(airport);
  });

  it('can land at an airport', function(){
    expect(airport.clearForLanding).toHaveBeenCalledWith(plane);
  });

  it('can be instructed to take off', function(){
    plane.takeOff();
    expect(airport.clearForTakeOff).toHaveBeenCalledWith(plane);
  });

  it('confirms departure', function(){
    expect(plane.takeOff()).toEqual("Departure Successful.");
  });

  it('will only land at an airport', function(){
    expect(function(){plane.land(crab);}).toThrowError("Cannot land - invalid airport");
  });

  it('will not land when already on ground', function(){
    expect(function(){plane.land(airport);}).toThrowError("Cannot land - already grounded");
  });
});