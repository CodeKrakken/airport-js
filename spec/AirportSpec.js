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

  describe('in clement conditions', function(){
    beforeEach(function() {
      spyOn(Math, 'random').and.returnValue(0);
    })

    it('has a default capacity of 100', function(){
      expect(airport.capacity).toEqual(100);
    });

    it('can have its capacity changed', function(){
      airport.alterCapacity(1);
      expect(airport.capacity).toEqual(1);
    });

    it('will not make its capacity smaller than number of planes in hangar', function(){
      airport.clearForLanding(plane);
      airport.clearForLanding(planeTwo);
      expect(function(){ airport.alterCapacity(1); }).toThrowError('Cannot alter capacity - current plane count exceeds requested capacity');
    })

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
  })

  describe('under stormy conditions', function(){
    beforeEach(function(){
      spyOn(Math, 'random').and.returnValue(1);
    });

    it('does not clear planes for take off', function(){
      expect(function(){ airport.clearForTakeOff(plane); }).toThrowError('Cannot take off during storm');
    });

    it('does not clear planes for landing', function(){
      expect(function(){ airport.clearForLanding(plane); }).toThrowError('Cannot land during storm');
    });
  });
});
