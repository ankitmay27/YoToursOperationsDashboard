var IDENTIFIER;
var BOOKING_SAVED = false;
var selectedChannelId=null,selectedCityId=null,selectedTourtypeId=null;
var selectedTournameId=null;
var selectedTimeslotId=null;
var selectedInventoryId=null;
var selectedGuestId=null;
var selectedGuestName=null,selectedGuestEmail=null,selectedGuestPhone=null,selectedGuestCountryCode=null;
var selectedAmount = 0;
var ANBData1Called = false,ANBData2Called = false,ANBData3Called = false,ANBData4Called = false,RSBData1Called=false,RSBookingAPICalled=false,CNBData1Called=false,CNBookingAPICalled=false,saveBookingAPICalled=false,allocateBookingAPICalled=false;
var checkGuestAPICalled=false;
var STORED_BOOKING_ID,RESCHEDULE_REASON,CANCEL_REASON,RETRIEVEDBOOKING = "";

function calculateAmount(){
 	let discount = parseInt(document.getElementById("discount_input").value);
	// let additional_amt = parseInt(document.getElementById("amount2_input").value);
	console.log("amount : ",selectedAmount," | discount : ",discount);//," | additional_amt : ",additional_amt);
 	document.getElementById("amount_input").value = selectedAmount - discount ; // + additional_amt;		
}
function guestNameChanged(){
	selectedGuestName = document.getElementById("guest_name_input").value;
	console.log("Guest Name : ",selectedGuestName);
	// if (IDENTIFIER=="ADD") {
	// 	if (selectedGuestName!=null && selectedGuestEmail!=null && selectedGuestPhone!=null && selectedGuestCountryCode!=null ) {
	// 		checkGuestAPICalled = true;
	// 		executeAPI("checkGuest()?".concat(selectedGuestName).concat(",").concat(selectedGuestEmail).concat(",").concat(selectedGuestCountryCode).concat(",").concat(selectedGuestPhone));
	// 	}
	// }
}
function guestEmailChanged(){
	selectedGuestEmail = document.getElementById("guest_email_input").value;
	console.log("Guest Email : ",selectedGuestEmail);
	if (IDENTIFIER=="ADD") {
		if (selectedGuestEmail.split("@").length!=2 || selectedGuestEmail.split("@")[1].split(".").length!=2) { //validating  Email
			alert("Email format is not correct!!");
			document.getElementById("guest_email_input").value = null;
		}
	}
}
function guestPhoneChanged(){
	selectedGuestPhone = document.getElementById("guest_phone_input_no").value;
	console.log("Guest Phone : ",selectedGuestPhone);
	// if (IDENTIFIER=="ADD") {
		// if (selectedGuestPhone.length==10) {
			// if (selectedGuestName!=null && selectedGuestEmail!=null && selectedGuestPhone!=null && selectedGuestCountryCode!=null ) {
			// 	checkGuestAPICalled = true;
			// 	executeAPI("checkGuest()?".concat(selectedGuestName).concat(",").concat(selectedGuestEmail).concat(",").concat(selectedGuestCountryCode).concat(",").concat(selectedGuestPhone));
			// }
		// }else{
		// 	alert("Phone No. must be 10 digit long!!");
		// 	document.getElementById("guest_phone_input_no").value = null;
		// }
	// }
}
function guestCountryCodeChanged(){
	selectedGuestCountryCode = document.getElementById("guest_phone_input_cc").value;
	console.log("Guest Phone Country Code : ",selectedGuestCountryCode);
	if (IDENTIFIER=="ADD") {
		if (selectedGuestCountryCode.length==2) {
			// if (selectedGuestName!=null && selectedGuestEmail!=null && selectedGuestPhone!=null && selectedGuestCountryCode!=null ) {
			// 	checkGuestAPICalled = true;
			// 	executeAPI("checkGuest()?".concat(selectedGuestName).concat(",").concat(selectedGuestEmail).concat(",").concat(selectedGuestCountryCode).concat(",").concat(selectedGuestPhone));
			// }
		}else{
			alert("Country Code must be 2 digit long!!");
			document.getElementById("guest_phone_input_cc").value = null;
		}
	}
}
function peopleChanged(){
	if(parseInt(document.getElementById("people_input").value)>50){
		alert("Maximum No. of people in a booking is 50!!");
		document.getElementById("people_input").value = 1;
	}
}
function paytype1Changed(){
	enableInput("guest_name_input");
	enableInput("guest_email_input");
	enableInput("guest_phone_input_no");
	enableInput("guest_phone_input_cc");
	enableInput("booking_reference_input");		
}
function amountChanged(){
	selectedAmount = parseInt(document.getElementById("amount_input").value);
	console.log("amount : ",selectedAmount);
}
function amount2Changed(){
	if (parseInt(document.getElementById("amount2_input").value)>0) {
		enableInput("amount2_reason_input");
		enableInput("paytype2_input");
	}
	// calculateAmount();
}
function discountChanged(){
	calculateAmount();
}
function channelChanged(){
	selectedChannelId = parseInt(document.getElementById("channel_input").value);
	console.log("Selected Booking Channel : ",selectedChannelId);
}
function tourtypeChanged(){
	selectedTourtypeId = parseInt(document.getElementById("tourtype_input").value);
	console.log("Changed Tour Type Id : ",selectedTourtypeId);		
	if(IDENTIFIER=="ADD"){
		if (selectedCityId!=null) { // First city is selected then type
			document.getElementsByClassName("main")[0].classList.add("disable_screen");
			executeAPI("getANBData2()?".concat(selectedCityId).concat(",").concat(selectedTourtypeId));
			ANBData2Called = true;	
		}
	}
}
function cityChanged(){
	selectedCityId = parseInt(document.getElementById("city_input").value);
	console.log("Changed City Id : ",selectedCityId);		
	if(IDENTIFIER=="ADD"){
		if(selectedTourtypeId!=null){ // First type is selected then city
			document.getElementsByClassName("main")[0].classList.add("disable_screen");
			executeAPI("getANBData2()?".concat(selectedCityId).concat(",").concat(selectedTourtypeId));
			ANBData2Called = true;
		}
	}
}
function tournameChanged(){ 
	selectedTournameId = parseInt(document.getElementById("tourname_input").value); 
	console.log("selectedTournameId : ",selectedTournameId);
	if(IDENTIFIER=="ADD"){
		if(selectedCityId !=null && selectedTourtypeId!=null){
			document.getElementsByClassName("main")[0].classList.add("disable_screen");
			executeAPI("getANBData3()?".concat(selectedCityId).concat(",").concat(selectedTourtypeId).concat(",").concat(selectedTournameId));
			ANBData3Called = true;
		}
	}		
}
function timeslotChanged(){
	selectedTimeslotId = parseInt(document.getElementById("timeslot_input").value);
	console.log("selectedTimeslotId : ",selectedTimeslotId);
	if(selectedCityId !=null && selectedTourtypeId!=null && selectedTournameId !=null){
		document.getElementsByClassName("main")[0].classList.add("disable_screen");
		executeAPI("getANBData4()?".concat(selectedCityId).concat(",").concat(selectedTourtypeId).concat(",").concat(selectedTournameId).concat(",").concat(selectedTimeslotId));
		ANBData4Called = true;
	}			
}

function rescheduleBookingClicked(){
	if(allInputsFilled()){		
		if (confirm("Are your sure you want to reschedule the booking??")) {
			var bookingSplit = RETRIEVEDBOOKING.split(",");
			var id = bookingSplit[0];
			var inventory_id = selectedInventoryId;
			var date = document.getElementById("date_input").value;
			var people = document.getElementById("people_input").value;
			var discount = document.getElementById("discount_input").value;
			var amount2 = document.getElementById("amount2_input").value;
			var paytype2_id = document.getElementById("paytype2_input").value;
			var amount2_reason = document.getElementById("amount2_reason_input").value;
			var query = "rescheduleBooking()?".concat(id).concat(",").concat(inventory_id).concat(",").concat(date).concat(",").concat(people).concat(",").concat(discount).concat(",").concat(amount2).concat(",").concat(paytype2_id).concat(",").concat(amount2_reason).concat(",").concat(RESCHEDULE_REASON);
			document.getElementsByClassName("main")[0].classList.add("disable_screen");
			executeAPI(query);
			RSBookingAPICalled = true;
		}
	}
}
function cancelBookingClicked(){
	if(allInputsFilled()){		
		if (confirm("Are your sure you want to cancel the booking??")) {
			var bookingSplit = RETRIEVEDBOOKING.split(",");
			var id = bookingSplit[0];
			var query = "cancelBooking()?".concat(id).concat(",").concat(CANCEL_REASON);
			document.getElementsByClassName("main")[0].classList.add("disable_screen");
			executeAPI(query);
			CNBookingAPICalled = true;
		}
	}
}
function allocateBookingClicked(){
	if(allInputsFilled()){		
		if(confirm("Are you sure ?")){
			if (!BOOKING_SAVED) {
				saveBooking();
				allocateBookingAPICalled = true;
			}else{
				window.location.replace("allocateBooking.html");		
			}
		}
	}	
}
function saveBookingClicked(){
	if(allInputsFilled()){		
		if(confirm("Are you sure ?")){
			saveBooking();
			saveBookingAPICalled = true;
		}
	}	
}
function saveBooking(){
	var date = document.getElementById("date_input").value;
    var people = document.getElementById("people_input").value;
    var amount = document.getElementById("amount_input").value;
    var paytype1 = document.getElementById("paytype1_input").value;
    var discount = document.getElementById("discount_input").value;
    var amount2 = document.getElementById("amount2_input").value;
    var paytype2 = document.getElementById("paytype2_input").value;
    var amount2_reason = document.getElementById("amount2_reason_input").value;
    var booking_reference = document.getElementById("booking_reference_input").value;
	
	var query = "addbooking()?";
	query = query.concat(selectedChannelId).concat(",");
	query = query.concat(selectedTourtypeId).concat(",");
	query = query.concat(selectedCityId).concat(",");
	query = query.concat(selectedTournameId).concat(",");
	query = query.concat(selectedTimeslotId).concat(",");
	query = query.concat(date).concat(",");
	query = query.concat(people).concat(",");
	query = query.concat(amount).concat(",");
	query = query.concat(paytype1).concat(",");
	query = query.concat(discount).concat(",");
	query = query.concat(amount2).concat(",");
	query = query.concat(paytype2).concat(",");
	query = query.concat(amount2_reason).concat(",");
	query = query.concat(selectedGuestName).concat(",");
	query = query.concat(selectedGuestEmail).concat(",");
	query = query.concat(selectedGuestCountryCode).concat(",");
	query = query.concat(selectedGuestPhone).concat(",");
	query = query.concat(booking_reference).concat(",");
	
	query = query.concat(0).concat(",");
	query = query.concat("S");
	
	document.getElementsByClassName("main")[0].classList.add("disable_screen");	
    executeAPI(query);				
}
function allInputsFilled(){
	var no = parseInt(document.getElementById("people_input").value);
	var date = document.getElementById("date_input").value;
	var amount = parseInt(document.getElementById("amount_input").value);
	var paytype1 = parseInt(document.getElementById("paytype1_input").value);
	var amount2 = parseInt(document.getElementById("amount2_input").value);
	var paytype2 = parseInt(document.getElementById("paytype2_input").value);
	var reason = document.getElementById("amount2_reason_input").value;
	var booking_reference = document.getElementById("booking_reference_input").value;
	var filled = true;
	
	if( selectedChannelId==null){
		alert("Select booking channel !!");
		filled = false;
	}else if(selectedTourtypeId==null){
		alert("Select tour type !!");
		filled = false;
	}else if(selectedCityId==null){
		alert("Select City first!!");
		filled = false;
	}else if(selectedTournameId==null){
		alert("Select tour name !!");
		filled = false;
	}else if(no<=0){
		alert("No. of people cannot be zero or less!!");
		filled = false;
	}else if(date.length<=0){
		alert("Select tour date !!");
		filled = false;
	}else if(selectedTimeslotId==null){
		alert("Select tour time !!",selectedTimeslotId);
		filled = false;
	}else if(amount>0 && paytype1==0) {
		alert("Select payment type FOR BOOKING AMOUNT !!");
		filled = false;
	}else if(amount2>0 && paytype2==0){
		alert("Select payment type FOR ADDITIONAL AMOUNT!!");
		filled = false;
	}else if(amount2>0 && reason.length<=0){
			alert("Select reason FOR ADDITIONAL AMOUNT!!");
			filled = false;
	}else if(selectedGuestName==null){
		alert("Enter guest name!!");
		filled = false;
	}else if(selectedGuestCountryCode==null){
		alert("Fill guest phone number country code!!");
		filled = false;
	}else if(selectedGuestPhone==null){
		alert("Fill guest phone number !!");
		filled = false;
	}else if(selectedGuestEmail==null){
		alert("Enter guest email!!");
		filled = false;
	}else if(booking_reference.length<=0){
		alert("Enter booking reference!!");
		filled = false;
	}

	return filled;
}
function disableAllInputs(){
	document.getElementById("channel_input").disabled = true;	
	document.getElementById("tourtype_input").disabled = true;	
	document.getElementById("city_input").disabled = true;	
	document.getElementById("tourname_input").disabled = true;	
	document.getElementById("people_input").disabled = true;	
	document.getElementById("date_input").disabled = true;	
	document.getElementById("timeslot_input").disabled = true;	
	document.getElementById("amount_input").disabled = true;	
	document.getElementById("paytype1_input").disabled = true;	
	document.getElementById("discount_input").disabled = true;	
	document.getElementById("amount2_input").disabled = true;	
	document.getElementById("paytype2_input").disabled = true;	
	document.getElementById("amount2_reason_input").disabled = true;	
	document.getElementById("guest_name_input").disabled = true;	
	document.getElementById("guest_email_input").disabled = true;	
	document.getElementById("guest_phone_input_cc").disabled = true;	
	document.getElementById("guest_phone_input_no").disabled = true;
	document.getElementById("booking_reference_input").disabled = true;

	document.getElementById("channel_input").style.backgroundColor = "#e8e8e8";	
	document.getElementById("tourtype_input").style.backgroundColor = "#e8e8e8";
	document.getElementById("city_input").style.backgroundColor = "#e8e8e8";	
	document.getElementById("tourname_input").style.backgroundColor = "#e8e8e8";
	document.getElementById("people_input").style.backgroundColor = "#e8e8e8";
	document.getElementById("date_input").style.backgroundColor = "#e8e8e8";
	document.getElementById("timeslot_input").style.backgroundColor = "#e8e8e8";
	document.getElementById("amount_input").style.backgroundColor = "#e8e8e8";
	document.getElementById("paytype1_input").style.backgroundColor = "#e8e8e8";
	document.getElementById("discount_input").style.backgroundColor = "#e8e8e8";
	document.getElementById("amount2_input").style.backgroundColor = "#e8e8e8";
	document.getElementById("paytype2_input").style.backgroundColor = "#e8e8e8";
	document.getElementById("amount2_reason_input").style.backgroundColor = "#e8e8e8";
	document.getElementById("guest_name_input").style.backgroundColor = "#e8e8e8";
	document.getElementById("guest_email_input").style.backgroundColor = "#e8e8e8";
	document.getElementById("guest_phone_input_cc").style.backgroundColor = "#e8e8e8";
	document.getElementById("guest_phone_input_no").style.backgroundColor = "#e8e8e8";
	document.getElementById("booking_reference_input").style.backgroundColor = "#e8e8e8";
}
function enableInput(id){
	document.getElementById(id).disabled = false;
	document.getElementById(id).style.backgroundColor = "#ffffff";	
}
function setGuestData(response){
	var guest = response.split(":")[1];
	guest = guest.substring(1,guest.length-2);
	var guestSplit = guest.split(",");
	console.log("|-----> guestSplit : ",guestSplit);
	selectedGuestId = guestSplit[0];
	var guestName = guestSplit[1];
	var guestEmail = guestSplit[2];
	var guestPhone = guestSplit[3].substring(1,guestSplit[3].length);
	document.getElementById("guest_name_input").value = guestName;
	document.getElementById("guest_email_input").value = guestEmail;
	document.getElementById("guest_phone_input_cc").value = guestPhone.split("-")[0];
	document.getElementById("guest_phone_input_no").value = guestPhone.split("-")[1];
	guestNameChanged();
	guestEmailChanged();
	guestPhoneChanged();
	guestCountryCodeChanged();
}
function setNonLinkedFields(booking){
	console.log("|----------> booking : ",booking);
	var bookingSplit = booking.split(",");
	document.getElementById("date_input").value = bookingSplit[3];
	document.getElementById("people_input").value = bookingSplit[4];
	peopleChanged();
	document.getElementById("amount_input").value = bookingSplit[5];
	amountChanged();
	document.getElementById("discount_input").value = bookingSplit[7];
	document.getElementById("amount2_input").value = bookingSplit[8];
	document.getElementById("amount2_reason_input").value = bookingSplit[10];
	document.getElementById("booking_reference_input").value = bookingSplit[12];
}
function setDataDropDown(identifier,response){
	console.log("Response for setting dropdown: ",response)
	
	var temp;
	if (identifier!="timeslot") {
		temp = 	response.split(":")[1];		
	}else{
		temp = response.substring(12,response.length);
	}
	
	temp = temp.substring(0,temp.length-1);
	var res_list = temp.split(";");
	var extraHTML = "";
	if (identifier=="channel") {
		extraHTML = "<option value=\"0\" selected disabled>SELECT BOOKING CHANNEL</option>";
	}else if (identifier=="paytype" || identifier=="paytype1" || identifier=="paytype2") {
		extraHTML = "<option value=\"0\" selected disabled>SELECT PAYTYPE</option>";
	}else if (identifier=="tourtype") {
		extraHTML = "<option value=\"0\" selected disabled>SELECT TOUR TYPE</option>";
	}else if(identifier == "city"){
		extraHTML = "<option value=\"0\" selected disabled>SELECT CITY</option>";
	}else if(identifier == "tourname"){
		extraHTML = "<option value=\"0\" selected disabled>SELECT TOUR NAME</option>";
	}else if(identifier == "timeslot"){
		extraHTML = "<option value=\"0\" selected disabled>SELECT TIME SLOT</option>";
	}
	for (var i = 0; i < res_list.length; i++) {
		var id = parseInt(res_list[i].split(",")[0].match(/\d+/g).map(Number))
		var name = res_list[i].split(",")[1];
		if (identifier!="timeslot") {
			name = name.substring(0,name.length-1);
			extraHTML += "<option value=\"".concat(id).concat("\">").concat(name).concat("</option>");
		}else{
			var time = res_list[i].split(",")[2];
			time = time.substring(0,time.length-1);
			extraHTML += "<option value=\"".concat(id).concat("\">").concat(name).concat("-").concat(time).concat("</option>");
		}
	}

	if (IDENTIFIER=="ADD") {
		if (identifier=="channel") {
			document.getElementById("channel_input").innerHTML = extraHTML; 
			enableInput("channel_input");		
		}else if (identifier=="paytype") {
			document.getElementById("paytype1_input").innerHTML = extraHTML; 		
			document.getElementById("paytype2_input").innerHTML = extraHTML; 		
		}else if (identifier=="tourtype") {
			document.getElementById("tourtype_input").innerHTML = extraHTML; 		
			enableInput("tourtype_input");		
		}else if(identifier == "city"){
			document.getElementById("city_input").innerHTML = extraHTML; 		
			enableInput("city_input");		
		}else if(identifier == "tourname"){
			document.getElementById("tourname_input").innerHTML = extraHTML; 		
			enableInput("tourname_input");		
		}else if(identifier == "timeslot"){
			document.getElementById("timeslot_input").innerHTML = extraHTML; 		
		}
	}else if (IDENTIFIER=="EDIT" || IDENTIFIER=="DELETE") {
		if (identifier=="paytype2" && IDENTIFIER == "DELETE") {
			document.getElementById("paytype2_input").innerHTML = extraHTML; 
			var paytype2_id = parseInt(RETRIEVEDBOOKING.split(",")[9]);
			document.getElementById("paytype2_input").value = paytype2_id;
		}else if (identifier=="paytype2" && IDENTIFIER == "EDIT") {
			document.getElementById("paytype2_input").innerHTML = extraHTML; 
		}else if (identifier=="paytype1") {
			document.getElementById("paytype1_input").innerHTML = extraHTML; 
			var paytype1_id = parseInt(RETRIEVEDBOOKING.split(",")[6]);
			document.getElementById("paytype1_input").value = paytype1_id;
		}else if (identifier=="channel") {
			document.getElementById("channel_input").innerHTML = extraHTML; 
			var channel_id = parseInt(RETRIEVEDBOOKING.split(",")[1]);
			document.getElementById("channel_input").value = channel_id;
			channelChanged();
		}else if (identifier=="tourtype") {
			document.getElementById("tourtype_input").innerHTML = extraHTML; 		
			var type_id = parseInt(RETRIEVEDBOOKING.split(",")[2].split("-")[3]);
			document.getElementById("tourtype_input").value = type_id;
			tourtypeChanged();
		}else if(identifier == "city"){
			document.getElementById("city_input").innerHTML = extraHTML; 		
			var city_id = parseInt(RETRIEVEDBOOKING.split(",")[2].split("-")[2]);
			document.getElementById("city_input").value = city_id;
			cityChanged();
		}else if(identifier == "tourname"){
			document.getElementById("tourname_input").innerHTML = extraHTML; 		
			var name_id = parseInt(RETRIEVEDBOOKING.split(",")[2].split("-")[1]);
			document.getElementById("tourname_input").value = name_id;
			tournameChanged();
		}else if(identifier == "timeslot"){
			document.getElementById("timeslot_input").innerHTML = extraHTML; 		
			var timeslot_id = parseInt(RETRIEVEDBOOKING.split(",")[2].split("-")[4]);
			document.getElementById("timeslot_input").value = timeslot_id;
			timeslotChanged();
		} 
	}
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
            console.log("Response : ",response);
    		if (ANBData1Called) {
           		var res_list = response.split("|");
           		setDataDropDown("channel",res_list[0]);
    	    	setDataDropDown("paytype",res_list[1]);
    	    	setDataDropDown("tourtype",res_list[2]);
    	    	setDataDropDown("city",res_list[3]);
    	    	ANBData1Called = false;
            }else if (ANBData2Called){
			    if (response=="[]") {
			    	alert("No Tournames allotted with this City and Tourtype!!")
			    }else{
				    setDataDropDown("tourname",response)
				    ANBData2Called = false;
			    }
            }else if (ANBData3Called){
			    setDataDropDown("timeslot",response);
				enableInput("timeslot_input");		
				enableInput("people_input");		
				enableInput("date_input");		
				enableInput("amount_input");		
				enableInput("paytype1_input");		
				enableInput("discount_input");		
				enableInput("amount2_input");		
				ANBData3Called = false;
            }else if (ANBData4Called){
				console.log("Response : ",response);
    		    var temp = 	response.split(":")[1];		
				selectedInventoryId = parseInt(temp.split(",")[0].match(/\d+/g).map(Number));
				ANBData4Called = false;
            }else if(RSBData1Called){
            	console.log("Response : ",response);
            	res_list = response.split("|");
            	RETRIEVEDBOOKING = res_list[0].substring(1,res_list[0].length-1);
            	console.log("RETRIEVEDBOOKING : ",RETRIEVEDBOOKING);
            	var timeslots = res_list[5];
            	var paytype1 = res_list[6];
            	var paytype2 = res_list[7];
            	var guest = res_list[8];
            	setDataDropDown("channel",res_list[1]);
    	    	setDataDropDown("tourtype",res_list[4]);
    	    	setDataDropDown("city",res_list[3]);
    	    	setDataDropDown("tourname",res_list[2]);
    	    	setDataDropDown("timeslot",res_list[5]);
    	    	setNonLinkedFields(RETRIEVEDBOOKING);
    	    	setGuestData(guest);
    	    	setDataDropDown("paytype1",res_list[6]);
    	    	setDataDropDown("paytype2",res_list[7]);
    	    	enableInput("people_input");
    	    	enableInput("date_input");
    	    	enableInput("timeslot_input");
    	    	enableInput("discount_input");
    	    	enableInput("amount2_input");
    	    	enableInput("paytype2_input");
    	    	enableInput("amount2_reason_input");
    	    	RSBData1Called = false;
            }else if(RSBookingAPICalled){
            	if (response="API executed successfully") {
	            	localStorage.removeItem("RESCHEDULE_REASON");
	            	localStorage.removeItem("STORED_BOOKING_ID")
					alert("Booking RESCHEDULED!! ");
            		window.history.go(-2);
		    	}else{
            		console.log("Response : ",response);
    			}
    			RSBookingAPICalled = false;
            }else if(CNBData1Called){
            	console.log("Response : ",response);
            	res_list = response.split("|");
            	RETRIEVEDBOOKING = res_list[0].substring(1,res_list[0].length-1);
            	console.log("RETRIEVED_BOOKING : ",RETRIEVEDBOOKING);
            	var timeslot = res_list[5];
            	var paytype1 = res_list[6];
            	var paytype2 = res_list[7];
            	var guest = res_list[8];
            	setDataDropDown("channel",res_list[1]);
    	    	setDataDropDown("tourtype",res_list[4]);
    	    	setDataDropDown("city",res_list[3]);
    	    	setDataDropDown("tourname",res_list[2]);
    	    	setDataDropDown("timeslot",res_list[5]);
    	    	setNonLinkedFields(RETRIEVEDBOOKING);
    	    	setGuestData(guest);
    	    	setDataDropDown("paytype1",res_list[6]);
    	    	setDataDropDown("paytype2",res_list[7]);
    	    	CNBData1Called = false;
            }else if(CNBookingAPICalled){
            	if (response="API executed successfully") {
	            	localStorage.removeItem("CANCEL_REASON");
	            	localStorage.removeItem("STORED_BOOKING_ID")
					alert("Booking Cancelled!! ");
	        		window.history.go(-2);    	
            	}else{
            		console.log("Response : ",response);
    			}
    			CNBookingAPICalled = false;
            }else if(saveBookingAPICalled || allocateBookingAPICalled){
            	if (response=="API executed successfully") {
            		alert("Booking Saved!!");
            		BOOKING_SAVED = true;
					document.getElementById("save_button").style.visibility = "hidden";
	            	if (allocateBookingAPICalled) {
						window.location.replace("allocateBooking.html");		
	            	}
            	}
            	allocateBookingAPICalled = false;
            	saveBookingAPICalled = false;
            }else {
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
	
	if(IDENTIFIER=="DELETE"){
		STORED_BOOKING_ID = localStorage.getItem("STORED_BOOKING_ID");
		CANCEL_REASON = localStorage.getItem("CANCEL_REASON");
		document.getElementById("save_button").style.visibility="hidden";
		document.getElementById("allocate_button").style.visibility="hidden";
		document.getElementById("reschedule_button").style.visibility="hidden";
		executeAPI("getCNBData1()?".concat(STORED_BOOKING_ID));
		document.getElementsByClassName("main")[0].classList.add("disable_screen");
		CNBData1Called = true;
	}else if(IDENTIFIER=="EDIT"){
		STORED_BOOKING_ID = localStorage.getItem("STORED_BOOKING_ID");
		RESCHEDULE_REASON = localStorage.getItem("RESCHEDULE_REASON");
		document.getElementById("save_button").style.visibility="hidden";
		document.getElementById("allocate_button").style.visibility="hidden";
		document.getElementById("cancel_button").style.visibility="hidden";
		executeAPI("getRSBData1()?".concat(STORED_BOOKING_ID));
		document.getElementsByClassName("main")[0].classList.add("disable_screen");
		RSBData1Called = true;
	}else{
		document.getElementById("reschedule_button").style.visibility="hidden";
		document.getElementById("cancel_button").style.visibility="hidden";	
		executeAPI("getANBData1()");
		document.getElementsByClassName("main")[0].classList.add("disable_screen");
		ANBData1Called = true;
	}
	disableAllInputs();
};
