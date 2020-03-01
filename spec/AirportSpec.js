'use strict';

describe('Airport', function(){
  var airport;
  var plane;
  var planeTwo;

  beforeEach(function() { 
    airport = new Airport();
    plane = jasmine.createSpy('plane',['land']);
    planeTwo = jasmine.createSpy('plane',['land']);
  });

  it('has no planes by default', function(){
    expect(airport.planes()).toEqual([]);
  });

  it('can clear a plane for landing', function() {
    airport.clearForLanding(plane);
    expect(airport.planes()).toEqual([plane]);
  });

  it('can clear a plane for takeoff', function(){
    airport.clearForLanding(plane);
    airport.clearForTakeOff(plane);
    expect(airport.planes()).not.toContain(plane);
  });

  it('removes only correct plane from hangar upon takeoff', function(){
    airport.clearForLanding(plane);
    airport.clearForLanding(planeTwo);
    airport.clearForTakeOff(plane);
    expect(airport.planes()).toContain(planeTwo);
  })
});
