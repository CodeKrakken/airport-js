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
  });

  it('can check for stormy conditions', function(){
    expect(airport.isStormy()).toBeFalsy();
  });

  describe('under stormy conditions', function(){
    it('does not clear planes for take off', function(){
      spyOn(airport, 'isStormy').and.returnValue(true);
      expect(function(){ airport.clearForTakeOff(plane); }).toThrowError('Cannot take off during storm');
    });
  });
});
