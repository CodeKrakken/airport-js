'use strict';

function Plane(){};

Plane.prototype.land = function(airport) {
  if (airport.isNotAirport) throw new Error('Cannot land - invalid airport');
  if (this._location !== "in flight") throw new Error('Cannot land - already grounded');
  airport.clearForLanding(this);
  this._location = airport;
};

Plane.prototype.takeOff = function(airport) {
  if (this._location === "in flight") throw new Error('Cannot take off - already in flight');
  if (this._location !== airport) throw new Error('Cannot take off - not at that airport');
  this._location.clearForTakeOff(this);
  this._location = "in flight";
  return "Departure Successful.";
}