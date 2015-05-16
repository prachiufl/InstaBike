function wlCommonInit(){
	/*
	 * Use of WL.Client.connect() API before any connectivity to a MobileFirst Server is required. 
	 * This API should be called only once, before any other WL.Client methods that communicate with the MobileFirst Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	
	// Common initialization code goes here
	fetchBikes();
	  fetchContact();
}

function authenticate(){
	var invocationData = {
			adapter: "InstaBikeAdapter",
			procedure: "procedure1",
			parameters: [document.getElementById('textinput5').value, document.getElementById('textinput6').value]
	};
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess: authenticateSuccess, 
		onFailure: authenticateFailure
	});
}

function authenticateSuccess(result){
	if(result.invocationResult.resultSet[0]==null){
		alert("Authentication Failure. Please input valid username and password");
	}else{
		
		console.log("aaaaaaaaaaaaaaaaaauserId" +userId );
		userId = result.invocationResult.resultSet[0].userid;	
		console.log("aaaaaaaaaabbbbbbaaauserId" +userId );
	fetchLenderBikes(userId);
	/*var username = document.getElementById('textinput5').value;
	var password = document.getElementById('textinput6').value;
	var dbUsername = result.invocationResult.resultSet[0].userid;
	var dbPwd = result.invocationResult.resultSet[0].pwd; */
	$.mobile.changePage("#LogIn");
	
	}
	
	
}

function authenticateFailure(result){
	alert("Failure" + JSON.stringify(result));
}

function fetchBikes(){
	var invocationData = {
			adapter: "InstaBikeAdapter",
			procedure: "procedure2",
			parameters: []
	};
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess: fetchBikesSuccess, 
		onFailure: fetchBikesFailure
	});	
}

function fetchBikesSuccess(result){
	var items = result.invocationResult.resultSet;
	bikeInfo.result = items;
	console.log("eeeee" + "bikeInfo.result" + JSON.stringify(bikeInfo.result));
	var ul = $('#bikeList');
	  for (var i = 0; i < items.length; i++) {
		  var li=$("<ul></ul>");
		  li.append($("<li data-theme='c'><a href='#BikeDetails' style='background-color:lightcyan;' data-ownerId='"+items[i].ownerid + "' id='" +items[i].bikeid +"'data-transition='slide'  class='ui-btn ui-btn-c ui-btn-icon-right ui-icon-carat-r'>" + items[i].title + "</a></li>")); 
        ul.append(li);
  }
}

function fetchBikesFailure(result){
	alert("Failure" +JSON.stringify(result));
}


function SignUp(){
	var invocationData = {
			adapter: "InstaBikeAdapter",
			procedure: "procedure3",
			parameters: [document.getElementById('textinput7').value,document.getElementById('textinput9').value]
	};
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess: SignUpSuccess, 
		onFailure: SignUpFailure
	});
}

function SignUpSuccess(result){
	$.mobile.changePage("#LogIn");
	
}

function SignUpFailure(result){
	alert("Failure");
}

function fetchContact(){
	var invocationData = {
			adapter: "InstaBikeAdapter",
			procedure: "procedure4",
			parameters: []
	};
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess: fetchContactSuccess, 
		onFailure: fetchContactFailure
	});
}

function fetchContactSuccess(result){

	bikeInfo.contactResult = result.invocationResult.resultSet;
	
}

function fetchContactFailure(result){
	/*alert("Failure" + JSON.stringify(result));*/
}

function fetchLenderBikes(param){
	var invocationData = {
			adapter: "InstaBikeAdapter",
			procedure: "procedure5",
			parameters: [param]
	};
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess: fetchLenderBikesSuccess, 
		onFailure: fetchLenderBikesFailure
	});
}

function fetchLenderBikesSuccess(result){

	var items = result.invocationResult.resultSet;
	bikeInfo.result = items;
	console.log("dddd" + "bikeInfo.result" + JSON.stringify(bikeInfo.result));
	var ul = $('#LenderbikeList');
	  for (var i = 0; i < items.length; i++) {
		  var li=$("<ul></ul>");
		  li.append($("<li data-theme='c'><a class='ui-btn ui-btn-c ui-btn-icon-right ui-icon-delete' style='background-color:lightcyan;' id='" +items[i].bikeid +"'>" + items[i].title + "</a></li><div data-dialog='true' id='dialog-confirm'></div>")); 
        ul.append(li);
  }
	console.log("aaa" + "bikeInfo.result" + JSON.stringify(bikeInfo.result));
}

function fetchLenderBikesFailure(result){
	/*alert("Failure" + JSON.stringify(result));*/
}

$(document).on('vclick', '#bikeList li a', function(){  
	console.log("ccc" + "bikeInfo.result" + JSON.stringify(bikeInfo.result));
    bikeInfo.id = $(this).attr('id');
    bikeInfo.contactId = $(this).attr('data-ownerId');
    $.mobile.changePage( "#BikeDetails", { transition: "slide", changeHash: false });
});


$(document).on('pagebeforeshow', '#BikeDetails', function(){ 
	console.log("bbbb" + "bikeInfo.result" + JSON.stringify(bikeInfo.result));
    $('#bikeInfoDetails').empty();
    for(var i=0; i<bikeInfo.result.length; i++){
    	if(bikeInfo.id == bikeInfo.result[i].bikeid){
            $('#bikeInfoDetails').append('<li style="background-color:transparent !important;">Title: ' + bikeInfo.result[i].title +'</li>');
            $('#bikeInfoDetails').append('<li style="background-color:transparent !important;">Description: '+ bikeInfo.result[i].descp +' </li>');
            $('#bikeInfoDetails').append('<li style="background-color:transparent !important;">Availability Date: '+ bikeInfo.result[i].availableDate +'</li>');
            $('#bikeInfoDetails').append('<li style="background-color:transparent !important;">Price :$'+ bikeInfo.result[i].price +'</li>');   
            for(var j=0; j<bikeInfo.contactResult.length; j++){
            	if(bikeInfo.contactResult[j].userid==bikeInfo.contactId){
            		$('#bikeInfoDetails').append('<li style="background-color:transparent !important;">Contact Name :'+ bikeInfo.contactResult[j].name +'</li>'); 
                    $('#bikeInfoDetails').append('<li style="background-color:transparent !important;">Contact Phone :'+ bikeInfo.contactResult[j].phone +'</li>');
            	}
            }
            $('#bikeInfoDetails').listview('refresh');   
    	}
        }
});


/*$(document).on('vclick', '#LenderbikeList li a', function(){
	 $("#dialog-confirm").html("Delete Bike from listings");

	    // Define the Dialog and its properties.
	    $("#dialog-confirm").simpledialog({
	        resizable: false,
	        modal: true,
	        title: "Modal",
	        buttons: {
	            "Yes": function () {
	                $(this).dialog('close');
	                callback(true);
	            },
	                "No": function () {
	                $(this).dialog('close');
	                callback(false);
	            }
	        }
	    });
	  
	  $("#dialog-confirm").simpledialog({
		  'mode' : 'string',
		  'prompt' : 'What do you say?',
		  'buttons' : {
		  'OK': function () {
	                $(this).dialog('close');
	                callback(true);
	            },
		  'Cancel': function () {
              $(this).dialog('close');
              callback(false);
          }
		  }
	    });
	  
	
	  
});*/

$(document).on('vclick', '#LenderbikeList li a', function(){
	var bikeId= $(this).attr('id');
	WL.SimpleDialog.show("confirm", "Delete Bike from listings",
	[{text:"ok", handler: deleteBikeInfo(bikeId)},
	{text:"cancel",handler:function(){ $(this).SimpleDialog('close'); }}]);
	});

var bikeInfo = {
    id : null,
    result : null,
    contactResult : null,
    contactId : null
}

var userId = null;

function submitAddBike(){
	var title = $("#titleText").val();
	var bikeType = $("#abc :radio:checked").val();
	var description=$("#textarea2").val();
	var availabileDate=$("#dateinput4").val(); //check for dateformat conversion else use substring
	var accessories=  $('input[name="accessories"]:checked'); // Add a new column in table 
	var invocationData = {
			adapter: "InstaBikeAdapter",
			procedure: "addNewBike",
			parameters: [bikeType,"zoya89",100,description,availabileDate,title]
	};
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess: submitAddBikeSuccess, 
		onFailure: submitAddBikeFailure
	});
	
};


function submitAddBikeSuccess(result){

	if(result.invocationResult.updateStatementResult.updateCount){
		WL.SimpleDialog.show("Success", "successfully updated!",
				[{text:"ok", handler: function() {
					
			// Make sure of the bikeId variable and fire the query to db resp to delete the row	
					
            }}]);
		
	}else{
		WL.SimpleDialog.show("Failed", "unable to Update",
				[{text:"ok", handler: function() {
					
			// Make sure of the bikeId variable and fire the query to db resp to delete the row	
					
            }}]);
		
	}
		
}

function submitAddBikeFailure(result){
	alert("Failure" + JSON.stringify(result));
		
}

function deleteBikeInfo(param){
	var invocationData = {
			adapter: "InstaBikeAdapter",
			procedure: "deleteBike",
			parameters: [param]
	};
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess: deleteBikeInfoSuccess, 
		onFailure: deleteBikeInfoFailure
	});
}

function deleteBikeInfoSuccess(result){
	location.reload();
}

function deleteBikeInfoFailure(result){
	alert("Failure" + JSON.stringify(result));
}