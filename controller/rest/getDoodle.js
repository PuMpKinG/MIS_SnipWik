function RestGetdoodleController() {
    var self = this;
    
    self.polls = ko.observableArray();
    self.selectedPoll = ko.observable();
    
    // aktuell angezeigte Umfrage Daten
    self.id = ko.observable();
    self.title = ko.observable();
    self.description = ko.observable();
    self.name = ko.observable();
    self.email = ko.observable();
    
    self.options = ko.observableArray();
    self.participants = ko.observaleArray();
    
    
    var ObservableParticipant = function(id, name, userID, options){
        var obsPar = this;
        
        obsPar.id = ko.observable(id);
        obsPar.name = ko.observable(name);
        obsPar.userId = ko.observable(userId);
        obsPar.selectedOptions = ko.observableArray();
        
        // option in rest sehen so aus:
        //<option>0</option> 
        //<option>0</option> 
        //<option>0</option> 
        //<option>0</option> 
        //<option>1</option>
        options.forEach(function(option){
            if(option == 1){
                obspar.selectedOptions.push(self.options()[option]);
            }
        })
        
        obsPar.printSelected = ko.computed(function(){
            var ret = "";
            obsPar.selectedOptions.forEach(function(sel){
                ret = ret + sel; 
            });
            return ret;
        }, this);
    }
    
    self.selectedPollChanged = function(){
        //new rest call for selected  poll
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
                self.polls.push({"id": rowIndex, "name": row.name});
            }
        });
    }
    
    
    
}

