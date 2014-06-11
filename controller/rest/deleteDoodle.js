function RestDeletedoodleController() {
    var self = this;
    
    self.polls = ko.observableArray();
    self.selectedPoll = ko.observable();
    
    self.deletePoll = function(){
        // TODO: X-Doodle Key aus dem Header und 16 Charakter Id 
        //       wird zum Löschen benötigt. Muss noch zusätzlich
        //       gespeichert werden.
        app.rest.deletePoll(self.selectedPoll(), function() {
           console.log("successfully deleted poll"); 
        }); 
    };
    
     var ObservablePoll = function(id, name){
        this.pollName = name;
        this.pollId = id;
    };

    
    self.initController = function() {
        self.loadPoll();
        self.selectedPoll(self.polls()[0]);
    };
    
    self.loadPoll = function() {
        var pollQuery = "SELECT * FROM poll";
        app.db.query(pollQuery, [], function(results) {
            var len = results.rows.length;
            for (var rowIndex = 0; rowIndex < len; rowIndex++) {
                var row = results.rows.item(rowIndex);
                self.polls.push({"id": row.id, "name": row.name});
            }
        });
    };
}

