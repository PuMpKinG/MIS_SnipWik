/* global used variables for app state */
function AppState() {
    var self = this;

    var debugOnTablet = null;
    var solutionId = null;
    var editSolution = null;
    var editDetails = null;
    
    self.debugOnTablet = function (v) {
        if (typeof v !== 'undefined') { debugOnTablet = v; }
        return (typeof debugOnTablet === 'undefined') ? null : debugOnTablet;
    };
    
    self.solutionId = function (v) {
        if (typeof v !== 'undefined') { solutionId = v; }
        return (typeof solutionId === 'undefined') ? null : solutionId;
    };
    
    self.editSolution = function (v) {
        if (typeof v !== 'undefined') { editSolution = v; }
        return (typeof editSolution === 'undefined') ? null : editSolution;
    };
    
    self.editDetails = function (v) {
        if (typeof v !== 'undefined') { editDetails = v; }
        return (typeof editDetails === 'undefined') ? null : editDetails;
    };

}