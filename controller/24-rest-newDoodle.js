function RestnewdoodleController() {
    var self = this;
    
    var level = 3;
    var locale = "de";
    var hidden = false;
    var location = "internet";
    
    self.id = ko.observable(id);
    self.title = ko.observable(title);
    self.description = ko.observable(desc);
    self.name = ko.observable(name);
    self.email = ko.observable(email);
    self.options = ko.observableArray(option);

    self.addOption = function(){
        self.options.push({"id": this.options().length, "email": ""});
    };

    self.options.push({"id": 0, "email": ""});

    // rest poll call
    self.createPoll = function(){
        
    };
    
}

