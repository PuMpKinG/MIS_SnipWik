var IService = {
    getItems : function(pollId, callback) {
    }
};


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

///////////////////////// Service Facade Class /////////////////////////
function ServiceFacade() {
    var networkState = 0;
    var iService;
    var requestQueue  = new Array;
    
    var mustQueue = false;

    this.init = function() {
        iService = new RemoteService();
    };

    // TODO: This should be listening for online status changes of mobile
    this.ConnectionStateChanged = function(onlineState) {
        networkState = onlineState;

        if (networkState === 1) {
            // Replace with a toast msg
            console.log("Connection state changed to online");
            mustQueue = false;
            requestQueue.forEach(function(item){
                iService.getItems(item.pollId, item.callback);
            });
        } else {
            console.log("Connection state changed to offline");
            mustQueue = true;
        }
    };
    
    this.getItems = function(pollId, callback) {
       if(mustQueue){
           requestQueue.push({pollId: pollId, callback: callback});
       } else {
           iService.getItems(pollId, callback);
       }
    };
    
    
}  


