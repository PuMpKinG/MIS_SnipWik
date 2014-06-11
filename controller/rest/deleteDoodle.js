function RestDeletedoodleController() {
    var self = this;
    
    self.polls = ko.observableArray();
    self.selectedPoll = ko.observable();
    
    self.deletePoll = function(){
        app.rest.deletePoll(self.selectedPoll(), function() {
           self.deletePollOnDB(self.selectedPoll().pollId);
           
        }); 
    };
    
   var ObservablePoll = function(id, name, key){
        this.pollName = name;
        this.pollId = id;
        this.doodleKey = key;
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
                self.polls.push(new ObservablePoll(row.id, row.name, row.doodleKey));
            }
        });
    };
    
    self.deletePollOnDB = function(id){
        var pollQuery = "DELETE FROM poll WHERE id = ?";
         app.db.query(pollQuery, [id], function(){
            alert("successfull deleted") ;
         });
    };
}

