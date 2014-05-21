/* global used variables for app state */
function AppState() {
    var self = this;

    var debugOnTablet = null;
    var solutionId = null;
    
    self.debugOnTablet = function (v) {
        if (typeof v !== 'undefined') { debugOnTablet = v; }
        return (typeof debugOnTablet === 'undefined') ? null : debugOnTablet;
    };
    
    self.solutionId = function (v) {
        if (typeof v !== 'undefined') { solutionId = v; }
        return (typeof solutionId === 'undefined') ? null : solutionId;
    };

}