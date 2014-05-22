function DetailspageController() {
    var self = this;

    self.solution = ko.observable();
    self.details = ko.observableArray();
    
    self.initController = function() {
        var solutionId = app.state.solutionId();
        
        loadSolution(solutionId);
        loadDetails(solutionId);
        
        app.state.editSolution = self.solution;
        app.state.editDetails = self.details;
    };

    function loadSolution(solutionId) {
        var solutionQuery = "SELECT * FROM solution WHERE id = ?";
        app.db.query(solutionQuery, [solutionId], function(results) {
            var len = results.rows.length;
            for (var rowIndex = 0; rowIndex < len; rowIndex++) {
                var row = results.rows.item(rowIndex);
                self.solution(row.name);
            }
        });
    }

    function loadDetails(solutionId) {
        var detailsQuery = "SELECT sd.id, sd.content, sdt.id as typeId, sdt.type_name, sdt.is_code, sdt.is_textual FROM solution_detail sd INNER JOIN solution_detail_type sdt ON sdt.id = sd.detail_type_id WHERE sd.solution_id = ?";
        app.db.query(detailsQuery, [solutionId], function(results) {
            var len = results.rows.length;
            for (var rowIndex = 0; rowIndex < len; rowIndex++) {
                var row = results.rows.item(rowIndex);
                self.details.push({"itemId" : row.id, "content" : row.content, "typeId" : row.typeId, "name" : row.type_name, "isCode" : row.is_code, "isText" : row.is_textual});
            }
        });
    }
}


