'use strict';

describe('Airport', function(){
  var airport;
  var plane;
  var planeTwo;
  var weather;

  beforeEach(function() { 
    airport = new Airport();
    plane = jasmine.createSpy('plane',['land']);
    planeTwo = jasmine.createSpy('plane',['land']);
    weather = jasmine.createSpyObj('weather',['isStormy']);
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

    it('does not clear planes for take off', function(){
      spyOn(Math, 'random').and.returnValue(0);
      airport.clearForLanding(plane);
      spyOn(airport._weather, 'isStormy').and.returnValue(true);
      expect(function(){ airport.clearForTakeOff(plane); }).toThrowError('Cannot take off during storm');
      expect(airport.planes()).toContain(plane);
    });

    it('does not clear planes for landing', function(){
      spyOn(Math, 'random').and.returnValue(1);
      expect(function(){ airport.clearForLanding(plane); }).toThrowError('Cannot land during storm');
      expect(airport.planes()).not.toContain(plane);
    });
  });
});
