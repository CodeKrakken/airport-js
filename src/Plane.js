'use strict';

function Plane(){};

Plane.prototype.land = function(airport) {
  airport.clearForLanding(this);
  this._location = airport;
};

Plane.prototype.takeOff = function() {
  this._location.clearForTakeOff(this);
}