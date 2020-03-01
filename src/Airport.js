'use strict';

function Airport(weather){
  this._weather = typeof weather !== 'undefined' ? weather : new Weather();
  this._hangar = [];
  this.capacity = 100
};

Airport.prototype.planes = function(){ return this._hangar; };

Airport.prototype.clearForLanding = function(plane){
  if(this._weather.isStormy()) {
    throw new Error('Cannot land during storm');
  }
  if(this._hangar.length >= this.capacity) {
    throw new Error('Cannot land - airport is full');
  }
  this._hangar.push(plane);
};

Airport.prototype.clearForTakeOff = function(plane){
  if(this._weather.isStormy()) {
    throw new Error('Cannot take off during storm');
  }
  this._hangar.splice((this._hangar.indexOf(plane)), 1);
};

Airport.prototype.isStormy = function(){
  return false;
};

Airport.prototype.alterCapacity = function(newCapacity){
  if (newCapacity < this._hangar.length) throw new Error('Cannot alter capacity - current plane count exceeds requested capacity')
  this.capacity = newCapacity;
};

Airport.prototype.isAirport = function(){
  return false
};
