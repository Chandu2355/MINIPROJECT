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
$.ajax({
    url: "/getdetails",
    method: "get",
    success: function(data) {
        {
            if(data.username){

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
                $("#signedIn1").hide()
                $("#signedIn").append(cssLink)
                cssLink.attr({
                    rel: "stylesheet",
                    type: "text/css",
                    href: "css/p1.css"
                }) 
            }

        }  
    },
    
})