var IDENTIFIER;
var viewBookingAPICalled = false;
var noShowAPICalled = false;
var bookingList = [];
var currentList = [];
function Booking(id,channel,tourtype,city,tourname,slot,date,people,amount,paytype1,discount,amount2,paytype2,guest_name,guest_email,guest_phone,reference,storyteller,status){
	this.id = id;
	this.channel = channel;
	this.tourtype = tourtype;
	this.city = city;
	this.tourname = tourname;
	this.slot = slot;
	this.date = date;
	this.people = people;
	this.amount = amount;
	this.paytype1 = paytype1;
	this.discount = discount;
	this.amount2 = amount2;
	this.paytype2 = paytype2;
	this.guest_name = guest_name;
	this.guest_email = guest_email;
	this.guest_phone = guest_phone;
	this.reference = reference;
	this.storyteller = storyteller
	this.status = status;
}

function channelFilterChanged(){
	var value = document.getElementById("channel_filter").value.toLowerCase();
	console.log("Channel filter Changed !! ---> ",value);
	var tempList = [];
	for (var i = 0; i < bookingList.length; i++) {
		var channel = bookingList[i].channel.toLowerCase();
		if(channel.includes(value)){
			tempList.push(bookingList[i]);
		}
	}
	setDisplayTable(tempList);
	currentList = tempList;
	bookingList = currentList;
	document.getElementById("channel_filter").value = value;
}
function tourtypeFilterChanged(){
	var value = document.getElementById("tourtype_filter").value.toLowerCase();
	var tempList = [];
	for (var i = 0; i < bookingList.length; i++) {
		var type = bookingList[i].tourtype.toLowerCase();
		if(type.includes(value)){
			tempList.push(bookingList[i]);
		}
	}
	setDisplayTable(tempList);
	currentList = tempList;
	bookingList = currentList;
	document.getElementById("tourtype_filter").value = value;	
}
function cityFilterChanged(){
	var value = document.getElementById("city_filter").value.toLowerCase();
	var tempList = [];
	for (var i = 0; i < bookingList.length; i++) {
		var city = bookingList[i].city.toLowerCase();
		if(city.includes(value)){
			tempList.push(bookingList[i]);
		}
	}
	setDisplayTable(tempList);
	currentList = tempList;
	bookingList = currentList;
	document.getElementById("city_filter").value = value;	
}
function tournameFilterChanged(){
	var value = document.getElementById("tourname_filter").value.toLowerCase();
	var tempList = [];
	for (var i = 0; i < bookingList.length; i++) {
		var tour_name = bookingList[i].tourname.toLowerCase();
		if(tour_name.includes(value)){
			tempList.push(bookingList[i]);
		}
	}
	setDisplayTable(tempList);
	currentList = tempList;
	bookingList = currentList;
	document.getElementById("tourname_filter").value = value;	
}
function dateFilterChanged(){
	var value = document.getElementById("date_filter").value;
	var tempList = [];
	for (var i = 0; i < bookingList.length; i++) {
		if(bookingList[i].date.includes(value)){
			tempList.push(bookingList[i]);
		}
	}
	setDisplayTable(tempList);
	currentList = tempList;
	bookingList = currentList;
	document.getElementById("date_filter").value = value;	
}
function numberFilterChanged(){
	var value = document.getElementById("number_filter").value;
	var tempList = [];
	for (var i = 0; i < bookingList.length; i++) {
		if(bookingList[i].people.includes(value)){
			tempList.push(bookingList[i]);
		}
	}
	setDisplayTable(tempList);
	currentList = tempList;
	bookingList = currentList;
	document.getElementById("number_filter").value = value;	
} 
function amountFilterChanged(){
	var value = document.getElementById("amount_filter").value;
	var tempList = [];
	for (var i = 0; i < bookingList.length; i++) {
		var amount = bookingList[i].amount;
		if (amount!=null) {
			if(amount.includes(value)){
				tempList.push(bookingList[i]);
			}
		}
	}
	setDisplayTable(tempList);
	currentList = tempList;
	bookingList = currentList;
	document.getElementById("amount_filter").value = value;	
}
function payType1FilterChanged(){
	var value = document.getElementById("paytype1_filter").value.toLowerCase();
	var tempList = [];
	for (var i = 0; i < bookingList.length; i++) {
		var paytype1 = bookingList[i].paytype1.toLowerCase();
		if (paytype1!=null) {
			if(paytype1.includes(value)){
				tempList.push(bookingList[i]);
			}
		}
	}
	setDisplayTable(tempList);
	currentList = tempList;
	bookingList = currentList;
	document.getElementById("paytype1_filter").value = value;	
}
function payType2FilterChanged(){
	var value = document.getElementById("paytype2_filter").value.toLowerCase();
	var tempList = [];
	for (var i = 0; i < bookingList.length; i++) {
		var paytype2 = bookingList[i].paytype2.toLowerCase();
		if (paytype2!=null) {
			if(paytype2.includes(value)){
				tempList.push(bookingList[i]);
			}
		}
	}
	setDisplayTable(tempList);
	currentList = tempList;
	bookingList = currentList;
	document.getElementById("paytype2_filter").value = value;	
}
function guestNameFilterChanged(){
	var value = document.getElementById("guest_name_filter").value.toLowerCase();
	var tempList = [];
	for (var i = 0; i < bookingList.length; i++) {
		var guest = bookingList[i].guest_name.toLowerCase();
		if(guest.includes(value)){
			tempList.push(bookingList[i]);
		}
	}
	setDisplayTable(tempList);
	currentList = tempList;
	bookingList = currentList;
	document.getElementById("guest_name_filter").value = value;	
}
function guestEmailFilterChanged(){
	var value = document.getElementById("guest_email_filter").value.toLowerCase();
	var tempList = [];
	for (var i = 0; i < bookingList.length; i++) {
		var guest = bookingList[i].guest_email.toLowerCase();
		if(guest.includes(value)){
			tempList.push(bookingList[i]);
		}
	}
	setDisplayTable(tempList);
	currentList = tempList;
	bookingList = currentList;
	document.getElementById("guest_email_filter").value = value;	
}
function guestPhoneFilterChanged(){
	var value = document.getElementById("guest_phone_filter").value.toLowerCase();
	var tempList = [];
	for (var i = 0; i < bookingList.length; i++) {
		var guest = bookingList[i].guest_phone.toLowerCase();
		if(guest.includes(value)){
			tempList.push(bookingList[i]);
		}
	}
	setDisplayTable(tempList);
	currentList = tempList;
	bookingList = currentList;
	document.getElementById("guest_phone_filter").value = value;	
}
function referenceFilterChanged(){
	var value = document.getElementById("reference_filter").value.toLowerCase();
	var tempList = [];
	for (var i = 0; i < bookingList.length; i++) {
		var reference = bookingList[i].reference.toLowerCase();
		if(reference.includes(value)){
			tempList.push(bookingList[i]);
		}
	}
	setDisplayTable(tempList);
	currentList = tempList;
	bookingList = currentList;
	document.getElementById("reference_filter").value = value;	
}
function statusFilterChanged(){
	var value = document.getElementById("status_filter").value.toLowerCase();
	var tempList = [];
	for (var i = 0; i < bookingList.length; i++) {
		var status = bookingList[i].status.toLowerCase();
		if(status.includes(value)){
			tempList.push(bookingList[i]);
		}
	}
	setDisplayTable(tempList);
	currentList = tempList;
	bookingList = currentList;
	document.getElementById("status_filter").value = value;	
}
function sortChanged(id,src){
	console.log("Channel sorting Changed !",id);
	var tempList = currentList;
	var source = src.toString();
	if(source.includes("white_down_arrow")){
		for (var i = 0; i < tempList.length-1; i++) {
			var cur,next;
			if(id.includes("channel")){
				cur = tempList[i].channel;
			}else if(id.includes("tourtype")){
				cur = tempList[i].tourtype;
			}else if(id.includes("city")){
				cur = tempList[i].city;
			}else if(id.includes("tourname")){
				cur = tempList[i].tourname;
			}else if(id.includes("slot")){
				cur = tempList[i].slot;
			}else if(id.includes("date")){
				cur = tempList[i].date;
			}else if(id.includes("people")){
				cur = tempList[i].people;
			}else if(id.includes("amount")){
				cur = tempList[i].amount;
			}else if(id.includes("paytype1")){
				cur = tempList[i].paytype1;
			}else if(id.includes("discount")){
				cur = tempList[i].discount;
			}else if(id.includes("amount2")){
				cur = tempList[i].amount2;
			}else if(id.includes("paytype2")){
				cur = tempList[i].paytype2;
			}else if(id.includes("guest_name")){
				cur = tempList[i].guest_name;
			}else if(id.includes("guest_email")){
				cur = tempList[i].guest_email;
			}else if(id.includes("guest_phone")){
				cur = tempList[i].guest_phone;
			}else if(id.includes("reference")){
				cur = tempList[i].reference;
			}else if(id.includes("storyteller")){
				cur = tempList[i].storyteller;
			}else if(id.includes("status")){
				cur = tempList[i].status;
			}

			for (var j = i+1; j < tempList.length; j++) {
				if(id.includes("channel")){
					next = tempList[j].channel;
				}else if(id.includes("tourtype")){
					next = tempList[j].tourtype;
				}else if(id.includes("city")){
					next = tempList[j].city;
				}else if(id.includes("tourname")){
					next = tempList[j].tourname;
				}else if(id.includes("slot")){
					next = tempList[j].slot;
				}else if(id.includes("date")){
					next = tempList[j].date;
				}else if(id.includes("people")){
					next = tempList[j].people;
				}else if(id.includes("amount")){
					next = tempList[j].amount;
				}else if(id.includes("paytype1")){
					next = tempList[j].paytype1;
				}else if(id.includes("discount")){
					next = tempList[j].discount;
				}else if(id.includes("amount2")){
					next = tempList[j].amount2;
				}else if(id.includes("paytype2")){
					next = tempList[j].paytype2;
				}else if(id.includes("guest_name")){
					next = tempList[j].guest_name;
				}else if(id.includes("guest_email")){
					next = tempList[j].guest_email;
				}else if(id.includes("guest_phone")){
					next = tempList[j].guest_phone;
				}else if(id.includes("reference")){
					next = tempList[j].reference;
				}else if(id.includes("storyteller")){
					next = tempList[j].storyteller;
				}else if(id.includes("status")){
					next = tempList[j].status;
				}
				if( cur.localeCompare(next) > 0 ){
					var xxx = tempList[i];
					tempList[i] = tempList[j];
					tempList[j] = xxx;
				}
			}
		}
		setDisplayTable(tempList);
		document.getElementById(id).src = "image/white_up_arrow.png";
	}else if(source.includes("white_up_arrow")){
		for (var i = 0; i < tempList.length-1; i++) {
			var cur,next;
			if(id.includes("channel")){
				cur = tempList[i].channel;
			}else if(id.includes("tourtype")){
				cur = tempList[i].tourtype;
			}else if(id.includes("city")){
				cur = tempList[i].city;
			}else if(id.includes("tourname")){
				cur = tempList[i].tourname;
			}else if(id.includes("slot")){
				cur = tempList[i].slot;
			}else if(id.includes("date")){
				cur = tempList[i].date;
			}else if(id.includes("people")){
				cur = tempList[i].people;
			}else if(id.includes("amount")){
				cur = tempList[i].amount;
			}else if(id.includes("paytype1")){
				cur = tempList[i].paytype1;
			}else if(id.includes("discount")){
				cur = tempList[i].discount;
			}else if(id.includes("amount2")){
				cur = tempList[i].amount2;
			}else if(id.includes("paytype2")){
				cur = tempList[i].paytype2;
			}else if(id.includes("guest_name")){
				cur = tempList[i].guest_name;
			}else if(id.includes("guest_email")){
				cur = tempList[i].guest_email;
			}else if(id.includes("guest_phone")){
				cur = tempList[i].guest_phone;
			}else if(id.includes("reference")){
				cur = tempList[i].reference;
			}else if(id.includes("storyteller")){
				cur = tempList[i].storyteller;
			}else if(id.includes("status")){
				cur = tempList[i].status;
			}

			for (var j = i+1; j < tempList.length; j++) {
				if(id.includes("channel")){
					next = tempList[j].channel;
				}else if(id.includes("tourtype")){
					next = tempList[j].tourtype;
				}else if(id.includes("city")){
					next = tempList[j].city;
				}else if(id.includes("tourname")){
					next = tempList[j].tourname;
				}else if(id.includes("slot")){
					next = tempList[j].slot;
				}else if(id.includes("date")){
					next = tempList[j].date;
				}else if(id.includes("people")){
					next = tempList[j].people;
				}else if(id.includes("amount")){
					next = tempList[j].amount;
				}else if(id.includes("paytype1")){
					next = tempList[j].paytype1;
				}else if(id.includes("discount")){
					next = tempList[j].discount;
				}else if(id.includes("amount2")){
					next = tempList[j].amount2;
				}else if(id.includes("paytype2")){
					next = tempList[j].paytype2;
				}else if(id.includes("guest_name")){
					next = tempList[j].guest_name;
				}else if(id.includes("guest_email")){
					next = tempList[j].guest_email;
				}else if(id.includes("guest_phone")){
					next = tempList[j].guest_phone;
				}else if(id.includes("reference")){
					next = tempList[j].reference;
				}else if(id.includes("storyteller")){
					next = tempList[j].storyteller;
				}else if(id.includes("status")){
					next = tempList[j].status;
				}
				if( cur.localeCompare(next) < 0 ){
					var xxx = tempList[i];
					tempList[i] = tempList[j];
					tempList[j] = xxx;
				}
			}
		}
		setDisplayTable(tempList);
		document.getElementById(id).src = "image/white_down_arrow.png";
	}
	currentList = tempList;	
}
function modifyBooking(id){
	if (confirm("Are you sure ?")) {		
		var booking_id = parseInt(id.split("_")[2]);
		var selectedRowId = parseInt(document.getElementById(id).value);
		console.log("|--> Row Id : ",id);
		console.log("|--> Row Id : ",selectedRowId);
		if(selectedRowId==1){ //RESCHEDULE
			var reason = prompt("Enter reason for Rescheduling : ");
			if(reason!=null && reason.length>2){
				localStorage.setItem("RESCHEDULE_REASON",reason);
				localStorage.setItem("STORED_BOOKING_ID",booking_id); // For getting the booking in edit and cancel...
				localStorage.setItem("identifier","EDIT"); // For getting the booking in edit and cancel...
				window.open("modifyBooking.html","_top");
			}
		}else if(selectedRowId==2){	//REALLOCATE
			var reason = prompt("Enter reason for Reallocating : ");
			if(reason!=null && reason.length>2){
				localStorage.setItem("REALLOCATE_REASON",reason);
				localStorage.setItem("STORED_BOOKING_ID",booking_id); // For getting the booking in edit and cancel...
				window.location.replace("allocateBooking.html");		
			}
		}else if(selectedRowId==3){ //CANCEL
			var reason = prompt("Enter reason for Cancelling : ");
			if(reason!=null && reason.length>2){
				localStorage.setItem("CANCEL_REASON",reason);
				localStorage.setItem("STORED_BOOKING_ID",booking_id); // For getting the booking in edit and cancel...
				localStorage.setItem("identifier","DELETE"); // For getting the booking in edit and cancel...
				window.open("modifyBooking.html","_top");
			}	
		}else if(selectedRowId==4){ //No SHOW			
			noShowAPICalled = true;
			document.getElementsByClassName("main")[0].classList.add("disable_screen");
			executeAPI("makeNoShow()?".concat(booking_id));
		}	

	}
}
function allocateSTClicked(booking_id){
	console.log("|------> booking_id : ",booking_id);
	if(confirm("Do you want to allocate a StoryTeller to the selected booking")){	
		localStorage.setItem("STORED_BOOKING_ID",booking_id);
		window.location
		.replace("allocateBooking.html");		
	}
}
function setDisplayTable(list){
	if (IDENTIFIER!="past" && IDENTIFIER!="cancelled") {
		document.getElementById("booking_details_table").innerHTML = "<tr><th>BOOKING CHANNEL</th><th>TOUR TYPE</th><th>CITY</th><th>TOUR NAME</th><th>TIME SLOT</th><th>DATE</th><th>NO. OF PEOPLE</th><th>AMOUNT</th><th>PAYMENT TYPE</th><th>DISCOUNT</th><th>ADDITIONAL AMOUNT</th><th>PAYMENT TYPE</th><th>GUEST NAME</th><th>GUEST EMAIL</th><th>GUEST PHONE</th><th>BOOKING REFERENCE</th><th>STORY TELLER</th><th>STATUS</th><th>MODIFY</th></tr>";
		document.getElementById("booking_details_table").innerHTML +="<tr style=\"text-align: left;\"><th><input onchange=\"channelFilterChanged()\" id=\"channel_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"channel_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"tourtypeFilterChanged()\" id=\"tourtype_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"tourtype_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"cityFilterChanged()\" id=\"city_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"city_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"tournameFilterChanged()\" id=\"tourname_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"tourname_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"slotFilterChanged()\" id=\"slot_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"slot_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"dateFilterChanged()\" id=\"date_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"date_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"numberFilterChanged()\" id=\"number_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"people_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"amountFilterChanged()\" id=\"amount_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"amount_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"payType1FilterChanged()\" id=\"paytype1_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\"  id=\"paytype1_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"discountFilterChanged()\" id=\"discount_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"discount_sort\" src=\"image/white_down_arrow.png\"></th><th><input onclick=\"amount2SortChanged(this.src)\" onchange=\"amount2FilterChanged()\" id=\"amount2_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"amount2_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"payType2FilterChanged()\" id=\"paytype2_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"paytype2_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"guestNameFilterChanged()\" id=\"guest_name_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"guest_name_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"guestEmailFilterChanged()\" id=\"guest_email_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"guest_email_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"guestPhoneFilterChanged()\" id=\"guest_phone_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"guest_phone_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"bookingReferenceFilterChanged()\" id=\"reference_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"reference_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"storyTellerFilterChanged()\" id=\"storyteller_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"storyteller_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"statusFilterChanged()\" id=\"status_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"status_sort\" src=\"image/white_down_arrow.png\"></th><th></th></tr>";
	}else{
		document.getElementById("booking_details_table").innerHTML = "<tr><th>BOOKING CHANNEL</th><th>TOUR TYPE</th><th>CITY</th><th>TOUR NAME</th><th>TIME SLOT</th><th>DATE</th><th>NO. OF PEOPLE</th><th>AMOUNT</th><th>PAYMENT TYPE</th><th>DISCOUNT</th><th>ADDITIONAL AMOUNT</th><th>PAYMENT TYPE</th><th>GUEST NAME</th><th>GUEST EMAIL</th><th>GUEST PHONE</th><th>BOOKING REFERENCE</th><th>STORY TELLER</th><th>STATUS</th></tr>";	
		document.getElementById("booking_details_table").innerHTML +="<tr style=\"text-align: left;\"><th><input onchange=\"channelFilterChanged()\" id=\"channel_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"channel_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"tourtypeFilterChanged()\" id=\"tourtype_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"tourtype_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"cityFilterChanged()\" id=\"city_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"city_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"tournameFilterChanged()\" id=\"tourname_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"tourname_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"slotFilterChanged()\" id=\"slot_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"slot_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"dateFilterChanged()\" id=\"date_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"date_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"numberFilterChanged()\" id=\"number_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"people_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"amountFilterChanged()\" id=\"amount_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"amount_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"payType1FilterChanged()\" id=\"paytype1_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\"  id=\"paytype1_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"discountFilterChanged()\" id=\"discount_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"discount_sort\" src=\"image/white_down_arrow.png\"></th><th><input onclick=\"amount2SortChanged(this.src)\" onchange=\"amount2FilterChanged()\" id=\"amount2_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"amount2_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"payType2FilterChanged()\" id=\"paytype2_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"paytype2_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"guestNameFilterChanged()\" id=\"guest_name_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"guest_name_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"guestEmailFilterChanged()\" id=\"guest_email_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"guest_email_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"guestPhoneFilterChanged()\" id=\"guest_phone_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"guest_phone_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"bookingReferenceFilterChanged()\" id=\"reference_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"reference_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"storyTellerFilterChanged()\" id=\"storyteller_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"storyteller_sort\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"statusFilterChanged()\" id=\"status_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"status_sort\" src=\"image/white_down_arrow.png\"></th></tr>";
	}
	
	for (var i = 0; i < list.length; i++) {
		var extraHTML = "<tr id=\"booking_id_";
		extraHTML = extraHTML.concat(list[i].id).concat("\">");
		extraHTML = extraHTML.concat("<td>").concat(list[i].channel).concat("</td>");
		extraHTML = extraHTML.concat("<td>").concat(list[i].tourtype).concat("</td>");
		extraHTML = extraHTML.concat("<td>").concat(list[i].city).concat("</td>");
		extraHTML = extraHTML.concat("<td>").concat(list[i].tourname).concat("</td>");
		extraHTML = extraHTML.concat("<td>").concat(list[i].slot).concat("</td>");
		extraHTML = extraHTML.concat("<td>").concat(list[i].date).concat("</td>");
		extraHTML = extraHTML.concat("<td>").concat(list[i].people).concat("</td>");
		extraHTML = extraHTML.concat("<td>").concat(list[i].amount).concat("</td>");
		extraHTML = extraHTML.concat("<td>").concat(list[i].paytype1).concat("</td>");
		extraHTML = extraHTML.concat("<td>").concat(list[i].discount).concat("</td>");
		extraHTML = extraHTML.concat("<td>").concat(list[i].amount2).concat("</td>");
		extraHTML = extraHTML.concat("<td>").concat(list[i].paytype2).concat("</td>");
		extraHTML = extraHTML.concat("<td>").concat(list[i].guest_name).concat("</td>");
		extraHTML = extraHTML.concat("<td>").concat(list[i].guest_email).concat("</td>");
		extraHTML = extraHTML.concat("<td>").concat(list[i].guest_phone).concat("</td>");
		extraHTML = extraHTML.concat("<td>").concat(list[i].reference).concat("</td>");
		if(list[i].storyteller=="unallocated" && list[i].status!="CN"){
			extraHTML = extraHTML.concat("<td>").concat("<button value=\"").concat(list[i].id);
			extraHTML = extraHTML.concat("\" onclick=\"allocateSTClicked(this.value)\">Allocate</button>").concat("</td>");
		}else if(list[i].status=="CN" && list[i].storyteller=="unallocated"){
			extraHTML = extraHTML.concat("<td>").concat("NA").concat("</td>");
		}else{
			extraHTML = extraHTML.concat("<td>").concat(list[i].storyteller.split(",")[1]).concat("</td>");
		}		
		extraHTML = extraHTML.concat("<td>").concat(list[i].status).concat("</td>");
	
		if(IDENTIFIER!="past" && IDENTIFIER!="cancelled"){
			if(list[i].status == "CN" || list[i].status == "NS"){
				extraHTML = extraHTML.concat("<td>");
			}else if(list[i].storyteller=="unallocated"){
				extraHTML = extraHTML.concat("<td><select onchange=\"modifyBooking(this.id)\" id=\"modify_booking_").concat(list[i].id).concat("_input\" type=\"text\" placeholder=\"&nbsp;\"><option value=\"0\" selected disabled>SELECT</option><option value=\"1\">RESCHEDULE</option><option value=\"3\">CANCEL</option><option value=\"4\">NO SHOW</option></select></td></tr>");			
			}else {
				extraHTML = extraHTML.concat("<td><select onchange=\"modifyBooking(this.id)\" id=\"modify_booking_").concat(list[i].id).concat("_input\" type=\"text\" placeholder=\"&nbsp;\"><option value=\"0\" selected disabled>SELECT</option><option value=\"1\">RESCHEDULE</option><option value=\"2\">REALLOCATE</option><option value=\"3\">CANCEL</option><option value=\"4\">NO SHOW</option></select></td></tr>");			
			}
		}
		extraHTML = extraHTML.concat("</td></tr>");
		document.getElementById("booking_details_table").innerHTML += extraHTML;
	}
}
function parseBooking(response){
	console.log("Response : ",response);
	var parts = response.split(">");
	parts[0] = parts[0].substring(1,parts[0].length)
	var bookings = parts[0].split(";");
	console.log("bookings : ",bookings);
	for (var i = 0; i < bookings.length; i++) { // -1 because parts has useless last element , see console.log(parts)
		var bookingData = (bookings[i].substring(1,bookings[i].length-1)).split(",");
		console.log("Setting non linked field : ",bookingData);
		var linkedData = (parts[i+1].substring(1,parts[i+1].length)).split("|");
		console.log("Setting linked field : ",linkedData);
		var id = bookingData[0];
		var channel = linkedData[0].substring(1,linkedData[0].length-1);
		var type = linkedData[1].substring(1,linkedData[1].length-1);
		var city = linkedData[2].substring(1,linkedData[2].length-1);
		var name = linkedData[3].substring(1,linkedData[3].length-1);
		var timeSplit = linkedData[4].substring(1,linkedData[4].length-1).split(",");
		var slot = timeSplit[1].concat("-").concat(timeSplit[2]);
		var date = bookingData[3];
		var people = bookingData[4];
		var amount = bookingData[5];
		var paytype1 = linkedData[5].substring(1,linkedData[5].length-1);
		var discount = bookingData[7];
		var amount2 = bookingData[8];
		var paytype2 = linkedData[6].substring(1,linkedData[6].length-1);
		if(paytype2 == ""){
			paytype2 = "None";
		}
		var guestSplit = linkedData[7].substring(1,linkedData[7].length-1).split(",");
		var guest_name = guestSplit[1];
		var guest_email = guestSplit[2];
		var guest_phone = guestSplit[3];
		var reference = bookingData[12];
		var storyteller = linkedData[8].substring(1,linkedData[8].length-1);
		var status = bookingData[17];
		bookingList.push(new Booking(id,channel,type,city,name,slot,date,people,amount,paytype1,discount,amount2,paytype2,guest_name,guest_email,guest_phone,reference,storyteller,status));		
	}
	console.log("BookingList : ",bookingList);
	currentList = bookingList ; 
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
        	if (viewBookingAPICalled) {
        		if(response!="[]"){
        			parseBooking(response);
	        		setDisplayTable(bookingList);
        		}else{
        			alert("No bookings of the clicked type exist!!");
        			history.go(-1);
        		}
        		viewBookingAPICalled = false;
        	}else if(noShowAPICalled){
        		if(response=="API executed successfully"){
					alert("booking maked NO SHOW !")
				    localStorage.setItem("identifier",IDENTIFIER);
				    document.location.reload();
				}        		
        	}else{
        		alert(response);
        	}
            document.getElementsByClassName("main")[0].classList.remove("disable_screen");    
        }
    };
    xhr.send(query);
}	
window.onload = function(){
	updateMainUI();
	IDENTIFIER = localStorage.getItem("identifier");
	localStorage.removeItem("identifier")
				
	viewBookingAPICalled = true;
    document.getElementsByClassName("main")[0].classList.add("disable_screen");    
    executeAPI("getViewBookingData()?".concat(IDENTIFIER));
}

