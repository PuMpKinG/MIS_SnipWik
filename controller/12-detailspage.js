function DetailspageController() {
    var self = this;

    self.solution = ko.observable();
    self.details = ko.observableArray();

    // FIXME: id aus searchresult page übergeben
    self.initController = function(solutionId) {
        var solutionId = 1;
        var query = "SELECT sd.content, sdt.type_name, sdt.type FROM solution_detail sd INNER JOIN solution_detail_type sdt ON sdt.id = sd.detail_type_id WHERE sd.solution_id = ?";
        app.db.query(query, [solutionId], function(results) {
            console.log("TEST");
            var len = results.rows.length;
            for (var rowIndex = 0; rowIndex < len; rowIndex++) {
                var row = results.rows.item(rowIndex);
                self.details.push({"content" : row.content, "title" : row.type_name, "type" : row.type});
            }
        });
    };
}


