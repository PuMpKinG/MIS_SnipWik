function LocationController() {
    var self = this;

    self.locationdata = ko.observable("");
    self.watchID = ko.observable();

    self.initController = function() {
        // Vllt autostart?
        // self.start();
    };
    
    self.start = function() {
        console.log("Start");
        var options = { timeout: 30000 };
        self.locationdata(self.locationdata()+ "Start<br/>");
        self.watchID = navigator.geolocation.watchPosition( function(position) {
            var str = 'Lat: '+position.coords.latitude+' | '+'Long: '+position.coords.longitude+' | '+'Speed: '+position.coords.speed+" m/s";
            console.log(str);
            self.locationdata(self.locationdata() + str + '<br/>');
        }, function(){
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }, options);
    };
    
    self.stop = function() {
        console.log("Stop");
        self.locationdata(self.locationdata()+ "Stop<br/>");
        if (self.watchID != "") {
            navigator.geolocation.clearWatch(self.watchID);
            self.watchID = "";
        }
    };
}

