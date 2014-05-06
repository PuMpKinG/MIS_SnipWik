function ProfilsettingsController(){
    var self = this;
    
    self.deviceType = ko.observableArray();
    self.messagePrio = ko.observableArray();
    
    self.initController = function(){
           self.deviceType.push({"name": "Handy"});
           self.deviceType.push({"name": "E-Mail"});
           self.deviceType.push({"name": "Pop-Up"});
           
           self.messagePrio.push({"name": "Nachrichten zu eigenen Artikeln"});
           self.messagePrio.push({"name": "Nachrichten über Updates"});
           self.messagePrio.push({"name": "Nachrichten wegen Bugs"});
           self.messagePrio.push({"name": "Nachrichten von anderen Abteilungen"});
    }
}


