function SearchresultController() {
    var self = this;

    self.searchresult = ko.observableArray();

    self.navigateToDetails = function(solutionId) {
        app.state.solutionId(solutionId);
        app.navigateTo("detailspage");
    };

    self.initController = function() {
        app.db.query("SELECT * FROM solution ORDER BY id", [], function(results) {
            var len = results.rows.length;
            for (var rowIndex = 0; rowIndex < len; rowIndex++) {
                var row = results.rows.item(rowIndex);
                self.searchresult.push({"solutionId" : row.id, "title" : row.name, "description" : row.description});
            }
        });
    };
}

