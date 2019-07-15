$(document).ready( function(){

    $('.switch-button').click( function(){
        
        var fromcontent = $('#from').html();
        console.log(fromcontent)
        var tocontent = $('#to').html();
        console.log(tocontent)

		if($('#from').html() === fromcontent){
			$('#from').html(tocontent);
			$('#to').html(fromcontent);
		} else{
			$('#from').html(fromcontent);
			$('#to').html(tocontent);
		}
		
	});

});
