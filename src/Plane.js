'use strict';

function Plane(){
  var _location;
};

Plane.prototype.land = function(airport) {
  if (this._location !== "in flight") throw new Error('Cannot land - already grounded');
  if (airport.isAirport) {
    airport.clearForLanding(this);
    this._location = airport;
  } else {
    throw new Error('Cannot land - invalid airport');
  };  
};

Plane.prototype.takeOff = function(airport) {
  if (this._location === "in flight") throw new Error('Cannot take off - already in flight');
  if (this._location !== airport) throw new Error('Cannot take off - not at that airport');
  this._location.clearForTakeOff(this);
  this._location = "in flight";
  return "Departure Successful.";
}