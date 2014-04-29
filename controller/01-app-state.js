/* global used variables for app state */
function AppState() {
    var self = this;

    var debugOnTablet = null;
    
    self.debugOnTablet = function (v) {
        if (typeof v !== 'undefined') { debugOnTablet = v; }
        return (typeof debugOnTablet === 'undefined') ? null : debugOnTablet;
    };

}