view();

function view()
{
   
    $.ajax({
        url: "/api/addresses",
        type: "GET",
        success: function(data) {
           
            if(data.length == 0)
            {
                
                    var row = `<tr scope="row" >
                        
                    <td>You have no orders placed yet.</td>
                    <td>-</td>
                    <td>-</td>

                         </tr>`
            
                     $('#tests-table').append(row)
            }
            var rev = data.length
      
            for(var i=rev-1; i>=0; i--) {
                addRow(data[i]);

                }
            },
            error: function (xhr, status, error) {
            alert(error);
            }
        });
}

function addRow(obj) {

    timestamp = obj._id.toString().substring(0,8)
    date = new Date( parseInt( timestamp, 16 ) * 1000 )
    date1 = date.toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})

    var row = `<tr scope="row" >
                   
                   <td>${obj.packageName}</td>
                   <td>${obj.price}</td>
                    <td>${(date1)}</td>
 
               </tr>`
             
    $('#tests-table').append(row)

}