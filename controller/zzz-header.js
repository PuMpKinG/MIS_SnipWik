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

            setTimeout(function() {
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
        if (param == "startpage") {
            app.navigateTo(param, {reset : true, nohistory : true});
        } else {
            app.navigateTo(param);
        }
    };

    self.openProfilSettings = function() {
        self.optionBtnClick();
        app.navigateTo("profilsettings");
    }

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

    self.navToClient = function(navController) {
        self.optionBtnClick();
        app.navigateTo(navController);

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

        var controllerName = "StartpageController";
        if (app.getCurrentController().constructor) {
            controllerName = app.getCurrentController().constructor.name;
        }
        
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
                app.headerTitleText("Suchergebnisse");
                break;
            case "DetailspageController":
                self.headerLeftIcon("fa fa-chevron-left");
                self.headerMiddleSpace("col-xs-8");
                self.isPencilVisible(true);
                self.isHistoryVisible(true);
                self.isSearchVisible(true);
                app.headerTitleText("Details");
                break;
            case "EditmodeController":
                self.headerLeftIcon("fa fa-chevron-left");
                self.headerMiddleSpace("col-xs-9");
                self.isPencilVisible(false);
                self.isHistoryVisible(true);
                self.isSearchVisible(true);
                app.headerTitleText("Editiermodus");
                break;
            case "HistoryController":
                self.headerLeftIcon("fa fa-chevron-left");
                self.headerMiddleSpace("col-xs-10");
                self.isPencilVisible(false);
                self.isHistoryVisible(false);
                self.isSearchVisible(true);
                app.headerTitleText("Letzte Änderungen");
                break;
            case "ProfilsettingsController":
                self.headerLeftIcon("fa fa-chevron-left");
                self.headerMiddleSpace("col-xs-10");
                self.isPencilVisible(false);
                self.isHistoryVisible(false);
                self.isSearchVisible(true);
                app.headerTitleText("Einstellungen");
                break;
            case "SoapclientController":
                self.headerLeftIcon("fa fa-chevron-left");
                self.headerMiddleSpace("col-xs-11");
                self.isPencilVisible(false);
                self.isHistoryVisible(false);
                self.isSearchVisible(false);
                app.headerTitleText("SOAP");
                break;
            case "RestAnswerdoodleController":
                self.headerLeftIcon("fa fa-chevron-left");
                self.headerMiddleSpace("col-xs-11");
                self.isPencilVisible(false);
                self.isHistoryVisible(false);
                self.isSearchVisible(false);
                app.headerTitleText("REST");
                break;
            case "RestDeletedoodleController":
                self.headerLeftIcon("fa fa-chevron-left");
                self.headerMiddleSpace("col-xs-11");
                self.isPencilVisible(false);
                self.isHistoryVisible(false);
                self.isSearchVisible(false);
                app.headerTitleText("REST");
                break;
            case "RestGetdoodleController":
                self.headerLeftIcon("fa fa-chevron-left");
                self.headerMiddleSpace("col-xs-11");
                self.isPencilVisible(false);
                self.isHistoryVisible(false);
                self.isSearchVisible(false);
                app.headerTitleText("REST");
                break;
            case "RestNewdoodleController":
                self.headerLeftIcon("fa fa-chevron-left");
                self.headerMiddleSpace("col-xs-11");
                self.isPencilVisible(false);
                self.isHistoryVisible(false);
                self.isSearchVisible(false);
                app.headerTitleText("REST");
                break;
        }
    }

    self.initController = function() {
        self.loggedInPersonData({
            FirstName : "Kermit",
            LastName : "Der Frosch"
        });

        initButtons();
        self.nobodyIsLoggedIn(true);

    };

    self.refreshCotroller = function() {
        initButtons();
    }


    self.departments.push(new ObservableDepartment("Praktikum 3", [{"name" : "Soap-Client", "nav" : "soapclient"}, {"name" : "Rest-Client", "nav" : "restclient"}]));

}

app.header = new HeaderController();
app.header.initController();