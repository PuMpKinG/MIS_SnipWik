/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**** String extensions ***/

// return true, if a string ends with a specific substring
String.prototype.endsWith = function(substring) {
    return this.length >= substring.length && this.substr(this.length - substring.length) == substring;
};

// like php ucfirst: upper cases first letter
String.prototype.ucfirst = function() {
    return this.substr(0, 1).toUpperCase() + this.substr(1);
};

// return true or false, if a string contains another
String.prototype.contains = function (substring) {
    return (this.indexOf(substring) > -1);
};

// extending string with .toCamel() function
String.prototype.toCamel = function () {
    return this.replace(/(\-[a-z])/g, function ($1) { return $1.toUpperCase().replace('-', ''); });
};


String.prototype.equals = function (otherString) {
    return this == otherString;
};


/**** Array extensions ***/

// if not supported by plattform: define forEach
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(fn, scope) {
        for (var i = 0, len = this.length; i < len; ++i) {
            fn.call(scope, this[i], i, this);
        }
    };
}

// clears all items from array
Array.prototype.clear = function () {
    this.length = 0;
};

// returns true or false, if list contains any items
Array.prototype.any = function (predicate) {
    var self = this;
    
    if (typeof predicate == "undefined") return (self.length > 0);

    var hasAny = false;

    self.forEach(function (element) {
        if (predicate(element)) hasAny = true;
    });

    return hasAny;
};

// returns true or false, if list contains all items, where the predicate applies
Array.prototype.all = function (predicate) {
    var self = this;

    if (typeof predicate == "undefined") return (self.length > 0);

    var hasAny = true;

    self.forEach(function (element) {
        if (!predicate(element)) hasAny = false;
    });

    return hasAny;
};

// returns the last element of an array
Array.prototype.last = function () {
    if (this.length == 0) return null;
    return this[this.length - 1];
};

// returns the last element of an array
Array.prototype.first = function () {
    if (this.length == 0) return null;
    return this[0];
};

Array.prototype.contains = function (element) {
    var result = false;
    this.forEach(function(item) {
        if (item == element) result = true;
    });
    return result;
};

Array.prototype.find = function (comparer) {
    var result = null;
    this.forEach(function (item) {
        if (comparer(item)) result = item;
    });
    return result;
};

Array.prototype.getNextArrayIndex = function (index) {
    if (index == this.length - 1)
        return (0);
    else {
        return (index + 1);
    }
};

Array.prototype.getPreviousArrayIndex = function (index) {
    if (index == 0)
        return (this.length - 1);
    else {
        return (index - 1);
    }
};

