function RestDeletedoodleController() {
    var self = this;
    
    self.polls = ko.observableArray();
    self.selectedPoll = ko.observable();
    
    self.deletePoll = function(){
        // rest call
    }
    
    self.initController = function() {
        loadPoll();
    }
    
     function loadPoll() {
        var pollQuery = "SELECT * FROM poll";
        app.db.query(pollQuery, [], function(results) {
            var len = results.rows.length;
            for (var rowIndex = 0; rowIndex < len; rowIndex++) {
                var row = results.rows.item(rowIndex);
                self.polls.push({"id": row.id, "name": row.name});
            }
        });
    }
}

