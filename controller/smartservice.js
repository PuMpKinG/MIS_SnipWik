// THE Online status IS ONLY SIMULATED: state: 1 - online, 2 - offline
// TODO: replace onlineStatus in Facade with real online status
var onlineStatus = 0;
var cachedData;

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
        cachedData = data;
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
    callback(cachedData);
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

    var SyncServiceContext = function() {
        // TODO: add synching queued items from local service
        console.log("syncing ...");
        // This can be removed after real sycn
    };

    // TODO: This should be listening for online status changes of mobile
    this.ConnectionStateChanged = function(onlineState) {
        networkState = onlineState;

        if (networkState === 1) {
            // Replace with a toast msg
            console.log("Connection state changed to online");
            SyncServiceContext();
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