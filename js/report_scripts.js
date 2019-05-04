
var GenerateDataAPICalled = false ;
var DownloadDataAPICalled = false;
function GenerateData(id){
	if (id!="booking") {
	    document.getElementsByClassName("main")[0].classList.add("disable_screen");    
	    executeAPI("GenerateData()?".concat(id));
	}else{
	    var start_date = document.getElementById("start_date").value;
	    var end_date = document.getElementById("end_date").value;
	    console.log(start_date,end_date);
    	if (start_date.length <= 0 || end_date.length <= 0) {
	    	alert("Start and End cannot be empty!!");
		}else{
			document.getElementsByClassName("main")[0].classList.add("disable_screen");    
	    	executeAPI("GenerateBookingData()?".concat(start_date).concat(",").concat(end_date));
	    }
	}
    GenerateDataAPICalled = true;
}
function DownloadData(id){
    var identifier = id.split("_")[1];
    console.log(identifier);
    var request = new XMLHttpRequest();
    request.addEventListener('readystatechange', function(e) {
    	if(request.readyState == 4) {
    		_OBJECT_URL = URL.createObjectURL(request.response);

    		if (identifier=="guest") {
	    		document.querySelector('#download_guest_data').setAttribute('href', _OBJECT_URL);
	    		document.querySelector('#download_guest_data').setAttribute('download', 'guest.txt');
	    		// document.querySelector('#download_guest_data').style.display = 'block';    			
    		}else if (identifier=="storyteller") {
    			document.querySelector('#download_storyteller_data').setAttribute('href', _OBJECT_URL);
	    		document.querySelector('#download_storyteller_data').setAttribute('download', 'storyteller.txt');
	    		// document.querySelector('#download_storyteller_data').style.display = 'block';    			
    		}else if (identifier=="inventory") {
	    		document.querySelector('#download_inventory_data').setAttribute('href', _OBJECT_URL);
	    		document.querySelector('#download_inventory_data').setAttribute('download', 'inventory.txt');
	    		// document.querySelector('#download_inventory_data').style.display = 'block';    			
    		}else if (identifier=="booking") {
    			document.querySelector('#download_booking_data').setAttribute('href', _OBJECT_URL);
	    		document.querySelector('#download_booking_data').setAttribute('download', 'booking.txt');
	    		// document.querySelector('#download_booking_data').style.display = 'block';    			
    		}

    	
    		setTimeout(function() {
    			window.URL.revokeObjectURL(_OBJECT_URL);

    			// document.querySelector("#".concat(id)).style.display = 'block';
    			if (identifier=="guest") {
		    		document.querySelector('#download_guest_data').style.display = 'none';
	    		}else if (identifier=="storyteller") {
	    			document.querySelector('#download_storyteller_data').style.display = 'none';
	    		}else if (identifier=="inventory") {
		    		document.querySelector('#download_inventory_data').style.display = 'none';
	    		}else if (identifier=="booking") {
	    			document.querySelector('#download_booking_data').style.display = 'none';
	    		}

    		}, 20*1000);
    	}
    });
    
    request.responseType = 'blob';
    request.open('get', 'guest.txt'); 
    request.send();
}
function executeAPI(query){
    console.log("API Called from View Bookings : ",query);
    var response;
    var xhr = new XMLHttpRequest();
    var url = SERVER_IP_ADDRESS;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            response = xhr.responseText;
        	if (GenerateDataAPICalled) {
        		if (response=="Guest File Created!!") {
        			document.getElementById("download_guest_data").style.visibility = "visible";
	        		DownloadData("download_guest_data");
        		}else if (response=="Storyteller File Created!!") {
        			document.getElementById("download_storyteller_data").style.visibility = "visible";
	        		DownloadData("download_storyteller_data");
        		}else if (response=="Inventory File Created!!") {
        			document.getElementById("download_inventory_data").style.visibility = "visible";
	        		DownloadData("download_inventory_data");
        		}else if (response=="Booking File Created!!") {
        			document.getElementById("download_booking_data").style.visibility = "visible";
	        		DownloadData("download_booking_data");
        		}else{
        			console.log("GenerateData response : ",response);
        		}
        	}else if(DownloadDataAPICalled){
        		console.log("response : ",response);
        	}
            document.getElementsByClassName("main")[0].classList.remove("disable_screen");    
        }
    };
    xhr.send(query);
}	
window.onload = function(){
	updateMainUI();	
};
