var cities = [];
var types = [];
var names = [];
var slots = [];
var viewInventoryAPICalled = false;
var gettingInventoryData = false;
var invList = [];
var currentList = [];
var selectedInventoryID;
var SAVED_INVENTORY_ID;
var getEditInventoryDataAPICalled = false;
var savingInventory = false,editingInventory = false,deleteinventory=false;
var designation = localStorage.getItem("OE_designation");

function Inventory(id,name_id,city_id,type_id,slot_id){
	this.id = id;
	this.name_id = name_id;
	this.city_id = city_id;
	this.type_id = type_id;
	this.slot_id = slot_id;
}
function City(id,name){
	this.id = id ;
	this.name = name;
}
function TourName(id,name){
	this.id = id ;
	this.name = name;
}
function TourType(id,name){
	this.id = id;
	this.name = name;
}
function TimeSlot(id,name,time){
	this.id = id ;
	this.name = name;
	this.time = time;
}
function viewInventoryClicked(){
    viewInventoryAPICalled = true;
	selectedInventoryID = null;
	SAVED_INVENTORY_ID = null;
	document.getElementById("button_box").style.visibility = "hidden";
	document.getElementById("save_button").style.visibility = "hidden";
	document.getElementById("edit_button").style.visibility = "hidden";
	document.getElementById("edit_inventory_button").style.visibility = "hidden";
	document.getElementById("delete_button").style.visibility = "hidden";
	
	document.getElementsByClassName("main")[0].classList.add("disable_screen");
	executeAPI("getViewInventoryData()");
	document.getElementById("inventory_details_table").style.marginLeft ="0px";
}
function createInventoryClicked(){
	selectedInventoryID = null;
	SAVED_INVENTORY_ID = null;
	
	document.getElementById("button_box").style.visibility = "hidden";
	document.getElementById("save_button").style.visibility = "hidden";
	document.getElementById("edit_button").style.visibility = "hidden";
	document.getElementById("edit_inventory_button").style.visibility = "hidden";
	document.getElementById("delete_button").style.visibility = "hidden";
	if (cities.length>0 && types.length>0 && names.length>0 && slots.length>0 ) {
		document.getElementById("inventory_details_table").innerHTML="<tr><th>ADD CITY</th><td style=\"text-align: left;\"><select onchange=\"listItemChanged()\" id=\"city_list\"></select></td></tr><tr><th>ADD TOUR TYPE</th><td style=\"text-align: left;\"><select onchange=\"listItemChanged()\" id=\"tourtype_list\"></select></td></tr><tr><th>ADD TOUR NAME</th><td style=\"text-align: left;\"><select onchange=\"listItemChanged()\" id=\"tourname_list\"></select></td></tr><tr><th>ADD TIME SLOT</th><td style=\"text-align: left;\"><select onchange=\"listItemChanged()\" id=\"timeslot_list\"></select></td></tr>";
		setInventoryDropdowns(cities,types,names,slots);
	}else{
		alert("First include some asset items in settings!!");
	}
}
function saveInventoryClicked(){
	var city_id = parseInt(document.getElementById("city_list").value);
	var tourname_id = parseInt(document.getElementById("tourname_list").value);
	var tourtype_id = parseInt(document.getElementById("tourtype_list").value);
	var timeslot_id = parseInt(document.getElementById("timeslot_list").value);
	var query = "addinventory()?".concat(tourname_id).concat(",").concat(city_id).concat(",").concat(tourtype_id).concat(",").concat(timeslot_id);
	executeAPI(query);
	savingInventory = true;
}

function getAssetNameFromId(list,id){
	for (var i = 0; i < list.length; i++) {
		if(list[i].id==id){
			return list[i].name;
		}	
	}
	return null;
}
function getTimeFromSlotId(list,id){
	for (var i = 0; i < list.length; i++) {
		if(list[i].id==id){
			return list[i].time;
			break;
		}	
	}
	return null;
}

function listItemChanged(){
	if (document.getElementById("city_list").value>0 && document.getElementById("tourtype_list").value>0 && document.getElementById("tourname_list").value>0 && document.getElementById("timeslot_list").value>0 ) {
		document.getElementById("button_box").style.visibility = "visible"
		document.getElementById("edit_button").style.visibility = "hidden";
		document.getElementById("delete_button").style.visibility = "hidden";			
		if (SAVED_INVENTORY_ID==null) {
			document.getElementById("save_button").style.visibility = "visible";
			document.getElementById("edit_inventory_button").style.visibility = "hidden";
		}else{
			document.getElementById("save_button").style.visibility = "hidden";
			document.getElementById("edit_inventory_button").style.visibility = "visible";
		}
	}
}
function setInventoryDropdowns(cities,types,names,slots){
	// console.log("Response : ",response);
    var extraHTML;	
	var data = [names,types,cities,slots];
	for (var i = 0; i<3; i++) {
		switch(i){
			case 0:
				data[i] = names;
				extraHTML = "<option value=\"0\" selected disabled>SELECT TOUR NAME</option>";
				break;
			case 1: 
				extraHTML = "<option value=\"0\" selected disabled>SELECT TOUR TYPE</option>";
				break;
			case 2:
				extraHTML = "<option value=\"0\" selected disabled>SELECT CITY</option>";
				break;
			default:
				break;	
		}
		// console.log("|-->Test : data[i] : ",data[i]);
		for (var j = 0; j < data[i].length; j++) {
			var id = data[i][j].id;
			var name = data[i][j].name;
			extraHTML += "<option value = \"".concat(id).concat("\">").concat(name).concat("</option>")
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
			default:
				break;	
		}
	}
	// // For slots, split(":") gives wrong results as time contains ':'
	extraHTML = "<option value=\"0\" selected disabled>SELECT TIME SLOT</option>";
	
	for (var j = 0; j < data[3].length; j++) {
		var id = data[3][j].id;
		var name = data[3][j].name;
		var time = data[3][j].time;
		extraHTML += "<option value = \"".concat(id).concat("\">").concat(name).concat("-").concat(time).concat("</option>");
	}
	console.log("|-->Test : data[i] : ",data[3]);
	document.getElementById("timeslot_list").innerHTML=extraHTML;			
}
function editInventory(){
	var city_id = parseInt(document.getElementById("city_list").value);
	var tourname_id = parseInt(document.getElementById("tourname_list").value);
	var tourtype_id = parseInt(document.getElementById("tourtype_list").value);
	var timeslot_id = parseInt(document.getElementById("timeslot_list").value);
	var query = "editinventory()?".concat(SAVED_INVENTORY_ID).concat(",").concat(tourname_id).concat(",").concat(city_id).concat(",").concat(tourtype_id).concat(",").concat(timeslot_id);
	executeAPI(query);
	editingInventory = true;
}
function editInventoryClicked(){
	if (confirm("Are you sure you want to edit the inventory item ?")) {
		executeAPI("getEditInventoryData()?".concat(selectedInventoryID));
		getEditInventoryDataAPICalled = true;
		createInventoryClicked();
		
	}
}
function deleteInventoryClicked(){
	if (confirm("Are you sure you want to delete the inventory item ?")) {
		executeAPI("deleteinventory()?".concat(selectedInventoryID));
		deletingInventory = true;
	}
}
function VIRowClicked(id){
	if (designation=="Super User") {
		console.log("Last clicked Inventory id : ",selectedInventoryID)
		if (selectedInventoryID!=null){
			document.getElementById("inventory_".concat(selectedInventoryID)).style.backgroundColor = "#e1e1e1";
			document.getElementById("inventory_".concat(selectedInventoryID)).style.color = "#000000";
		}
		selectedInventoryID = id.split("_")[1];	
		document.getElementById(id).style.backgroundColor = "#696969";
		document.getElementById(id).style.color = "#ffffff";
		document.getElementById("button_box").style.visibility = "visible"
		document.getElementById("save_button").style.visibility = "hidden";
		document.getElementById("edit_inventory_button").style.visibility = "hidden";
		document.getElementById("edit_button").style.visibility = "visible";
		document.getElementById("delete_button").style.visibility = "visible";			
		console.log("Clicked Inventory id : ",selectedInventoryID)
    }
}
function cityFilterChanged(){
	var value = document.getElementById("city_filter").value.toLowerCase();
	console.log("Tourname filter Changed !! ---> ",value,invList);
	var tempList = [];
	for (var i = 0; i < invList.length; i++) {
		var city = getAssetNameFromId(cities,invList[i].city_id).toLowerCase();
		if(city.includes(value)){
			console.log("City filter Changed !! ---> ",value,city);
			tempList.push(invList[i]);
		}
	}
	setViewInventoryTable(tempList);
	currentList = tempList;
	invList = currentList;
	document.getElementById("city_filter").value = value;
}
function tournameFilterChanged(){
	var value = document.getElementById("tourname_filter").value.toLowerCase();
	console.log("Tourname filter Changed !! ---> ",value,invList);
	var tempList = [];
	for (var i = 0; i < invList.length; i++) {
		var name = getAssetNameFromId(names,invList[i].name_id).toLowerCase();
		if(name.includes(value)){
			console.log("Tourname filter Changed !! ---> ",value,name);
			tempList.push(invList[i]);
		}
	}
	setViewInventoryTable(tempList);
	currentList = tempList;
	invList = currentList;
	document.getElementById("tourname_filter").value = value;
}
function tourtypeFilterChanged(){
	var value = document.getElementById("tourtype_filter").value.toLowerCase();
	console.log("Tourtype filter Changed !! ---> ",value,invList);
	var tempList = [];
	for (var i = 0; i < invList.length; i++) {
		var type = getAssetNameFromId(types,invList[i].type_id).toLowerCase();
		if(type.includes(value)){
			console.log("Tourtype filter Changed !! ---> ",value,type);
			tempList.push(invList[i]);
		}
	}
	setViewInventoryTable(tempList);
	currentList = tempList;
	invList = currentList;
	document.getElementById("tourtype_filter").value = value;
}
function timeslotFilterChanged(){
	var value = document.getElementById("timeslot_filter").value.toLowerCase();
	console.log("Timeslot filter Changed !! ---> ",value,invList);
	var tempList = [];
	for (var i = 0; i < invList.length; i++) {
		var slot = getAssetNameFromId(slots,invList[i].slot_id).toLowerCase();
		if(slot.includes(value)){
			console.log("Timeslot filter Changed !! ---> ",value,slot);
			tempList.push(invList[i]);
		}
	}
	setViewInventoryTable(tempList);
	currentList = tempList;
	invList = currentList;
	document.getElementById("timeslot_filter").value = value;
}
function sortChanged(id,src){
	console.log("Sorting Changed !",id,names,types,cities,slots);
	var tempList = currentList;
	var source = src.toString();
	if(source.includes("white_down_arrow")){
		for (var i = 0; i < tempList.length-1; i++) {
			var cur,next;
			for (var j = 0; j < tempList.length-1-i; j++) {
				if(id.includes("type")){
					cur = getAssetNameFromId(types,tempList[j].type_id);
					next = getAssetNameFromId(types,tempList[j+1].type_id);
				}else if(id.includes("city")){
					cur = getAssetNameFromId(cities,tempList[j].city_id);
					next = getAssetNameFromId(cities,tempList[j+1].city_id);
				}else if(id.includes("name")){
					cur = getAssetNameFromId(names,tempList[j].name_id);
					next = getAssetNameFromId(names,tempList[j+1].name_id);
				}else if(id.includes("slot")){
					cur = getTimeFromSlotId(slots,tempList[j].slot_id);
					next = getTimeFromSlotId(slots,tempList[j+1].slot_id);
				}
				if( cur!=null && next!=null && cur.localeCompare(next) > 0 ){
					var xxx = tempList[j+1];
					tempList[j+1] = tempList[j];
					tempList[j] = xxx;
				}
			}
		}
		setViewInventoryTable(tempList);
		document.getElementById(id).src = "image/white_up_arrow.png";
	}else if(source.includes("white_up_arrow")){
		for (var i = 0; i < tempList.length-1; i++) {
			var cur,next;
			for (var j = 0; j < tempList.length-1-i; j++) {
				if(id.includes("type")){
					cur = getAssetNameFromId(types,tempList[j].type_id);
					next = getAssetNameFromId(types,tempList[j+1].type_id);
				}else if(id.includes("city")){
					cur = getAssetNameFromId(cities,tempList[j].city_id);
					next = getAssetNameFromId(cities,tempList[j+1].city_id);
				}else if(id.includes("name")){
					cur = getAssetNameFromId(names,tempList[j].name_id);
					next = getAssetNameFromId(names,tempList[j+1].name_id);
				}else if(id.includes("slot")){
					cur = getTimeFromSlotId(slots,tempList[j].slot_id);
					next = getTimeFromSlotId(slots,tempList[j+1].slot_id);
				}
				if( cur!=null && next!=null && cur.localeCompare(next) < 0 ){
					var xxx = tempList[j+1];
					tempList[j+1] = tempList[j];
					tempList[j] = xxx;
				}
			}
		}
		setViewInventoryTable(tempList);
		document.getElementById(id).src = "image/white_down_arrow.png";
	}
	currentList = tempList;	
}

function setViewInventoryTable(list) {
	console.log("Inventory items : ",list);
	document.getElementById("inventory_details_table").innerHTML = "<tr><th>CITY</th><th>TOUR TYPE</th><th>TOUR NAME</th><th>TIME SLOT</th></tr><tr><th><input onchange=\"cityFilterChanged()\" id=\"city_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"city_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"tourtypeFilterChanged()\" id=\"tourtype_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"tourtype_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"tournameFilterChanged()\" id=\"tourname_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"tourname_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"timeslotFilterChanged()\" id=\"timeslot_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"timeslot_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th></tr>"
	for (var i = 0; i < list.length; i++) {
		var id = parseInt(list[i].id);
		var name = getAssetNameFromId(names,parseInt(list[i].name_id));
		var city = getAssetNameFromId(cities,parseInt(list[i].city_id));
		var type = getAssetNameFromId(types,parseInt(list[i].type_id));
		var slot = getAssetNameFromId(slots,parseInt(list[i].slot_id)).concat("-").concat(getTimeFromSlotId(slots,parseInt(list[i].slot_id)));
		var extraHTML = "<tr id=\"inventory_".concat(id).concat("\" onclick=\"VIRowClicked(this.id)\"><td>").concat(city).concat("</td><td>").concat(type).concat("</td><td>").concat(name).concat("</td><td>").concat(slot).concat("</td><tr>");	
		document.getElementById("inventory_details_table").innerHTML += extraHTML;
	}
}
function storeInventoryData(response){
	console.log("Response : ",response);
    var extraHTML;	
	var data = response.split("|");
	for (var i = 0; i < 3; i++) {
		if (data[i]!="[]") {
			data[i] = data[i].substring(0,data[i].length-1);
			var rows = data[i].split(":")[1].split(";");
			for (var j = 0; j < rows.length; j++) {
				var value = rows[j].split(",");
				// console.log("value for list",i," row ",j,": ",value);
				
				var id = parseInt(value[0].match(/\d+/g).map(Number));
				var name = value[1].substring(0,value[1].length-1);
				switch(i){
					case 0:
						names.push(new TourName(id,name));
						break;
					case 1:
						types.push(new TourType(id,name));
						break;
					case 2:
						cities.push(new City(id,name));
						break;
					default:
						break;				
				}
			}	
		}
	}
	if (data[3]!="[]") {
		data[3] = data[3].substring(12,data[3].length-1);
		// console.log("|------->Testing : ",data[3]);
		var rows = data[3].split(";");
		for (var j = 0; j < rows.length; j++) {
			var value = rows[j].split(",");
			var id = parseInt(value[0].match(/\d+/g).map(Number));
			var name = value[1];
			var time = value[2].substring(0,value[2].length-1);
			slots.push(new TimeSlot(id,name,time));
		}	
	}
	viewInventoryAPICalled=false;
	console.log("|------->Testing : ",cities,types,names,slots);
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
            if (gettingInventoryData) {
                storeInventoryData(response);
                gettingInventoryData = false;
	        }else if (viewInventoryAPICalled) {
	        	if (response != "[]") {
		        	response = response.split(":")[1];
	            	var tours = response.substring(0,response.length-1).split(";");
	            	invList = [];
	            	for (var i = 0; i < tours.length; i++) {
	            		tours[i] = tours[i].substring(1,tours[i].length-1);
	            		var invData = tours[i].split(",");
	            		invList.push(new Inventory(invData[0],invData[1],invData[2],invData[3],invData[4]));
	            	}
	            	currentList = invList;
					setViewInventoryTable(invList);
	        	}else{
	        		alert("First include some inventory items in CREATE INVENTORY !!");
				}
	            viewInventoryAPICalled = false;
            }else if (savingInventory) {
            	if (response=="API executed successfully") {
       				alert("Inventory item saved!");
    				// window.location.reload();
                }else{
            		alert(response);
            	}
            	savingInventory=false;
            }else if (getEditInventoryDataAPICalled){
           		if (response != "[]") {
	           		response = response.split(":")[1];
	           		response = response.substring(1,response.length-2);
	           		SAVED_INVENTORY_ID = response.split(",")[0];
	           		var name_id = response.split(",")[1];
	           		var city_id = response.split(",")[2];
	           		var type_id = response.split(",")[3];
	           		var slot_id = response.split(",")[4];
	           		document.getElementById("city_list").value = city_id;
	           		document.getElementById("tourtype_list").value = type_id;
	           		document.getElementById("tourname_list").value = name_id;
	           		document.getElementById("timeslot_list").value = slot_id;
           		}
            	getEditInventoryDataAPICalled = false;
            }else if (editingInventory) {
            	if (response=="API executed successfully") {
       				alert("Inventory item edited sucessfully!!");
            	    window.location.reload();	
       			}else{
            		alert(response);
            	}
            	editingInventory = false;
            }else if (deletingInventory) {
            	if (response=="API executed successfully") {
       				alert("Inventory item deleted sucessfully!!");
            	    window.location.reload();                
            	}else{
            		alert(response);
            	}
            	deletingInventory = false;
            }else {
            	alert(response);
	        }
	       	document.getElementsByClassName("main")[0].classList.remove("disable_screen");
        }
    };
    xhr.send(query);
}

window.onload = function(){
	updateMainUI();
	gettingInventoryData = true;
	document.getElementsByClassName("main")[0].classList.add("disable_screen");
	executeAPI("getInventoryData()");
}

