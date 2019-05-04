var current_month = 0;
var current_year = 0;

var dayList = [];
function Day(name,noOfBookings){
	this.name = name;
	this.noOfBookings = noOfBookings;
}
function viewDateWiseBookings(stringDate){
	window.open("viewBookings.html","_top");
    localStorage.setItem("identifier",stringDate);
}
function viewUpcomingBookings(){
	window.open("viewBookings.html","_top");
    localStorage.setItem("identifier","future");
}
function viewPastBookings(){
	window.open("viewBookings.html","_top");	
    localStorage.setItem("identifier","past");

}
function viewUnallocatedBookings(){
	window.open("viewBookings.html","_top");	
    localStorage.setItem("identifier","unallocated");
}
function viewCancelledBookings(){
	window.open("viewBookings.html","_top");	
    localStorage.setItem("identifier","cancelled");
}
function onRightMonthClick(){
	if(current_month==11){
		current_month=0;
		current_year++;
	}else {
		current_month++;
	}	
	getData(new Date(current_year,current_month));
}
function onLeftMonthClick(){
	if(current_month==0){
		current_month=11;
		current_year--;
	}else {
		current_month--;
	}	
	getData(new Date(current_year,current_month));
}
function bookingsClicked(value){
	var day = value.childNodes[0].innerHTML.split("<br>")[1];
	var date = "";
	date = date.concat(current_year).concat("-");
	if(current_month<10){
		date = date.concat("0").concat(current_month+1).concat("-");
	}else{
		date = date.concat(value.current_month).concat("-");
	}
	if(day<10){
		date = date.concat("0").concat(day);
	}else{
		date = date.concat(day);
	}
	console.log("|-> Clicked Booking value : ",date);
	viewDateWiseBookings(date);
}
function getNoOfDays(month_idx,year){
	switch(month_idx){
		case 0:
			return 31;
		case 1:
			if(year%4==0){
				return 29;
			}else{
				return 28;
			}	
		case 2:
			return 31;
		case 3:
			return 30;	
		case 4:
			return 31;
		case 5:
			return 30;	
		case 6:
			return 31;
		case 7:
			return 31;
		case 8:
			return 30;	
		case 9:
			return 31;
		case 10:
			return 30;	
		case 11:
			return 31;
	}
}
function getMonthYear(date){
	current_month = date.getMonth();
	current_year = date.getFullYear();

	if(date.getMonth()==0){
		return "January ".concat(date.getFullYear());
	}else if(date.getMonth()==1){
		return "February ".concat(date.getFullYear());
	}else if(date.getMonth()==2){
		return "March ".concat(date.getFullYear());
	}else if(date.getMonth()==3){
		return "April ".concat(date.getFullYear());
	}else if(date.getMonth()==4){
		return "May ".concat(date.getFullYear());
	}else if(date.getMonth()==5){
		return "June ".concat(date.getFullYear());
	}else if(date.getMonth()==6){
		return "July ".concat(date.getFullYear());
	}else if(date.getMonth()==7){
		return "August ".concat(date.getFullYear());
	}else if(date.getMonth()==8){
		return "September ".concat(date.getFullYear());
	}else if(date.getMonth()==9){
		return "October ".concat(date.getFullYear());
	}else if(date.getMonth()==10){
		return "November ".concat(date.getFullYear());
	}else{
		return "December ".concat(date.getFullYear());
	}
}
function getMonthFirstDateDay(date){
	var month_idx = date.getMonth();
	var year = date.getFullYear();
	var month_day = date.getDate();
	var week_day = date.getDay();
	var _1st_day = week_day + 1 - (month_day%7);
	if(_1st_day<0){
		_1st_day = 7 + _1st_day;
	}
	return _1st_day;
}
function getStringDate(date){
	var day = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();
	var text = "";
	text = text.concat(year).concat("-");
	
	if (month<9) {
		text+="0";
	}
	text = text.concat(month+1).concat("-");
	if (day<10) {
		text+="0";
	}
	text = text.concat(day);
	return text;
}
function updateUI(date){  //Update Calender UI with reference to variable date
	console.log("Updating UI for date : ",date);
	current_month = date.getMonth();
	current_year = date.getFullYear();
	var week_day_of_1st = getMonthFirstDateDay(date);
	var month = current_month;
	var year = current_year;
	document.getElementById("booking_month_year").innerHTML = getMonthYear(date); // updates current year and month
	
	var no_of_days = getNoOfDays(month,year);
	var no_of_rows;
	if((no_of_days + week_day_of_1st)%7==0)
		no_of_rows = Math.floor((no_of_days + week_day_of_1st)/7);
	else
		no_of_rows = Math.floor((no_of_days + week_day_of_1st)/7)+1;
		
	var day_idx_dummy = 0;
	var newHTML = "<tr id=\"calender_header_row\"><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thr</th><th>Fri</th><th>Sat</th></tr><tr id=\"calender_row\">";
	var day_idx = 0;
	console.log("\n\n no_of_days month year : ",no_of_days,month,year);
	for (var i = 0; i < no_of_rows; i++) {
		if(i==0){
			for (var j = 0; j < week_day_of_1st; j++) {
				newHTML = newHTML.concat("<td><br>-</td>");
			}
			for (var j = 0; j < 7 - week_day_of_1st ; j++) { // A date element is created
				// console.log("\t\tday_idx : ",day_idx);
				var temp = new Date(date.getFullYear(),date.getMonth(),j+1);
				var stringDate = getStringDate(temp);
			
				newHTML = newHTML.concat("<td onclick=\"bookingsClicked(this)\"><div class=\"date\">");
				newHTML = newHTML.concat("<b");
				if ( parseInt(dayList[day_idx].noOfBookings) > 0 ) {
					newHTML = newHTML.concat(" style=\"background-color:#7CFC00;\"");				
				}else{
					newHTML = newHTML.concat(" style=\"background-color:white;\"");				
				}
				newHTML = newHTML.concat(">").concat(dayList[day_idx].noOfBookings).concat("</b><br>");
				newHTML = newHTML.concat(j+1);
				newHTML = newHTML.concat("</div></td>");
				day_idx_dummy = j+1;
				if (day_idx<no_of_days) {
					day_idx++;
				}
			}
		}else{
			for (var j = 0; j < 7; j++) {
				// console.log("\t\tday_idx from else case(i!=0) : ",day_idx);
				var temp = new Date(date.getFullYear(),date.getMonth(),day_idx_dummy+1);
				var stringDate = getStringDate(temp);
			
				day_idx_dummy++;
				newHTML = newHTML.concat("<td onclick=\"bookingsClicked(this)\"><div class=\"date\">");
				newHTML = newHTML.concat("<b");
				if ( parseInt(dayList[day_idx].noOfBookings) > 0 ) {
					newHTML = newHTML.concat(" style=\"background-color:#7CFC00;\"");				
				}else{
					newHTML = newHTML.concat(" style=\"background-color:white;\"");				
				}
				newHTML = newHTML.concat(">").concat(dayList[day_idx].noOfBookings).concat("</b><br>");
				newHTML = newHTML.concat(day_idx_dummy);
				newHTML = newHTML.concat("</div></td>");
				if (day_idx_dummy==no_of_days){
					newHTML = newHTML.concat("</tr>");
					break;
				}
				if (day_idx<no_of_days-1) {
					day_idx++;
				}
			}
		}
		newHTML = newHTML.concat("</tr><tr id=\"calender_row\">");
	}

	document.getElementById("booking_table_dates").innerHTML = newHTML;
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
            var res_list = response.split(",");
            console.log("| res_list : ",res_list);
            for (var i = 0; i < res_list.length-1; i++) {
            	var stringDate = getStringDate(new Date(current_year,current_month,i+1))
            	var days = parseInt(res_list[i].match(/\d+/g).map(Number));
            	dayList.push(new Day(stringDate,days));			
            }
            console.log("| dayList : ",dayList);
        	updateUI(new Date(current_year,current_month));
        	document.getElementsByClassName("main")[0].classList.remove("disable_screen");    
        }
    };
    try {
    	xhr.send(query);
    }catch(err){
    	concole.log("API Error : ",err.message);
    	alert("Server not reachable!!");
    }	
}
function getData(date){
	document.getElementsByClassName("main")[0].classList.add("disable_screen");
	var month = date.getMonth();
	var year = date.getFullYear();
	executeAPI("getBookingsData()?".concat(month).concat(",").concat(year).concat(",").concat(getNoOfDays(month,year)));
	dayList = [];
}
function dateUTCtoGMT(date){
    var hour = date.getHours();
    var min = date.getMinutes();
    date.setHours(hour+5,min+30)
    return date;
}
window.onload = function(){
	updateMainUI();
	current_month = new Date().getMonth();
	current_year = new Date().getFullYear();
	getData(new Date());
	// console.log();
}
