function RestNewdoodleController() {
    var self = this;
    
    var level = 3;
    var locale = "de";
    var hidden = false;
    var location = "internet";
    
    self.id = ko.observable();
    self.title = ko.observable();
    self.description = ko.observable();
    self.name = ko.observable();
    self.email = ko.observable();
    self.options = ko.observableArray();

    self.addOption = function(){
        self.options.push({"id": this.options().length, "option": ""});
    };

    self.createPoll = function(){
        // create xml from variables
        // call rest api call
    };
    
    self.options.push({"id": 0, "option": ""});
    
}

