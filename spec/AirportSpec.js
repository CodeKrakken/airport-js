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

  it('has a default capacity of 100', function(){
    expect(airport.capacity).toEqual(100);
  });

  it('can have its capacity changed', function(){
    airport.alterCapacity(1);
    expect(airport.capacity).toEqual(1);
  });

  it('blocks landing in stormy weather', function(){
    spyOn(Math, 'random').and.returnValue(1);
    expect(function(){ airport.clearForLanding(plane); }).toThrowError('Cannot land during storm');
    expect(airport.planes()).not.toContain(plane);
  });

  describe('in clement conditions', function(){
    beforeEach(function() {
      spyOn(Math, 'random').and.returnValue(0);
      airport.clearForLanding(plane);
      airport.clearForLanding(planeTwo);
    })

    it('can clear a plane for landing', function() {
      expect(airport.planes()).toContain(plane);
    });

    it('will not make its capacity smaller than number of planes in hangar', function(){
      expect(function(){ airport.alterCapacity(1); }).toThrowError('Cannot alter capacity - current plane count exceeds requested capacity');
    });

    it('blocks takeoff in stormy weather', function(){
      spyOn(airport._weather, 'isStormy').and.returnValue(true);
      expect(function(){ airport.clearForTakeOff(plane); }).toThrowError('Cannot take off during storm');
      expect(airport.planes()).toContain(plane);
    });

    describe('after takeoff', function(){
      beforeEach(function(){
        airport.clearForTakeOff(plane);
      });

      it('correct plane has been removed from hangar', function(){
        expect(airport.planes()).not.toContain(plane);
        expect(airport.planes()).toContain(planeTwo);
      });
    
      it('plane was cleared for takeoff', function(){
        expect(airport.planes()).not.toContain(plane);
      });
    });
  })
});
