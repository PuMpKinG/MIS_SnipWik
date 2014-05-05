function HeaderController() {
    var self = this;

    /***********************************************/
    /***            Variables                    ***/
    /***********************************************/
    self.nobodyIsLoggedIn = ko.observable(true);
    self.loggedInPersonData = ko.observable();
    self.basketItemCount = ko.observable(0);

    self.loginBtnTxt = ko.observable("Login");

    self.email = ko.observable("dadi@dum.de");
    self.password = ko.observable("Test");

    self.departments = ko.observableArray();

    self.loggedInPersonPhoto = ko.observable("css/img/profile_icon.png");
    
    //css style of button
    self.headerLeftIcon = ko.observable();
    self.headerMiddleSpace = ko.observable();
    
    self.isPencilVisible = ko.observable(false);
    self.isHistoryVisible = ko.observable(false);
    self.isSearchVisible = ko.observable(false);

    /***********************************************/
    /***            Functions                    ***/
    /***********************************************/
    self.login = function() {
        if (self.email() != "" && self.password() != "") {
            if (!self.email().contains("@")) {
                alert("Gebe gültige Adresse ein");
                return;
            }
            self.loginBtnTxt('<i class="fa fa-refresh fa-spin" style="color: white; font-size: 14px"></i>');
            
            setTimeout(function(){
                self.loggedInPersonPhoto("css/img/kermit.png");
                self.nobodyIsLoggedIn(false);
            }, 1500);
            
            
        } else {
            bsf.helper.showMessage("Bitte geben Sie gültige Login-Informationen ein");
        }
    };

    self.logout = function() {
        self.nobodyIsLoggedIn(true);
        self.loggedInPersonData(null);
    };

    /***********************************************/
    /***       observable Array Objects          ***/
    /***********************************************/

    var ObservableDepartment = function(name, themes) {
        var obsDep = this;

        obsDep.departmentName = ko.observable(name);
        console.log(themes);
        obsDep.themes = ko.observableArray(themes);
    }

    /***********************************************/
    /***        Navigation-Function              ***/
    /***********************************************/
    // navigation to next screen, look at configuration path
    self.navigateTo = function(param, data, event) {
        if(param == "startpage"){
            app.navigateTo(param, {reset: true, nohistory: true});
        } else {
            app.navigateTo(param);
        }
    };


    /***********************************************/
    /***        Function                         ***/
    /***********************************************/
    self.headerLeftClickEvent = function() {
        if (app.getCurrentController().constructor.name == "StartpageController") {
            self.optionBtnClick();
        } else {
            app.navigateBack();
        }
    }


    // *************************************** //
    //          Header - Animations            //
    // *************************************** //

    self.optionBtnClick = function() {
        $(".header_option_menu.col-xs-10").toggleClass('open');
        $("#scroller").toggleClass('disable');
        $(".grayOverlayBackground").toggleClass("shown");
    };


    /***********************************************/
    /***    initalisation of header              ***/
    /***********************************************/
    initButtons = function() {
        var controllerName = app.getCurrentController().constructor.name;
        switch (controllerName) {
            case "StartpageController":
                self.headerLeftIcon("fa fa-bars");
                self.headerMiddleSpace("col-xs-11");
                self.isPencilVisible(false);
                self.isHistoryVisible(false);
                self.isSearchVisible(false);
                break;
            case "SearchresultController":
                self.headerLeftIcon("fa fa-chevron-left");
                self.headerMiddleSpace("col-xs-11");
                self.isPencilVisible(false);
                self.isHistoryVisible(false);
                self.isSearchVisible(false);
                break;
            case "DetailspageController":
                self.headerLeftIcon("fa fa-chevron-left");
                self.headerMiddleSpace("col-xs-8");
                self.isPencilVisible(true);
                self.isHistoryVisible(true);
                self.isSearchVisible(true);
                break;
            case "EditmodeController":
                self.headerLeftIcon("fa fa-chevron-left");
                self.headerMiddleSpace("col-xs-9");
                self.isPencilVisible(false);
                self.isHistoryVisible(true);
                self.isSearchVisible(true);
                break;
            case "HistoryController":
                self.headerLeftIcon("fa fa-chevron-left");
                self.headerMiddleSpace("col-xs-10");
                self.isPencilVisible(false);
                self.isHistoryVisible(false);
                self.isSearchVisible(true);
                break;
        }
    }

    self.initController = function() {
        self.departments.removeAll();
        self.departments.push(new ObservableDepartment("Abteilung 1", ["Thema 1"]));
        console.log("Hier")
        self.departments.push(new ObservableDepartment("Abteilung 2", ["Thema 2"]));

        self.loggedInPersonData({
            FirstName: "Kermit",
            LastName: "Der Frosch"
        });

        initButtons();
        self.nobodyIsLoggedIn(true);
       
    };
    
    self.refreshCotroller = function(){
        initButtons();
    }
}

app.header = new HeaderController();
app.header.initController();