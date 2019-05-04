var selectedItemId = null;
var getSettingsDataAPICalled = false;
var addAssetAPICalled = false, editAssetAPICalled = false, deleteAssetAPICalled = false;
var fullData ;
function logoutUser(){
	localStorage.clear();
	window.location.replace("index.html");
}
function ItemClicked(modify_idx,list){
	if (modify_idx==0) {
		console.log("Adding Item type : ",list);
		if (confirm("Are you sure?")) {
			addAssetAPICalled = true;
			var name = null; 
			name = prompt("Enter name!!");
			if(name!=null && name.length>1){
				//Add the new item in list of type ='list'
				if (list=="tourname") {
					executeAPI("addtourname()?".concat(name));
					selectedItemId = null;
				}else if (list=="tourtype") {
					executeAPI("addtourtype()?".concat(name));
					selectedItemId = null;
				}else if (list=="timeslot") {
					var time = null;
					time = prompt("Enter the Start Time in 24hr format only!!");
					if (time!=null) {
						executeAPI("addslot()?".concat(name).concat(",").concat(time));
						selectedItemId = null;
					}
				}else if (list=="city") {
					executeAPI("addcity()?".concat(name));
					selectedItemId = null;
				}else if (list=="paytype") {
					executeAPI("addpaytype()?".concat(name));
					selectedItemId = null;
				}else if (list=="channel") {
					executeAPI("addchannel()?".concat(name));
					selectedItemId = null;
				}
			}
		}	
	}else if(modify_idx==1){
		//list not needed
		console.log("Editing Item id : ",selectedItemId);
		if (confirm("Do you want to edit ".concat(selectedItemId.split("-")[0]).concat(" id : ").concat(selectedItemId.split("-")[1]).concat("?"))) {
			editAssetAPICalled = true;
			var id = selectedItemId.split("-")[1];
			var name = null; 
			var default_name = document.getElementById(selectedItemId).innerHTML;
			var default_time = "";
			if (list=="timeslot") {
				default_name = default_name.split("-")[0];
				default_time = default_name.split("-")[1];
			}
			name = prompt("Enter name!!",default_name);
			if(name!=null && name.length>1){
				//Add the new item in list of type ='list'
				if (list=="tourname") {
					executeAPI("edittourname()?".concat(id).concat(",").concat(name));
					selectedItemId = null;
				}else if (list=="tourtype") {
					executeAPI("edittourtype()?".concat(id).concat(",").concat(name));
					selectedItemId = null;
				}else if (list=="timeslot") {
					var time = null;
					time = prompt("Enter the Start Time in 24hr format only!!",default_time);
					if (time!=null) {
						executeAPI("editslot()?".concat(id).concat(",").concat(name).concat(",").concat(time));
						selectedItemId = null;
					}
				}else if (list=="city") {
					executeAPI("editcity()?".concat(id).concat(",").concat(name));
					selectedItemId = null;
				}else if (list=="paytype") {
					executeAPI("editpaytype()?".concat(id).concat(",").concat(name));
					selectedItemId = null;
				}else if (list=="channel") {
					executeAPI("editchannel()?".concat(id).concat(",").concat(name));
					selectedItemId = null;
				}
			}
		}	
	}else if(modify_idx==2){
		//list not needed
		console.log("Deleting Item id : ",selectedItemId);	
		if (confirm("Do you want to delete ".concat(selectedItemId.split("-")[0]).concat(" id : ").concat(selectedItemId.split("-")[1]).concat("?"))) {
			deleteAssetAPICalled = true;
			if (list=="tourname") {
				executeAPI("deletetourname()?".concat(selectedItemId.split("-")[1]));
				selectedItemId = null;
			}else if (list=="tourtype") {
				executeAPI("deletetourtype()?".concat(selectedItemId.split("-")[1]));
				selectedItemId = null;
			}else if (list=="timeslot") {
				executeAPI("deleteslot()?".concat(selectedItemId.split("-")[1]));
				selectedItemId = null;
			}else if (list=="city") {
				executeAPI("deletecity()?".concat(selectedItemId.split("-")[1]));
				selectedItemId = null;
			}else if (list=="paytype") {
				executeAPI("deletepaytype()?".concat(selectedItemId.split("-")[1]));
				selectedItemId = null;
			}else if (list=="channel") {
				executeAPI("deletechannel()?".concat(selectedItemId.split("-")[1]));
				selectedItemId = null;
			}	
		}	
	}
}

function listItemClicked(id){
	if (selectedItemId) {
		document.getElementById(selectedItemId).style.backgroundColor = "#e1e1e1";
		document.getElementById( selectedItemId.split("-")[0].concat("_button_box")).style.visibility = "hidden";
		document.getElementById(selectedItemId).style.color = "black";
	}
	document.getElementById(id).style.backgroundColor = "#696969";
	document.getElementById(id).style.color = "white";
	document.getElementById( id.split("-")[0].concat("_button_box")).style.visibility = "visible";
	console.log("Clicked Item id : ",id);
	selectedItemId = id;
}
function setDropdowns(response){
	console.log("Response : ",response);
    var extraHTML;	
	var data = response.split("|");
	for (var i = 0; i < data.length-1; i++) {
		var list = "";
		switch(i){
			case 0:
				list = "tourname";
				break;
			case 1: 
				list = "tourtype";
				break;
			case 2:
				list = "city";
				break;
			case 3:
				list = "channel";
				break;
			case 4:
				list = "paytype";
				break;
			default:
				break;	
		}
		extraHTML = "";
		if (data[i]!="[]") {
			data[i] = data[i].substring(0,data[i].length-1);
			var rows = data[i].split(":")[1].split(";");
			for (var j = 0; j < rows.length; j++) {
				var value = rows[j].split(",");
				// console.log("value for list",i," row ",j,": ",value);
				
				var id = parseInt(value[0].match(/\d+/g).map(Number));
				var name = value[1].substring(0,value[1].length-1);
				extraHTML += "<li onclick =\"listItemClicked(this.id)\" id = \"".concat(list).concat("-").concat(id).concat("\">").concat(name).concat("</li>")
			}	
		}
		switch(i){
			case 0:
				document.getElementById("tourname_list").innerHTML=extraHTML;
				break;
			case 1: 
				document.getElementById("tourtype_list").innerHTML=extraHTML;
				break;
			case 2:
				document.getElementById("city_list").innerHTML=extraHTML;
				break;
			case 3:
				document.getElementById("channel_list").innerHTML=extraHTML;
				break;
			case 4:
				document.getElementById("paytype_list").innerHTML=extraHTML;
				break;
			default:
				break;	
		}	
	}
	// For slots, split(":") gives wrong results as time contains ':'
	extraHTML = "";
	var rows = data[5].substring(12,data[5].length-1).split(";");
	for (var j = 0; j < rows.length; j++) {
		var value = rows[j].split(",");
		// console.log("value for list 5 row ",j,": ",value);		
		var id = parseInt(value[0].match(/\d+/g).map(Number));
		var name = value[1];
		var time = value[2].substring(0,value[2].length-1);
		extraHTML += "<li onclick =\"listItemClicked(this.id)\" id = \"timeslot-".concat(id).concat("\">").concat(name).concat(" - ").concat(time).concat("</li>")
	}

	document.getElementById("timeslot_list").innerHTML=extraHTML;			
	// console.log("list 5: ",data[5]);
}
function executeAPI(query){
    console.log("API Called from Add New Bookings : ",query);
    var response;
    var xhr = new XMLHttpRequest();
    var url = SERVER_IP_ADDRESS;
    //var url = "http://localhost";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            response = xhr.responseText;
            if (getSettingsDataAPICalled) {
			    setDropdowns(response);
			    if (fullData==null) {
			    	fullData = response;
			    }
	        	getSettingsDataAPICalled = false;
            }else if (addAssetAPICalled || editAssetAPICalled || deleteAssetAPICalled){
            	if (response=="API executed successfully") {
	            	executeAPI("getSettingsData()");
	            	getSettingsDataAPICalled = true;
            	}else{
	            	setDropdowns(fullData);
			    	alert(response);
            	}
            	addAssetAPICalled = false;
            	editAssetAPICalled = false;
            	deleteAssetAPICalled = false;           	
            }else{
           		console.log("Response : ",response);
    		}
        }
    };
    xhr.send(query);
}
window.onload = function(){
	updateMainUI();
	var query = "getSettingsData()";
	getSettingsDataAPICalled = true;
	executeAPI(query);
};