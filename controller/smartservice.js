var cachedData = new Array();

///////////////////////// IService - Interface /////////////////////////
var IService = {
    getItems : function(pollId, callback) {
    }
};

///////////////////////// RemoteService Class /////////////////////////
var RemoteService = function() {
};
// Extend the IService
RemoteService.prototype = Object.create(IService);
// Implementations
RemoteService.prototype.getItems = function(pollId, callback) {
    app.rest.getPoll(pollId, function(data) {
        cachedData[pollId] = data;
        callback(data);
    });
};

///////////////////////// LocalService Class /////////////////////////
var LocalService = function() {
};
// Extend the IService
LocalService.prototype = Object.create(IService);
// Implementation of getItems
LocalService.prototype.getItems = function(pollId, callback) {
    var data = cachedData[pollId];
    callback(data);
};

///////////////////////// Service Facade Class /////////////////////////
function ServiceFacade() {
    var networkState = 0;
    var iService;

    this.init = function() {
        if (networkState === 1) {
            iService = new RemoteService();
        } else {
            iService = new LocalService();
        }
    };

    // TODO: This should be listening for online status changes of mobile
    this.ConnectionStateChanged = function(onlineState) {
        networkState = onlineState;

        if (networkState === 1) {
            // Replace with a toast msg
            console.log("Connection state changed to online");
            iService = new RemoteService();
        } else {
            console.log("Connection state changed to offline");
            iService = new LocalService();
        }
    };
    
    this.getItems = function(pollId, callback) {
        return iService.getItems(pollId, callback);
    };

    this.init();
}