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
    //console.log(JSON.stringify(userObject))

    var onSignIn = function(loggedIn){
        if(loggedIn){
            //console.log("Logged In");
            $("#s1").hide();
        }
        else{
            //console.log("Not Logged In");
            $("#s1").hide();
            
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
                
            }

        }  
    
    })


function pay(){
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 10000);
}

function checkout(){
    var location = document.getElementById('loc');
    var invalid = location.value == "Please Select";
   
    if(document.getElementById("1").value.length == 0 || document.getElementById("2").value.length == 0 || 
        document.getElementById("3").value.length == 0 || document.getElementById("4").value.length == 0 ||
        document.getElementById("5").value.length == 0 || document.getElementById("6").value.length == 0 || invalid )
        {
            alert("Please fill all the required fields!")
            
        }
    
    else
    {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 10000);
        window.location.href="/finalPay"

    }
        
}


function finish(){
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 10000);
        window.location.href="/orders" 
}


