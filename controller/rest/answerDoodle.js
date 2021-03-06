function RestAnswerdoodleController() {
    var self = this;

    self.polls = ko.observableArray();

    // aktuell angezeigte Umfrage Daten
    self.id = ko.observable();
    self.title = ko.observable();
    self.description = ko.observable();
    self.name = ko.observable();
    self.options = ko.observableArray();

    //participant Info
    self.personName = ko.observable();
    self.answerOptions = new Array();

     self.selectedPoll = ko.observable();
    
    var ObservablePoll = function(id, name, key){
        this.pollName = name;
        this.pollId = id;
        this.doodleKey = key;
    };

    function getAnswerCheckboxes(chkboxName) {
        var checkboxes = document.getElementsByName(chkboxName);
        var values = new Array();
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                values.push(1);
            } else {
                values.push(0);
            }
        }
        return values;
    }

    self.sendAnswer = function() {
        self.answerOptions = getAnswerCheckboxes("selectedAnswer");

        var data = "<participant xmlns='http://doodle.com/xsd1'>";
        data += "<name>"+self.personName()+"</name>";
        data += "<preferences>";
        self.answerOptions.forEach(function(opt){
            data += "<option>"+opt+"</option>";
        });
        data += "</preferences>";
        data += "</participant>";

        console.log(data);

        app.rest.postParticipant(self.selectedPoll().pollId, data,
                function(data, jqXHR) {
                    console.log("success push new participant for poll with id: " + self.id() + ", data: " + data);
                    alert("answer ok");
                },
                function(jqXHR, jsonValue) {
                    console.log("error push new participant for poll with id: " + self.id() +"error: " + jsonValue);
                    alert("answer failed");
                });
    };

    self.initController = function() {
        self.loadPoll();
        self.selectedPoll(self.polls()[0]);
        //var testData = "<?xml version='1.0' encoding='UTF-8'?><poll xmlns='http://doodle.com/xsd1'><latestChange>2014-06-04T23:17:19+02:00</latestChange><type>TEXT</type><extensions/><hidden>false</hidden><writeOnce>false</writeOnce><requireAddress>false</requireAddress><requireEMail>false</requireEMail><requirePhone>false</requirePhone><byInvitationOnly>false</byInvitationOnly><levels>2</levels><state>OPEN</state><language>en</language><title>Test</title><description>Test-Umfrage</description><initiator><name>Ich</name><userId></userId><eMailAddress></eMailAddress></initiator><options><option>Huhn</option><option>Ei</option></options><participants nrOf='0'></participants><comments nrOf='0'></comments><features></features></poll>";
        
        //self.parsePoll(testData);
    };
    
    self.selectedPollChanged = function() {    
        self.options.removeAll();
        
        console.log("selected poll:" + self.selectedPoll().pollId);
        app.rest.getPoll(self.selectedPoll().pollId, function(data) {
            self.parsePoll(data);
        });
    };

    self.parsePoll = function(data) {
        var xml = $.xml2json(data);    
            self.title(xml.title);
            self.description(xml.description);
            self.name(xml.initiator.name);
            $.each(xml.options.option, function(i, item){
                self.options.push({"id": self.options().length, "name": item});
            });
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
}

