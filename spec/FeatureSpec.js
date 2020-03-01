'use strict';

describe('Feature Test:', function(){
  var plane;
  var airport;

  beforeEach(function(){
    plane = new Plane();
    airport = new Airport();
  });

  describe('under clement conditions', function(){
    beforeEach(function(){
      spyOn(Math, 'random').and.returnValue(0);
    });

    it('planes can be instructed to land at an airport', function(){
      plane.land(airport);
      expect(airport.planes()).toContain(plane);
    });
  
    it('planes can be instructed to take off', function(){
      plane.land(airport)
      plane.takeOff();
      expect(airport.planes()).not.toContain(plane);
    });
  });

  describe('under stormy conditions', function(){
    beforeEach(function(){

    });

    it('blocks takeoff when weather is stormy', function(){
      spyOn(Math, 'random').and.returnValue(0);
      plane.land(airport)
      spyOn(airport._weather, 'isStormy').and.returnValue(true);
      expect(function(){plane.takeOff();}).toThrowError('Cannot take off during storm');
      expect(airport.planes()).toContain(plane);
    });
  
    it('blocks landing when weather is stormy', function(){
      spyOn(Math, 'random').and.returnValue(1);
      expect(function(){plane.land(airport);}).toThrowError('Cannot land during storm');
    });
  });
});
