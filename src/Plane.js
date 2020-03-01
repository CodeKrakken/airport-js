'use strict';

function Plane(){};

Plane.prototype.land = function(airport) {
  if (airport.isNotAirport) throw new Error('Cannot land - invalid airport');
  if (this._location === airport) throw new Error('Cannot land - already grounded');
  airport.clearForLanding(this);
  this._location = airport;
};

Plane.prototype.takeOff = function() {
  this._location.clearForTakeOff(this);
  this._location = "Not in Airport";
  return "Departure Successful.";
}