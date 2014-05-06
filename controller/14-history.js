function HistoryController() {
    var self = this;

    self.historyEntries = ko.observableArray();

    var ObservableHistoryEntry = function(id, description, author, date) {
        var obsHis = this;

        obsHis.id = ko.observable(id);
        obsHis.description = ko.observable(description);
        obsHis.author = ko.observable(author);
        obsHis.date = ko.observable(date);

        obsHis.togglePanel = function() {
            // klappe alle zu
            self.historyEntries().forEach(function(item){
                app.collapseDiv(item.id()+"Panel");
            });
            
            // klappe aktuelles element aus
            app.expandDiv(obsHis.id()+"Panel");
            
        };
    };

    self.initController = function() {
        self.historyEntries.push(new ObservableHistoryEntry(0, "Speicheroptimierung", "dieter", new Date().toDateString()));
        self.historyEntries.push(new ObservableHistoryEntry(1, "Einlesen verändert", "franz", new Date().toDateString()));
        self.historyEntries.push(new ObservableHistoryEntry(2, "Fomular erstellt", "dieter", new Date().toDateString()));
    };
}



