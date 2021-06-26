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
                   
            <td>You have no orders placed</td>
            <td></td>
            <td></td>

        </tr>`
      
        $('#tests-table').append(row)
        }

      
        for(var i=0;i<data.length;i++) {
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
    date1 = date.toString().substring(4, 16)
    var row = `<tr scope="row" >
                   
                   <td>${obj.packageName}</td>
                   <td>${obj.price}</td>
                    <td>${(date1)}</td>
 
               </tr>`
             
    $('#tests-table').append(row)

}