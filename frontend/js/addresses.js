$(function(){
	// This will be called when page is loaded
	$.ajax({
		url: "/api/addresses",
		method: "get",
	})
	.done(function( data ) {
		$("#addresses").html(data);
	});
});