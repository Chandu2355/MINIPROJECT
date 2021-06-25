function logout() {
    $.ajax({
        url: "/api/logout",
        method: "get",
        success: function() {

            window.location = '/home'
        },
        error: function() {

            window.location.href = '/'
        }
    })
}

function pageInitialise(){
    var userObject = {
        saveUserInLocalStorage : function(userJson){
            window.localStorage.setItem('currentUser', JSON.stringify(userJson));
        },
        removeCurrentUser: function(){
            window.localStorage.removeItem('currentUser');
        },
        getCurrentUser : function(){
            return window.localStorage.getItem('currentUser');
        },
        getCurrentUserName : function(){
            var curUserString = this.getCurrentUser();
            if(curUserString){
                var json = JSON.parse(curUserString);
                if(json && json.username)
                    return json.username;
                return "";
            }
            return "";
        },
        isUserLoggedIn : function(){
            if(this.getCurrentUser()==null)
                return false;
            return true;
        }
    };
    console.log(JSON.stringify(userObject))

    var onSignIn = function(loggedIn){
        if(loggedIn){
            console.log("Logged In");
            $("#s1").hide();
            

        }
        else{
            console.log("Not Logged In");
            $("#s1").show();
            
        }
    }


    if(userObject.isUserLoggedIn()){
        onSignIn(true);
    }
    else{
        onSignIn(false);
    }

 }

$.ajax({
    url: "/getdetails",
    method: "get",
    success: function(data) {

            if(data.username){
                pageInitialise()

                
               //$('#s1').hide()
                

                $("#test").html(`<a> <button id="b1" onclick="logout()" 
                
                style = " border: none;
                color: white;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                transition-duration: 0.4s;
                cursor: pointer;
                background-color: #ce3232; ">LOG OUT</button> </a>`)
                
                $("#signedIn").append("<a> Welcome &nbsp;" + data.username + "</a>")
               

                //$('#signedIn').append('<link rel="stylesheet" type="text/css" href="css/p1.css">');
 
            }

        }  
    
    })

    function pay(){
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    function checkout(){
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

