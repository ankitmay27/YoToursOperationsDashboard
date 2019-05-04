var STORED_BOOKING_ID;
var storytellerList = [];
var MAX_NO_OF_PEOPLE = 15;
var getABKData1APICalled = false,allocateBookingAPICalled=false;
var selectedStorytellerRowID,seletedStorytellerName;

function Storyteller(id,name){
	this.id = id;
	this.name = name;
	this.avaliability = false;
	this.capacity = MAX_NO_OF_PEOPLE;

	this.updateAvaliability = function(value){
		this.avaliability = value;
	}
	this.reduceCapacity = function(value){
		this.capacity = this.capacity - value;
	}
}
function storyTellerClicked(row){
	if(selectedStorytellerRowID){
		document.getElementById(selectedStorytellerRowID).style.backgroundColor = null;
		document.getElementById(selectedStorytellerRowID).style.color = null;		
	}
	
	selectedStorytellerRowID = row.id;
	selectedStorytellerName = row.children[0].innerHTML;
	document.getElementById(selectedStorytellerRowID).style.backgroundColor = "#383838";
	document.getElementById(selectedStorytellerRowID).style.color = "white";		
}
function onAllocateButtonClicked(){
	if (!selectedStorytellerRowID) {
		alert("Select Storyteller first!!");
	}else{
		if (confirm("Do you want to allocate ".concat(selectedStorytellerName).concat(" to booking?"))) {
			var reason = localStorage.getItem("REALLOCATE_REASON");
			if (reason) {
				executeAPI("allocateBooking()?".concat(STORED_BOOKING_ID).concat(",").concat(selectedStorytellerRowID.split("_")[1]).concat(",").concat(reason));
            	localStorage.removeItem("REALLOCATE_REASON")
			}else{
				executeAPI("allocateBooking()?".concat(STORED_BOOKING_ID).concat(",").concat(selectedStorytellerRowID.split("_")[1]));
			}	
			document.getElementsByClassName("main")[0].classList.add("disable_screen"); 
			allocateBookingAPICalled = true
		}
	}
}
function updateAllocationTable(list){
	document.getElementById("allocate_booking_table").innerHTML = "<tr class=\"table_header\"><th style=\"text-align: left;\"> Name </th><th style=\"text-align: center;\"> Avaliability</th><th style=\"text-align: right;\"> No. Of People</th></tr>"; 
	//Sorting on avaliability.
	var temp = [];
	for (var i = 0; i < list.length; i++) {
		if (list[i].avaliability==true) {
			temp.push(list[i]);
		}
	}

	for (var i = 0; i < list.length; i++) {
		if (list[i].avaliability==false) {
			temp.push(list[i]);
		}
	}
	list = temp;

	for (var i = 0; i < list.length; i++) {
		var extraHTML = "<tr class=\"table_row\" onclick=\"storyTellerClicked(this)\" id=\"row_";
		extraHTML = extraHTML.concat(list[i].id);
		extraHTML = extraHTML.concat("\"><td style=\"text-align: left;\">")
		extraHTML = extraHTML.concat(list[i].name);
		extraHTML = extraHTML.concat("</td><td><img src=\"image/");
		if(list[i].avaliability){
			extraHTML = extraHTML.concat("green_square.png\">");
		}else{
			extraHTML = extraHTML.concat("red_square.png\">");	
		}
		extraHTML = extraHTML.concat("</td><td style=\"text-align: right;\">");
		extraHTML = extraHTML.concat(list[i].capacity);
		extraHTML = extraHTML.concat("</td></tr>");
		
		document.getElementById("allocate_booking_table").innerHTML += extraHTML; 
	}
}
function parseStorytellers(response){
	var resSplit = response.split(":")[1];
	resSplit = resSplit.substring(0,resSplit.length-1);
	var list = resSplit.split(";");
	for (var i = 0; i < list.length; i++) {
	 	var data = list[i];
	 	data = data.substring(1,data.length-1);
	 	var dataSplit = data.split(",");
	 	storytellerList.push(new Storyteller(dataSplit[0],dataSplit[1]));
	} 
	console.log("|----------> Storyteller List  : ",storytellerList);
}
function parseAvaliabilityData(response){
	var data = response.split(":")[1];
	data = data.substring(1,data.length-2);
	var avaliable_sts = data.split("/");
	for (var i = 0; i < avaliable_sts.length; i++) {
		for (var j = 0; j < storytellerList.length; j++) {
			if (avaliable_sts[i]==storytellerList[j].id) {
				storytellerList[j].updateAvaliability(true);
				break;
			}
		}
	}
	console.log("|----------> Storyteller List  : ",storytellerList);
}
function parseCapacityData(response){
	var resSplit = response.split(":")[1];
	resSplit = resSplit.substring(0,resSplit.length-1);
	var list = resSplit.split(";");
	for (var i = 0; i < list.length; i++) {
	 	var data = list[i];
	 	data = data.substring(1,data.length-1);
	 	var dataSplit = data.split(",");
		var id = parseInt(dataSplit[0]);	
		var value = parseInt(dataSplit[1]);
		for (var j = 0; j < storytellerList.length; j++) {
			if (id==storytellerList[j].id) {
				storytellerList[j].reduceCapacity(value);
				break;
			}
		}
	}
	console.log("|----------> Storyteller List  : ",storytellerList);
}
function executeAPI(query){
    console.log("API Called from Add New Bookings : ",query);
    var response;
    var xhr = new XMLHttpRequest();
    var url = SERVER_IP_ADDRESS;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            response = xhr.responseText;
            console.log("Response : ",response);
            if (getABKData1APICalled) {
                var storytellers = response.split("|")[0];
                var avaliability = response.split("|")[1];
                var capacity = response.split("|")[2];
                if (storytellers!="[]") {
                	parseStorytellers(storytellers);    
                	if (avaliability!="[]") {
                	    parseAvaliabilityData(avaliability);
			            if (capacity!="[]") {
			                parseCapacityData(capacity);
                		}
                	}else{
                		alert("No storytellers availiable!!");
                	}
                }else{
                	alert("No Eligible storyteller found!!!");
                }
                
                updateAllocationTable(storytellerList);
                getABKData1APICalled = false;
            }else if(allocateBookingAPICalled){
            	if(response=="API executed successfully"){
	            	alert("Allocated !!");
			        history.go(-1);
            	}else{
            		alert(response);
            	}
            	allocateBookingAPICalled = false;				
            }


            document.getElementsByClassName("main")[0].classList.remove("disable_screen"); 
        }
    };
    xhr.send(query);
}
window.onload = function(){
	updateMainUI();
	STORED_BOOKING_ID = localStorage.getItem("STORED_BOOKING_ID");
	if (!STORED_BOOKING_ID) {
		STORED_BOOKING_ID = "new"
	}
	console.log("Retrieved BK id : ",STORED_BOOKING_ID);
	
	localStorage.removeItem("STORED_BOOKING_ID");
	
    getABKData1APICalled = true;
    executeAPI("getABKData1()?".concat(STORED_BOOKING_ID));
};


