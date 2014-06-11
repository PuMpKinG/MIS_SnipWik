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
    self.participants = ko.observableArray();


    var ObservableParticipant = function(id, name, userId, options) {
        var obsPar = this;
        obsPar.id = ko.observable(id);
        obsPar.pname = ko.observable(name);
        obsPar.userId = ko.observable(userId);
        obsPar.printSelected = "";

        // option in rest sehen so aus:
        //<option>0</option> 
        //<option>0</option> 
        //<option>0</option> 
        //<option>0</option> 
        //<option>1</option>
        var idx = 0;
        options.forEach(function(option) {
            if (option == 1) {
                obsPar.printSelected += self.options()[idx].option + " ";
            }
            idx++;
        });
    };
    
    var ObservablePoll = function(id, name){
        this.pollName = name;
        this.pollId = id;
    };

    self.selectedPollChanged = function() {    
        self.options.removeAll();
        self.participants.removeAll();
        
        console.log("selected poll:" + self.selectedPoll().pollId);
        app.rest.getPoll(self.selectedPoll().pollId, function(data) {
            self.parsePoll(data);
        });
    };


    self.initController = function() {
        self.loadPoll();
        self.selectedPoll(self.polls()[0]);
        
        //var testData = "<?xml version='1.0' encoding='UTF-8'?><poll xmlns='http://doodle.com/xsd1'><latestChange>2014-06-04T23:17:19+02:00</latestChange><type>TEXT</type><extensions/><hidden>false</hidden><writeOnce>false</writeOnce><requireAddress>false</requireAddress><requireEMail>false</requireEMail><requirePhone>false</requirePhone><byInvitationOnly>false</byInvitationOnly><levels>2</levels><state>OPEN</state><language>en</language><title>Test</title><description>Test-Umfrage</description><initiator><name>Ich</name><userId></userId><eMailAddress></eMailAddress></initiator><options><option>Huhn</option><option>Ei</option></options><participants><participant><id>1</id><name>Myke</name><userId>rgnrsqvsirr5s22srgnrsqvsirr5s22s</userId><preferences><option></option><option>0</option><option>1</option></preferences></participant></participants><comments nrOf='0'></comments><features></features></poll>";
        //self.parsePoll(testData);
    };

    self.parsePoll = function(data) {
        var xml = $.xml2json(data);    
            self.title(xml.title);
            self.description(xml.description);
            self.name(xml.initiator.name);
            self.email(xml.initiator.eMailAddress);
            $.each(xml.options.option, function(i, item){
                self.options.push({"id": self.options().length, "option": item});
            });            
            $.each(xml.participants, function(i, item){
                if(! typeof item === 'string')
                    self.participants.push(new ObservableParticipant(item.id, item.name, item.userId, item.preferences.option));
            });
    };

    self.loadPoll = function() {
        var pollQuery = "SELECT * FROM poll";
        app.db.query(pollQuery, [], function(results) {
            var len = results.rows.length;
            for (var rowIndex = 0; rowIndex < len; rowIndex++) {
                var row = results.rows.item(rowIndex);
                self.polls.push(new ObservablePoll(row.id, row.name));
            }
        });
    };
}

