function StartpageController(){
    var self = this;
    
    self.searchKeyword = ko.observable();
    self.searchRequestStarted = ko.observable(false);
    self.historyEntries = ko.observableArray();
    self.btnOnlineTxt = ko.observable("Online");
    self.onlineState = ko.observable(true);
    
    self.find = function(){
        app.navigateTo("searchresult");
    };
    
    self.navToRest = function(){
        app.navigateTo("rest/newdoodle");
    };
    
    self.navToSoap = function(){
        app.navigateTo("soapclient");
    };
    
    self.navToConfig = function(){
        app.navigateTo("configuration")
    };
    
    self.switchMode = function() {
        if (self.onlineState()) {
            self.btnOnlineTxt("Offline");
            self.onlineState(false);
            
            app.smartService.ConnectionStateChanged(0);
        } else {
            self.btnOnlineTxt("Online");
            self.onlineState(true);
            
            app.smartService.ConnectionStateChanged(1);
        }
    };
    
    self.initController = function(){
        self.historyEntries.push("> Suche nach Bla");
        self.historyEntries.push("> Suche nach Bla Bla");
        self.historyEntries.push("> Suche nach Bla Bla Bla");
        self.historyEntries.push("> Suche nach Bla Bla Bla Bla");
        self.historyEntries.push("> Suche nach Bla Bla Bla Bla Bla");
        self.historyEntries.push("> Suche nach Bla Bla Bla Bla Bla ...");
        
        
    }
    
}


