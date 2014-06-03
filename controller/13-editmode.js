function EditmodeController() {
    var self = this;

    self.solutionId;
    self.solution = ko.observable();
    self.details = ko.observableArray();

    self.savData = function() {
        saveSolution();
        saveDetails();

        app.header.headerLeftClickEvent();
    };

    self.initController = function() {
        self.solutionId = app.state.solutionId();
        self.solution = app.state.editSolution();
        self.details = app.state.editDetails();
    };

    function saveSolution() {
        var solutionQuery = "UPDATE solution SET name = ? WHERE id = ?";
        app.db.query(solutionQuery, [self.solution(), self.solutionId]);
    }

    function saveDetails() {
        var details = ko.utils.unwrapObservable(self.details);
        
        
        $.each(details, function(index, detail) {
            console.log(detail);
            var solutionQuery = "UPDATE solution_detail SET content = ? WHERE id = ?";
            app.db.query(solutionQuery, [detail.content, detail.itemId]);
        });
    }
}



