function DetailspageController() {
    var self = this;

    self.solution = ko.observable();

    // FIXME: id aus searchresult page übergeben
    self.initController = function(solutionId) {
        // var query = "SELECT name FROM ";
        app.db.query("SELECT * FROM solution ORDER BY id", function(results) {
            var len = results.rows.length;
            for (var rowIndex = 0; rowIndex < len; rowIndex++) {
                var row = results.rows.item(rowIndex);
                self.searchresult.push({"solutionId" : row.id, "title" : row.name, "description" : row.description});
            }
        });
    };
}


