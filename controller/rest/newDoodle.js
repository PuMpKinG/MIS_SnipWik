function RestNewdoodleController() {
    var self = this;

    var level = 3;
    var locale = "de";
    var hidden = false;
    var location = "internet";

    self.id = ko.observable();
    self.title = ko.observable("Test");
    self.description = ko.observable("Test-Umfrage");
    self.name = ko.observable("Ich");
    self.email = ko.observable("Ich@ich.de");
    self.options = ko.observableArray();

    self.addOption = function() {
        self.options.push({"id": this.options().length, "option": ""});
        
    };

    self.options.push({"id": 0, "option": "Huhn"});
    self.options.push({"id": 1, "option": "Ei"});

    // rest poll call
    self.createPoll = function() {
        var data = "<?xml version='1.0' encoding='UTF-8'?>";
        data += "<poll xmlns='http://doodle.com/xsd1'>";
        data += "<type>TEXT</type>";
        data += "<hidden>false</hidden>";
        data += "<levels>2</levels>";
        data += "<title>"+self.title()+"</title>";
        data += "<description>"+self.description()+"</description>";        
        data += "<initator><name>"+self.name()+"</name></initator>";
        data += "<options>";        
        ko.utils.arrayForEach(this.options(), function(opt) {
            data += "<option>" + opt.option + "</option>";
        });
        data += "</options>";
        data += "</poll>";

        console.log(data);

        app.rest.postPoll(data, 
        function(data, jqXHR) {
            var id = jqXHR.getResponseHeader("Content-Location");
            console.log("success push new doodle with answer: " + data);
            console.log("success push new doodle with answer: id " + id );
            alert(data);
            alert(id);
            self.id(id);
            savePoll();
        },
        function(jqXHR, jsonValue) {
            console.log("error on push new doole: " + jsonValue);
        });
    };

    //save doodleID and Name in DB
    self.savePoll = function () {
        // TODO: Id und X-Doodle Key müssen gespeichert werden.
        var pollQuery = "INSERT INTO poll (id, name) VALUES (?, ?)";
        app.db.query(pollQuery, [self.id(), self.name()]);
    };
    
    self.initController = function() {
            
    };
}

