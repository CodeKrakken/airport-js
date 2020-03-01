'use strict';

function Plane(){};

Plane.prototype.land = function(airport) {
  if (airport.isNotAirport) throw new Error('Cannot land - invalid airport');
  airport.clearForLanding(this);
  this._location = airport;
};

Plane.prototype.takeOff = function() {
  this._location.clearForTakeOff(this);
  return "Departure Successful.";
}