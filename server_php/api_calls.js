$(document).ready(function(){
    $("#send").click(function(){
        pid = $("#pid").val();
        cid = $("#cid").val();
        pname = $("#pname").val();
        pprice = $("#pprice").val();

        serverURL = "addProduct.php?id=" + pid 
            + "&cat_id=" + cid 
            + "&name=" + pname 
            + "&price=" + pprice;

        $.get(serverURL, function(data, status){
            $("#status").text(data + " record(s) has been inserted.");
        });
    });
});
