function logout() {
    $.ajax({
        url: "/api/logout",
        method: "get",
        success: function() {

            window.location = '/login'
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
        $("#signedIn").html(`Welcome ` + data.username)
        $("#signedIn").css({"text-align" : "center" ,"background-color": "powderblue", "font-size": "200%"})
        
    }
})