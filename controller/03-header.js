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

    self.loggedInPersonPhoto = "css/img/profile_icon.png";
    
    /***********************************************/
    /***            Functions                    ***/
    /***********************************************/
    self.login = function () {
        if (self.email() != "" && self.password() != "") {
            if (!self.email().contains("@")) {
                alert("Gebe gültige Adresse ein");
                return;
            }
            self.loginBtnTxt('<i class="fa fa-refresh fa-spin" style="color: white; font-size: 14px"></i>');
            
        } else {
            bsf.helper.showMessage("Bitte geben Sie gültige Login-Informationen ein");
        }
    };

    self.logout = function () {
        self.nobodyIsLoggedIn(true);
        self.loggedInPersonData(null);
    };

    /***********************************************/
    /***       observable Array Objects          ***/
    /***********************************************/

    var ObservableDepartment = function(name, themes){
        var obsDep = this;
        
        obsDep.departmentName = ko.observable(name);
        obsDep.themes = ko.observableArray(themes);
    }

    /***********************************************/
    /***        Navigation-Function              ***/
    /***********************************************/
    // navigation to next screen, look at configuration path
    self.navigateTo = function (param, data, event) {
       app.navigateTo(param);
    };
    

    /***********************************************/
    /***        Function                         ***/
    /***********************************************/



    // *************************************** //
    //          Header - Animations            //
    // *************************************** //

    self.optionBtnClick = function () {
        $(".header_option_menu.col-xs-10").toggleClass('open');
        $("#scroller").toggleClass('disable');
        $(".grayOverlayBackground").toggleClass("shown");
    };


    /***********************************************/
    /***    initalisation of header              ***/
    /***********************************************/
    self.initController = function () {
        var themes = ["Thema 1", "Thema 2", "Thema3"];
        
        self.departments.push(new ObservableDepartment("Abteilung 1", themes));         
        self.departments.push(new ObservableDepartment("Abteilung 2", themes));        
       
       self.loggedInPersonData({
           FirstName: "Peter",
           LastName: "Maffay"
       });
       
       self.nobodyIsLoggedIn(true);
    };

   

}