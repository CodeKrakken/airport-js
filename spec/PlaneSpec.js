'use strict';

describe('Plane', function(){
  var plane;
  var airport;

  beforeEach(function() { 
    plane = new Plane();
    airport = jasmine.createSpyObj('airport',['clearForLanding','clearForTakeOff']);
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
});