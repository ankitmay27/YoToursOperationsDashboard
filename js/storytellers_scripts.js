var IDENTIFIER;
var getVSTData1APICalled = false;
var getASTData1APICalled = false;
var getASTData2APICalled = false;
var saveStorytellerAPICalled = false,editStorytellerAPICalled=false,deleteStorytellerAPICalled=false,getEditSTDataAPICalled=false;
var selectedCityID;
var selectedEligibilityIds = []
var selectedPCCValue;
var VST_tourtypes;
var VST_storytellers,currentList;
var tableHeaderHTML = "";
var selectedSTID,SAVED_ST_ID;
var RETRIEVED_ST;
var designation = localStorage.getItem("OE_designation");
    
function Tourtype(id,name){
    this.id = id;
    this.name = name;
}
function Storyteller(id,city,eligibility,name,DOB,recruitment,DOJ,POJ,PTF,PTP,allowance,email,phone,emergency_phone,address,education,blood_group,id_proof,id_proof_type,PCC,account_number,account_holder_name,ifsc_code,bank_name,branch,exp_level){
    this.id = id;
    this.name = name;
    this.city=city;
    this.DOB=DOB;
    this.recruitment=recruitment;
    this.DOJ=DOJ;
    this.POJ=POJ;
    this.PTF=PTF;
    this.PTP=PTP;
    this.allowance=allowance;
    this.email=email;
    this.phone=phone;
    this.emergency_phone = emergency_phone;
    this.address = address;
    this.education = education;
    this.blood_group = blood_group;
    this.id_proof = id_proof;
    this.id_proof_type = id_proof_type;
    this.PCC = PCC;
    this.account_number = account_number;
    this.account_holder_name = account_holder_name;
    this.ifsc_code = ifsc_code;
    this.bank_name = bank_name;
    this.branch = branch;
    this.exp_level = exp_level;
    this.getEligibility=function(){
        // console.log(eligibility);
        var temp = eligibility.substring(1,eligibility.length-1);
        var types = temp.split("|");
        if (types.length!=VST_tourtypes.length) {
            var altIdx = 0;
            for (var i = 0; i < VST_tourtypes.length; i++) {
                if (VST_tourtypes[i].id!=types[i]) {
                    types.splice(i, 0, "0");
                }
            }
        }
        return types;
    };
    this.eligibility = this.getEligibility();    
}
function editStoryteller(){
    var name = document.getElementById("name_input").value;  
    var dob = document.getElementById("DOB_input").value;    
    var recruitment = document.getElementById("recruitment_input").value;  
    var doj = document.getElementById("DOJ_input").value;  
    var poj = document.getElementById("POJ_input").value;    
    var ptf = document.getElementById("PTF_input").value;  
    var ptp = document.getElementById("PTP_input").value;  
    var allowance = document.getElementById("allowance_input").value;   
    var email = document.getElementById("email_input").value;  
    var phone = document.getElementById("phone_input").value;    
    var emergency_phone = document.getElementById("emergency_phone_input").value;    
    var address = document.getElementById("address_input").value;
    var addressSplit = address.split(",");
    address = "";
    for (var i = 0; i < addressSplit.length; i++) {
        address += addressSplit[i];
        address += "~";
    }   
    address = address.substring(0,address.length-1);
    var education = document.getElementById("education_input").value;    
    var blood_group = document.getElementById("blood_group_input").value;
    var id_proof_number = document.getElementById("id_proof_number_input").value;
    var id_proof_type = document.getElementById("id_proof_type_input").value;
    var PCC = document.getElementById("PCC_input").value;
    var account_number = document.getElementById("account_number_input").value;
    var account_holder_name = document.getElementById("account_holder_name_input").value;
    var ifsc_code = document.getElementById("ifsc_code_input").value;
    var bank_name = document.getElementById("bank_name_input").value;
    var branch = document.getElementById("branch_input").value;
    var exp_level = document.getElementById("exp_level_input").value;
    var eligibilityAPIData = "[";
    for (var i = 0; i < selectedEligibilityIds.length; i++) {
        eligibilityAPIData += selectedEligibilityIds[i].concat("|");
    }
    eligibilityAPIData = eligibilityAPIData.substring(0,eligibilityAPIData.length-1);
    eligibilityAPIData = eligibilityAPIData.concat("]");
    var query = "editStoryteller()?".concat(RETRIEVED_ST.id).concat(",").concat(selectedCityID).concat(",").concat(name).concat(",").concat(dob).concat(",").concat(recruitment);
    query = query.concat(",").concat(doj).concat(",").concat(poj).concat(",").concat(ptf).concat(",").concat(ptp).concat(",").concat(allowance);
    query = query.concat(",").concat(email).concat(",").concat(phone).concat(",").concat(emergency_phone).concat(",").concat(address);
    query = query.concat(",").concat(education).concat(",").concat(blood_group).concat(",").concat(id_proof_number).concat(",").concat(id_proof_type);
    query = query.concat(",").concat(PCC).concat(",").concat(account_number).concat(",").concat(account_holder_name).concat(",").concat(ifsc_code);
    query = query.concat(",").concat(bank_name).concat(",").concat(branch).concat(",").concat(exp_level).concat(",").concat(eligibilityAPIData);
    executeAPI(query);

    editStorytellerAPICalled = true;
}
function saveStoryteller(){
    var name = document.getElementById("name_input").value;  
    var dob = document.getElementById("DOB_input").value;    
    var recruitment = document.getElementById("recruitment_input").value;  
    var doj = document.getElementById("DOJ_input").value;  
    var poj = document.getElementById("POJ_input").value;    
    var ptf = document.getElementById("PTF_input").value;  
    var ptp = document.getElementById("PTP_input").value;  
    var allowance = document.getElementById("allowance_input").value;   
    var email = document.getElementById("email_input").value;  
    var phone = document.getElementById("phone_input").value;    
    var emergency_phone = document.getElementById("emergency_phone_input").value;    
    var address = document.getElementById("address_input").value;
    var addressSplit = address.split(",");
    address = "";
    for (var i = 0; i < addressSplit.length; i++) {
        address += addressSplit[i];
        address += "~";
    }   
    address = address.substring(0,address.length-1);
    var education = document.getElementById("education_input").value;    
    var blood_group = document.getElementById("blood_group_input").value;
    var id_proof_number = document.getElementById("id_proof_number_input").value;
    var id_proof_type = document.getElementById("id_proof_type_input").value;
    var PCC = document.getElementById("PCC_input").value;
    var account_number = document.getElementById("account_number_input").value;
    var account_holder_name = document.getElementById("account_holder_name_input").value;
    var ifsc_code = document.getElementById("ifsc_code_input").value;
    var bank_name = document.getElementById("bank_name_input").value;
    var branch = document.getElementById("branch_input").value;
    var exp_level = document.getElementById("exp_level_input").value;
    var eligibilityAPIData = "[";
    for (var i = 0; i < selectedEligibilityIds.length; i++) {
        eligibilityAPIData += selectedEligibilityIds[i].concat("|");
    }
    eligibilityAPIData = eligibilityAPIData.substring(0,eligibilityAPIData.length-1);
    eligibilityAPIData = eligibilityAPIData.concat("]");
    var query = "saveStoryteller()?".concat(selectedCityID).concat(",").concat(name).concat(",").concat(dob).concat(",").concat(recruitment);
    query = query.concat(",").concat(doj).concat(",").concat(poj).concat(",").concat(ptf).concat(",").concat(ptp).concat(",").concat(allowance);
    query = query.concat(",").concat(email).concat(",").concat(phone).concat(",").concat(emergency_phone).concat(",").concat(address);
    query = query.concat(",").concat(education).concat(",").concat(blood_group).concat(",").concat(id_proof_number).concat(",").concat(id_proof_type);
    query = query.concat(",").concat(PCC).concat(",").concat(account_number).concat(",").concat(account_holder_name).concat(",").concat(ifsc_code);
    query = query.concat(",").concat(bank_name).concat(",").concat(branch).concat(",").concat(exp_level).concat(",").concat(eligibilityAPIData);
    executeAPI(query);
    saveStorytellerAPICalled = true;
}
function saveSTClicked(){
    if (allInputsFilled()) {
        if (confirm("Are you sure ?")) {
            saveStoryteller();
            saveStorytellerAPIcalled = true;
        }
    }
}
function deleteSTClicked(){
    if (confirm("Are you sure you want to delete the storyteller?")) {
        document.getElementsByClassName("main")[0].classList.add("disable_screen"); 
        executeAPI("deletestoryteller()?".concat(selectedSTID));
        deleteStorytellerAPICalled = true;
    }
}
function editSTClicked(){
    if (confirm("Are you sure you want to edit the inventory item ?")) {
        document.getElementsByClassName("main")[0].classList.add("disable_screen"); 
        executeAPI("getEditSTData()?".concat(selectedSTID));
        getEditSTDataAPICalled = true;
        RETRIEVED_ST = null;
    }
}
function addStorytellerClicked(identifier){
    IDENTIFIER = identifier;
    SAVED_ST_ID = null;
    selectedSTID = null;
    getASTData1APICalled = true;
    initializeASTTable();
    document.getElementsByClassName("main")[0].classList.add("disable_screen");
    executeAPI("getASTData1()");
}
function viewStorytellerClicked(){
    SAVED_ST_ID = null;
    selectedSTID = null;
    document.getElementById("save_button").style.visibility = "hidden";
    document.getElementById("edit_button").style.visibility = "hidden";
    document.getElementById("delete_button").style.visibility = "hidden";
    
    document.getElementsByClassName("main")[0].classList.add("disable_screen"); 
    executeAPI("getVSTData1()");
    getVSTData1APICalled = true;
}

function storeTypes(response){
    response = response.split(":")[1];
    response = response.substring(0,response.length-1);
    var resList = response.split(";");
    VST_tourtypes = []
    for (var i = 0; i < resList.length; i++) {
        resList[i] = resList[i].substring(1,resList[i].length-1);
        var data = resList[i].split(",");
        VST_tourtypes.push(new Tourtype(data[0],data[1]));
    }

    var eligibilityHTML1 = "<th> ELIGIBILITY </th>";
    var eligibilityHTML2 = "<th><input onchange=\"FilterChanged(this.id)\" id=\"eligibility_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"eligibility_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th>";
    document.getElementById("st_page").innerHTML = "<table class=\"table\" style=\"background-color: #e1e1e1;\" id=\"st_details_table\"><tr><th>CITY</th>".concat(eligibilityHTML1).concat("<th>NAME</th><th>DOB</th><th>RECRUITMENT LOCATION</th><th>DOJ</th><th>PERIOD</th><th>PER TOUR FEE</th><th>PAID TOUR %</th><th>ALLOWANCE</th><th>EMAIL</th><th>PHONE</th><th>EMERGENCY CONTACT</th><th>LOCAL ADDRESS</th><th>EDUCATION</th><th>BLOOD GROUP</th><th>ID PROOF</th><th>ID PROOF TYPE</th><th>PCC</th><th>ACCOUNT NUMBER</th><th>ACCOUNT HOLDER NAME</th><th>IFSC CODE</th><th>BANK NAME</th><th>BRANCH</th><th>EXPERIENCE LEVEL</th></tr><tr><th><input onchange=\"FilterChanged(this.id)\" id=\"city_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"city_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th>").concat(eligibilityHTML2).concat("<th><input onchange=\"FilterChanged(this.id)\" id=\"name_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"name_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"DOB_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"DOB_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"recruitment_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"recruitment_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"DOJ_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"DOJ_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"period_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"period_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"PTF_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"PTF_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"PTP_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"PTP_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"allowance_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"allowance_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"email_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"email_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"phonefilter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"phone_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"emergency_phone_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"emergency_phone_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"address_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"address_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"education_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"education_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"blood_group_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"blood_group_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"id_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"id_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"id_type_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"id_type_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"PCC_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"PCC_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"account_number_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"account_number_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"account_holder_name_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"account_holder_name_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"account_holder_name_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"ifsc_code_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"bank_name_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"bank_name_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"branch_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"branch_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th><th><input onchange=\"FilterChanged(this.id)\" id=\"exp_level_filter\" type=\"text\" placeholder=\"Search\"><img onclick=\"sortChanged(this.id,this.src)\" id=\"exp_level_sort\" value=\"down\" src=\"image/white_down_arrow.png\"></th></tr></table>");  
    tableHeaderHTML = document.getElementById("st_page").innerHTML;

    console.log("Tourtypes recieved!! -----------------> ",VST_tourtypes);
}
function parseStorytellers(stData){
    VST_storytellers = []
    currentList = []
    stData = stData.split(":")[1];
    stData = stData.substring(0,stData.length-1);
    var stDataSplit = stData.split(";");
    
    for (var i = 0; i < stDataSplit.length; i++) {
        var storyteller = stDataSplit[i].substring(1,stDataSplit[i].length-1).split(",");
        var eligibility = storyteller[25];
        VST_storytellers.push(new Storyteller(storyteller[0],storyteller[2],eligibility,storyteller[1],storyteller[3],storyteller[4],storyteller[5],storyteller[6],storyteller[7],storyteller[8],storyteller[9],storyteller[10],storyteller[11],storyteller[12],storyteller[13],storyteller[14],storyteller[15],storyteller[16],storyteller[17],storyteller[18],storyteller[19],storyteller[20],storyteller[21],storyteller[22],storyteller[23],storyteller[24]));
    }
}
function getTourtypeFromId(id,list){
    for (var i = 0; i < list.length; i++) {
        if (list[i].id==id) {
            return list[i].name;
        }
    }
    return null
}
function VSTRowClicked(id){
    if (designation=="Super User") {
        if (selectedSTID!=null){
            document.getElementById("stRow_".concat(selectedSTID)).style.backgroundColor = "#e1e1e1";
            document.getElementById("stRow_".concat(selectedSTID)).style.color = "#000000";
        }
        selectedSTID = id.split("_")[1];     
        document.getElementById(id).style.backgroundColor = "#696969";
        document.getElementById(id).style.color = "#ffffff";
        document.getElementById("button_box").style.visibility = "visible"
        document.getElementById("save_button").style.visibility = "hidden";
        document.getElementById("edit_st_button").style.visibility = "hidden";
        document.getElementById("edit_button").style.visibility = "visible";
        document.getElementById("delete_button").style.visibility = "visible";          
        console.log("Clicked Storyteller id : ",selectedSTID);
    }
}
function initializeASTTable(){
    document.getElementById("st_page").innerHTML = "<ul><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>CITY OF OPERATION</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><select onchange=\"cityChanged()\" id=\"city_input\" type=\"text\" placeholder=\"&nbsp;\"><option value=\"0\" selected disabled>SELECT CITY</option></select></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>ELIGIBILITY FOR TOURTYPES</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><select onchange=\"eligibilityChanged(this)\" id=\"eligibility_input\" type=\"text\" placeholder=\"&nbsp;\" multiple size=\"5\"></select></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>FULL NAME OF STORYTELLER (AS PER ID PROOF)</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input placeholder=\"&nbsp;Enter Name\" id=\"name_input\" type=\"text\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>D.O.B. (AS PER ID PROOF)</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input id=\"DOB_input\" type=\"date\" placeholder=\"&nbsp;\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>RECRUITED FROM</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input id=\"recruitment_input\" type=\"text\" placeholder=\"&nbsp;Enter Recruitment Info\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>DATE OF JOINING (RECEIVING SIGNED MOA)</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input id=\"DOJ_input\" type=\"date\" placeholder=\"&nbsp;\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>PERIOD OF JOINING</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input id=\"POJ_input\" type=\"text\" placeholder=\"&nbsp;Enter Period\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>PER TOUR FEE (MOA TERMS)</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input value=\"0\" id=\"PTF_input\" type=\"number\" placeholder=\"&nbsp;\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>PAID TOUR % (MOA TERMS)</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input value=\"0\" id=\"PTP_input\" type=\"number\" placeholder=\"&nbsp;\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>CONVEYANCE ALLOWANCE</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input value=\"0\" id=\"allowance_input\" type=\"number\" placeholder=\"&nbsp;\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>E MAIL ID</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input id=\"email_input\" onchange=\"emailChanged()\" type=\"text\" placeholder=\"&nbsp;Enter Email ID\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>PHONE NUMBER</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input id=\"phone_input\" onchange=\"phoneChanged()\" type=\"number\" placeholder=\"&nbsp;Enter Phone No.\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>EMERGENCY CONTACT NO.</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input id=\"emergency_phone_input\" onchange=\"emergencyPhoneChanged()\" type=\"number\" placeholder=\"&nbsp;Enter Emergency Contact Number\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>LOCAL ADDRESS</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input id=\"address_input\" type=\"text\" placeholder=\"&nbsp;Enter Local Address\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>EDUCATION</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input id=\"education_input\" type=\"text\" placeholder=\"&nbsp;Enter Education Info.\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>BLOOD GROUP</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input id=\"blood_group_input\" type=\"text\" placeholder=\"&nbsp;Enter Blood Group\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>ID PROOF NUMBER</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input id=\"id_proof_number_input\" type=\"text\" placeholder=\"&nbsp;Enter ID PROOF NUMBER\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>ID PROOF TYPE</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input id=\"id_proof_type_input\" type=\"text\" placeholder=\"&nbsp;Enter ID PROOF TYPE\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>POLICE CLEARANCE CERTIFICATE</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><select onchange=\"PCCChanged(this.value)\" id=\"PCC_input\" type=\"text\" placeholder=\"&nbsp;\"><option value=\"0\" selected disabled>SELECT</option><option value=\"pending\">PENDING</option><option value=\"obtained\">OBTAINED</option></select></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>ACCOUNT NUMBER</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input id=\"account_number_input\" type=\"text\" placeholder=\"&nbsp;Enter Account Number\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>ACCOUNT HOLDER NAME</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input id=\"account_holder_name_input\" type=\"text\" placeholder=\"&nbsp;Account Holder Name\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>IFSC CODE</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input id=\"ifsc_code_input\" type=\"text\" placeholder=\"&nbsp;Enter IFSC Code\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>BANK NAME</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input id=\"bank_name_input\" type=\"text\" placeholder=\"&nbsp;Enter Bank Name\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>BRANCH</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><input id=\"branch_input\" type=\"text\" placeholder=\"&nbsp;Enter Branch\"></div></div></li><li><div class=\"row\"><div style=\"text-align: left;\" class=\"col-md-5 col-sm-5 col-xs-6 col-6\"><span>EXPERIENCE LEVEL</span></div><div style=\"text-align: left;\" class=\"col-md-7 col-sm-7 col-xs-6 col-6\"><select onchange=\"expLevelChanged(this.value)\" id=\"exp_level_input\" type=\"text\" placeholder=\"&nbsp;\"><option value=\"0\" selected>untrained</option><option value=\"1\">Go GUIDE 1</option><option value=\"2\">Go GUIDE 2</option><option value=\"3\">Go GUIDE 3</option><option value=\"4\">Go GUIDE PRO 1</option><option value=\"5\">Go GUIDE PRO 2</option></select></div></div></li></ul>";
    if (IDENTIFIER == "ADD") {
        document.getElementById("save_button").style.visibility = "visible";
        document.getElementById("edit_st_button").style.visibility = "hidden";
        disableAllInputs();
    }else if(IDENTIFIER == "EDIT"){
        document.getElementById("save_button").style.visibility = "hidden";
        document.getElementById("edit_st_button").style.visibility = "visible";
    }
    document.getElementById("edit_button").style.visibility = "hidden";
    document.getElementById("delete_button").style.visibility = "hidden";
}
function setVSTTable(stList){
    console.log("Updating UI!! list : ",stList);
    var extraHTML=tableHeaderHTML;
    for (var i = 0; i < stList.length; i++) {
        extraHTML += "<tr onclick=\"VSTRowClicked(this.id)\" id=\"stRow_".concat(stList[i].id).concat("\">");
        var eligibility = stList[i].eligibility;
        extraHTML += "<td>".concat(stList[i].city).concat("</td>");

        extraHTML += "<td>";                
        for (var k = 0; k < eligibility.length; k++) {
            var type = getTourtypeFromId(eligibility[k],VST_tourtypes);
            if (type!=null) {
                extraHTML += type.concat(" ,\n");
            }
        }
        extraHTML = extraHTML.substring(0,extraHTML.length-2);
        extraHTML += "</td>";
        
        extraHTML += "<td>".concat(stList[i].name).concat("</td>");
        extraHTML += "<td>".concat(stList[i].DOB).concat("</td>");
        extraHTML += "<td>".concat(stList[i].recruitment).concat("</td>");
        extraHTML += "<td>".concat(stList[i].DOJ).concat("</td>");
        extraHTML += "<td>".concat(stList[i].POJ).concat("</td>");
        extraHTML += "<td>".concat(stList[i].PTF).concat("</td>");
        extraHTML += "<td>".concat(stList[i].PTP).concat("</td>");
        extraHTML += "<td>".concat(stList[i].allowance).concat("</td>");
        extraHTML += "<td>".concat(stList[i].email).concat("</td>");
        extraHTML += "<td>".concat(stList[i].phone).concat("</td>");
        extraHTML += "<td>".concat(stList[i].emergency_phone).concat("</td>");
        extraHTML += "<td>".concat(stList[i].address).concat("</td>");
        extraHTML += "<td>".concat(stList[i].education).concat("</td>");
        extraHTML += "<td>".concat(stList[i].blood_group).concat("</td>");
        extraHTML += "<td>".concat(stList[i].id_proof).concat("</td>");
        extraHTML += "<td>".concat(stList[i].id_proof_type).concat("</td>");
        extraHTML += "<td>".concat(stList[i].PCC).concat("</td>");
        extraHTML += "<td>".concat(stList[i].account_number).concat("</td>");
        extraHTML += "<td>".concat(stList[i].account_holder_name).concat("</td>");
        extraHTML += "<td>".concat(stList[i].ifsc_code).concat("</td>");
        extraHTML += "<td>".concat(stList[i].bank_name).concat("</td>");
        extraHTML += "<td>".concat(stList[i].branch).concat("</td>");
        var exp_level="";
        switch(stList[i].exp_level){
            case "0":
                exp_level = "untrained";
                break;
            case "1":
                exp_level = "GO GUIDE 1";
                break;
            case "2":
                exp_level = "GO GUIDE 2";
                break;
            case "3":
                exp_level = "GO GUIDE 3";
                break;
            case "4":
                exp_level = "GO GUIDE PRO 1";
                break;
            case "5":
                exp_level = "GO GUIDE PRO 2";
                break;
        }
        extraHTML += "<td>".concat(exp_level).concat("</td>");
        extraHTML += "</tr>";
        // console.log("||-----> Testing : ",extraHTML,"\n\n");
    }
    document.getElementById("st_details_table").innerHTML = extraHTML;  
}
function FilterChanged(id){
    var field = id.split("_")[0];
    var tempList = [];
    var initial_filter_value = "";
    var valid = true;
    if (field=="city") {
        var value = document.getElementById("city_filter").value.toLowerCase();
        initial_filter_value = value;
        for (var i = 0; i < VST_storytellers.length; i++) {
            var city = VST_storytellers[i].city.toLowerCase();
            if(city.includes(value)){
                tempList.push(VST_storytellers[i]);
            }
        }
    }else if (field=="name") {
        var value = document.getElementById("name_filter").value.toLowerCase();
        initial_filter_value = value;
        for (var i = 0; i < VST_storytellers.length; i++) {
            var name = VST_storytellers[i].name.toLowerCase();
            if(name.includes(value)){
                tempList.push(VST_storytellers[i]);
            }
        }        
    }else if (field=="PCC") {
        var value = document.getElementById("PCC_filter").value.toLowerCase();
        initial_filter_value = value;
        for (var i = 0; i < VST_storytellers.length; i++) {
            var PCC = VST_storytellers[i].PCC.toLowerCase();
            if(PCC.includes(value)){
                tempList.push(VST_storytellers[i]);
            }
        }        
    }else if (field=="DOJ") {
        var value = document.getElementById("DOJ_filter").value;
        initial_filter_value = value;
        for (var i = 0; i < VST_storytellers.length; i++) {
            var DOJ = VST_storytellers[i].DOJ;
            console.log("Testing -----------------> ", value,DOJ);
            if(DOJ.includes(value)){
                tempList.push(VST_storytellers[i]);
            }
        }        
    }else{
        valid = false;
    }
    if (!valid) {
        setVSTTable(VST_storytellers);
    }else{
        setVSTTable(tempList);
        currentList = tempList;
    }
    VST_storytellers = currentList;
    document.getElementById(id).value = initial_filter_value;   
}
function sortChanged(id,src){
    console.log("Sorting Changed !",id);
    var tempList = currentList;
    var source = src.toString();
    if(source.includes("white_down_arrow")){
        for (var i = 0; i < tempList.length-1; i++) {
            var cur,next;
            if(id.includes("city")){
                cur = tempList[i].city;
                for (var j = i+1; j < tempList.length; j++) {
                    next = tempList[j].city;
                    if( cur.localeCompare(next) > 0 ){
                        var xxx = tempList[i];
                        tempList[i] = tempList[j];
                        tempList[j] = xxx;
                    }
                }
            }else if(id.includes("name")){
                cur = tempList[i].name;
                for (var j = i+1; j < tempList.length; j++) {
                    next = tempList[j].name;
                    if( cur.localeCompare(next) > 0 ){
                        var xxx = tempList[i];
                        tempList[i] = tempList[j];
                        tempList[j] = xxx;
                    }
                }
            }else if(id.includes("PCC")){
                cur = tempList[i].PCC;
                for (var j = i+1; j < tempList.length; j++) {
                    next = tempList[j].PCC;
                    if( cur.localeCompare(next) > 0 ){
                        var xxx = tempList[i];
                        tempList[i] = tempList[j];
                        tempList[j] = xxx;
                    }
                }                    
            }else if(id.includes("DOJ")){
                cur = tempList[i].DOJ;
                for (var j = i+1; j < tempList.length; j++) {
                    next = tempList[j].DOJ;
                    if( cur.localeCompare(next) > 0 ){
                        var xxx = tempList[i];
                        tempList[i] = tempList[j];
                        tempList[j] = xxx;
                    }
                }                    
            }  
        }
        setVSTTable(tempList);
        document.getElementById(id).src = "image/white_up_arrow.png";
    }else if(source.includes("white_up_arrow")){
        for (var i = 0; i < tempList.length-1; i++) {
            var cur,next;
            if(id.includes("city")){
                cur = tempList[i].city;
                for (var j = i+1; j < tempList.length; j++) {
                    next = tempList[j].city;
                    if( cur.localeCompare(next) < 0 ){
                        var xxx = tempList[i];
                        tempList[i] = tempList[j];
                        tempList[j] = xxx;
                    }
                }
            }else if(id.includes("name")){
                cur = tempList[i].name;
                for (var j = i+1; j < tempList.length; j++) {
                    next = tempList[j].name;
                    if( cur.localeCompare(next) < 0 ){
                        var xxx = tempList[i];
                        tempList[i] = tempList[j];
                        tempList[j] = xxx;
                    }
                }
            }else if(id.includes("PCC")){
                cur = tempList[i].PCC;
                for (var j = i+1; j < tempList.length; j++) {
                    next = tempList[j].PCC;
                    if( cur.localeCompare(next) < 0 ){
                        var xxx = tempList[i];
                        tempList[i] = tempList[j];
                        tempList[j] = xxx;
                    }
                }                    
            }else if(id.includes("DOJ")){
                cur = tempList[i].DOJ;
                for (var j = i+1; j < tempList.length; j++) {
                    next = tempList[j].DOJ;
                    if( cur.localeCompare(next) < 0 ){
                        var xxx = tempList[i];
                        tempList[i] = tempList[j];
                        tempList[j] = xxx;
                    }
                }                    
            }  
        }         
        setVSTTable(tempList);
        document.getElementById(id).src = "image/white_down_arrow.png";
    }
}
function cityChanged(){
    selectedCityID = parseInt(document.getElementById("city_input").value);
    console.log("Changed City Id : ",selectedCityID);       
    // if(IDENTIFIER=="ADD"){
        document.getElementsByClassName("main")[0].classList.add("disable_screen");
        executeAPI("getASTData2()?".concat(selectedCityID));
        getASTData2APICalled = true;
    // }
}
function eligibilityChanged(select){
    if (document.getElementById("name_input").disabled) {
        enableAllInputs();
    }   
    var temp = select.id.split("_")[0]; 
    var type_id = parseInt(temp.substring(8,temp.length))
    selectedEligibilityIds = getSelectValues(select);
    console.log("||------> Selected ids : ",selectedEligibilityIds); 
}
function PCCChanged(value){
    selectedPCCValue = value;
    console.log("||------> PCC changed : ",selectedPCCValue);
}
function emailChanged(){
    selectedEmail = document.getElementById("email_input").value;
    console.log("Guest Email : ",selectedEmail);
    if (IDENTIFIER=="ADD") {
        if (selectedEmail.split("@").length==2) { //validating  Email
            var correct = false;
            if (selectedEmail.split("@")[1].split(".").length==2 || selectedEmail.split(".").length==3) {
                correct = true;  
            }
            if(!correct){
                alert("Email format is not correct!!");
                document.getElementById("email_input").value = null;
            }
        }else{
            alert("Email format is not correct!!");
            document.getElementById("email_input").value = null;
        }
    }
}
function phoneChanged(){
    selectedPhone = document.getElementById("phone_input").value;
    console.log("Phone changed : ",selectedPhone);
    if (IDENTIFIER=="ADD") {
        if (selectedPhone.length!=10) {
            alert("Phone No. must be 10 digit long!!");
            document.getElementById("phone_input").value = null;
        }
    }
}
function emergencyPhoneChanged(){
    selectedPhone = document.getElementById("emergency_phone_input").value;
    console.log("Emergency Phone changed : ",selectedPhone);
    if (IDENTIFIER=="ADD") {
        if (selectedPhone.length!=10) {
            alert("Phone No. must be 10 digit long!!");
            document.getElementById("emergency_phone_input").value = null;
        }
    }
}
function enableInput(id){
    document.getElementById(id).disabled = false;
    document.getElementById(id).style.backgroundColor = "#ffffff";  
}
function disableInput(id){
    document.getElementById(id).disabled = true;
    document.getElementById(id).style.backgroundColor = "#e8e8e8";  
}
function enableAllInputs(){
    document.getElementById("city_input").disabled = false;  
    document.getElementById("name_input").disabled = false;  
    document.getElementById("DOB_input").disabled = false;    
    document.getElementById("recruitment_input").disabled = false;  
    document.getElementById("DOJ_input").disabled = false;  
    document.getElementById("POJ_input").disabled = false;    
    document.getElementById("PTF_input").disabled = false;  
    document.getElementById("PTP_input").disabled = false;  
    document.getElementById("allowance_input").disabled = false;   
    document.getElementById("email_input").disabled = false;  
    document.getElementById("phone_input").disabled = false;    
    document.getElementById("emergency_phone_input").disabled = false;    
    document.getElementById("address_input").disabled = false;   
    document.getElementById("education_input").disabled = false;    
    document.getElementById("blood_group_input").disabled = false;
    document.getElementById("id_proof_number_input").disabled = false;
    document.getElementById("id_proof_type_input").disabled = false;
    document.getElementById("PCC_input").disabled = false;
    document.getElementById("account_number_input").disabled = false;
    document.getElementById("account_holder_name_input").disabled = false;
    document.getElementById("ifsc_code_input").disabled = false;
    document.getElementById("bank_name_input").disabled = false;
    document.getElementById("branch_input").disabled = false;
    document.getElementById("exp_level_input").disabled = false;

    document.getElementById("city_input").style.backgroundColor = "#ffffff";    
    document.getElementById("name_input").style.backgroundColor = "#ffffff";
    document.getElementById("DOB_input").style.backgroundColor = "#ffffff";
    document.getElementById("recruitment_input").style.backgroundColor = "#ffffff";
    document.getElementById("DOJ_input").style.backgroundColor = "#ffffff";
    document.getElementById("POJ_input").style.backgroundColor = "#ffffff";
    document.getElementById("PTF_input").style.backgroundColor = "#ffffff";
    document.getElementById("PTP_input").style.backgroundColor = "#ffffff";
    document.getElementById("allowance_input").style.backgroundColor = "#ffffff";
    document.getElementById("email_input").style.backgroundColor = "#ffffff";
    document.getElementById("phone_input").style.backgroundColor = "#ffffff";
    document.getElementById("emergency_phone_input").style.backgroundColor = "#ffffff";
    document.getElementById("address_input").style.backgroundColor = "#ffffff";
    document.getElementById("education_input").style.backgroundColor = "#ffffff";
    document.getElementById("blood_group_input").style.backgroundColor = "#ffffff";
    document.getElementById("id_proof_number_input").style.backgroundColor = "#ffffff";
    document.getElementById("id_proof_type_input").style.backgroundColor = "#ffffff";
    document.getElementById("PCC_input").style.backgroundColor = "#ffffff";
    document.getElementById("account_number_input").style.backgroundColor = "#ffffff";
    document.getElementById("account_holder_name_input").style.backgroundColor = "#ffffff";
    document.getElementById("ifsc_code_input").style.backgroundColor = "#ffffff";
    document.getElementById("bank_name_input").style.backgroundColor = "#ffffff";
    document.getElementById("branch_input").style.backgroundColor = "#ffffff";
    document.getElementById("exp_level_input").style.backgroundColor = "#ffffff";
}
function disableAllInputs(){
    document.getElementById("city_input").disabled = true;  
    document.getElementById("eligibility_input").disabled = true;  
    document.getElementById("name_input").disabled = true;  
    document.getElementById("DOB_input").disabled = true;    
    document.getElementById("recruitment_input").disabled = true;  
    document.getElementById("DOJ_input").disabled = true;  
    document.getElementById("POJ_input").disabled = true;    
    document.getElementById("PTF_input").disabled = true;  
    document.getElementById("PTP_input").disabled = true;  
    document.getElementById("allowance_input").disabled = true;   
    document.getElementById("email_input").disabled = true;  
    document.getElementById("phone_input").disabled = true;    
    document.getElementById("emergency_phone_input").disabled = true;    
    document.getElementById("address_input").disabled = true;   
    document.getElementById("education_input").disabled = true;    
    document.getElementById("blood_group_input").disabled = true;
    document.getElementById("id_proof_number_input").disabled = true;
    document.getElementById("id_proof_type_input").disabled = true;
    document.getElementById("PCC_input").disabled = true;
    document.getElementById("account_number_input").disabled = false;
    document.getElementById("account_holder_name_input").disabled = false;
    document.getElementById("ifsc_code_input").disabled = false;
    document.getElementById("bank_name_input").disabled = false;
    document.getElementById("branch_input").disabled = false;
    document.getElementById("exp_level_input").disabled = false;

    document.getElementById("city_input").style.backgroundColor = "#e8e8e8";    
    document.getElementById("eligibility_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("name_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("DOB_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("recruitment_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("DOJ_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("POJ_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("PTF_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("PTP_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("allowance_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("email_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("phone_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("emergency_phone_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("address_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("education_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("blood_group_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("id_proof_number_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("id_proof_type_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("PCC_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("account_number_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("account_holder_name_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("ifsc_code_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("bank_name_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("branch_input").style.backgroundColor = "#e8e8e8";
    document.getElementById("exp_level_input").style.backgroundColor = "#e8e8e8";
}
function allInputsFilled(){
    var name = document.getElementById("name_input").value;  
    var dob = document.getElementById("DOB_input").value;    
    var eligibility = document.getElementById("eligibility_input").value;
    var recruitment = document.getElementById("recruitment_input").value;  
    var doj = document.getElementById("DOJ_input").value;  
    var poj = document.getElementById("POJ_input").value;    
    var ptf = document.getElementById("PTF_input").value;  
    var ptp = document.getElementById("PTP_input").value;  
    var allowance = document.getElementById("allowance_input").value;   
    var email = document.getElementById("email_input").value;  
    var phone = document.getElementById("phone_input").value;    
    var emergency_phone = document.getElementById("emergency_phone_input").value;    
    var address = document.getElementById("address_input").value;   
    var education = document.getElementById("education_input").value;    
    var blood_group = document.getElementById("blood_group_input").value;
    var id_proof_number = document.getElementById("id_proof_number_input").value;
    var id_proof_type = document.getElementById("id_proof_type_input").value;
    var PCC = document.getElementById("PCC_input").value;
    var account_number = document.getElementById("account_number_input").value;
    var account_holder_name = document.getElementById("account_holder_name_input").value;
    var ifsc_code = document.getElementById("ifsc_code_input").value;
    var bank_name = document.getElementById("bank_name_input").value;
    var branch_input = document.getElementById("branch_input").value;
    
    var filled = true;
    
    if( selectedCityID==null){
        alert("Select city !!");
        filled = false;
    }else if(eligibility.length<=0){
        alert("Select atleast 1 tourtype for which the storyteller is eligible!!");
        filled = false;
    }else if(name.length<=0){
        alert("Name cannot be empty!!");
        filled = false;
    }else if(dob.length<=0){
        alert("Select Date Of Birth !!");
        filled = false;
    }else if(recruitment.length<=0){
        alert("Fill recruitment info.!!");
        filled = false;
    }else if(poj.length<=0){
        alert("Enter correct Period of Joining!!");
        filled = false;
    }else if(parseInt(ptf)<0){
        alert("Enter correct Per Tour Fee!!");
        filled = false;
    }else if(parseInt(ptp)<0){
        alert("Enter correct Paid tour %!!");
        filled = false;
    }else if(parseInt(allowance)<0){
        alert("Enter correct Period of Joining!!");
        filled = false;
    }else if(email.length<=0){
        alert("Fill email!!");
        filled = false;
    }else if(phone.length<=0){
        alert("Fill Phone number !!");
        filled = false;
    }else if(emergency_phone.length<=0){
        alert("Fill Emergency Contact Number !!");
        filled = false;
    }else if(address.length<=0){
        alert("Fill Address!!");
        filled = false;
    }else if(education.length<=0){
        alert("Fill Education Info!!");
        filled = false;
    }else if(blood_group.length<=0){
        alert("Fill blood group info!!");
        filled = false;
    }else if(id_proof_number.length<=0){
        alert("Fill ID Proof number!!");
        filled = false;
    }else if(id_proof_type.length<=0){
        alert("Fill ID proof type!!");
        filled = false;
    }else if(PCC.length<=0){
        alert("Select Police Clearance certificate Status !!");
        filled = false;
    }else if(account_number.length<=0){
        alert("Fill Bank Details !!");
        filled = false;
    }else if(account_holder_name.length<=0){
        alert("Fill Bank Details !!");
        filled = false;
    }else if(ifsc_code.length<=0){
        alert("Fill Bank Details !!");
        filled = false;
    }else if(bank_name.length<=0){
        alert("Fill Bank Details !!");
        filled = false;
    }else if(branch_input.length<=0){
        alert("Fill Bank Details !!");
        filled = false;
    }

    return filled;
}
function setDataDropDown(identifier,response){
    console.log("Response : ",response)
    
    var temp = response.split(":")[1];
    
    temp = temp.substring(0,temp.length-1); //just removing '}' character
    var res_list = temp.split(";");//data[i]
    var extraHTML = "";
    if(identifier == "city"){
        extraHTML = "<option value=\"0\" selected disabled>SELECT CITY</option>";
    }else if(identifier.includes("tourtype")){
        extraHTML = "<option value=\"0\" disabled>SELECT TOURTYPE ( Hold SHIFT/CTRL/COMMAND to select multiple )</option>";
    }
    console.log("|---------> res_list : ",res_list)
    for (var i = 0; i < res_list.length; i++) {
        var id = parseInt(res_list[i].split(",")[0].match(/\d+/g).map(Number))
        var name = res_list[i].split(",")[1];
        name = name.substring(0,name.length-1);
        extraHTML += "<option value=\"".concat(id).concat("\">").concat(name).concat("</option>");     
    }
    console.log("|---------> extraHTML : ",extraHTML)

    if(identifier == "city"){
        document.getElementById("city_input").innerHTML = extraHTML; 
    }else if(identifier.includes("tourtype")){
        document.getElementById("eligibility_input").innerHTML = extraHTML;        
    }
}
function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i=0,iLen=options.length; i<iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
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
            if (getASTData1APICalled) {
                if (response != "[]") {
                    setDataDropDown("city",response);
                    enableInput("city_input");
                }else{
                    alert("First include some inventory items in CREATE INVENTORY !!");
                }
                if (IDENTIFIER=="EDIT") {
                    document.getElementById("city_input").value = RETRIEVED_ST.city;
                    cityChanged();
                }
                getASTData1APICalled = false;
            }else if(getASTData2APICalled){
                setDataDropDown("tourtype",response);
                enableInput("eligibility_input");       
                getASTData2APICalled = false;
                if (IDENTIFIER=="EDIT") {
                    document.getElementById("name_input").value = RETRIEVED_ST.name;
                    document.getElementById("DOB_input").value = RETRIEVED_ST.DOB;
                    document.getElementById("recruitment_input").value = RETRIEVED_ST.recruitment;
                    document.getElementById("DOJ_input").value = RETRIEVED_ST.DOJ;
                    document.getElementById("POJ_input").value = RETRIEVED_ST.POJ;
                    document.getElementById("PTF_input").value = RETRIEVED_ST.PTF;
                    document.getElementById("PTP_input").value = RETRIEVED_ST.PTP;
                    document.getElementById("allowance_input").value = RETRIEVED_ST.allowance;
                    document.getElementById("email_input").value = RETRIEVED_ST.email;
                    document.getElementById("phone_input").value = RETRIEVED_ST.phone;
                    document.getElementById("emergency_phone_input").value = RETRIEVED_ST.emergency_phone;
                    document.getElementById("address_input").value = RETRIEVED_ST.address;
                    document.getElementById("education_input").value = RETRIEVED_ST.education;
                    document.getElementById("blood_group_input").value = RETRIEVED_ST.blood_group;
                    document.getElementById("id_proof_number_input").value = RETRIEVED_ST.id_proof_number;
                    document.getElementById("id_proof_type_input").value = RETRIEVED_ST.id_proof_type;
                    document.getElementById("PCC_input").value = RETRIEVED_ST.PCC;
                    document.getElementById("account_number_input").value = RETRIEVED_ST.account_number;
                    document.getElementById("account_holder_name_input").value = RETRIEVED_ST.account_holder_name;
                    document.getElementById("ifsc_code_input").value = RETRIEVED_ST.ifsc_code;
                    document.getElementById("bank_name_input").value = RETRIEVED_ST.bank_name;
                    document.getElementById("branch_input").value = RETRIEVED_ST.branch;
                    document.getElementById("exp_level_input").value = RETRIEVED_ST.exp_level;
                    var eligible_types = RETRIEVED_ST.eligibility;
                    var test = document.getElementById("eligibility_input").innerHTML.split("</option>");//strEligibility.concat("]");
                    var eligibilityHTMLElement = document.getElementById("eligibility_input").childNodes;
                    console.log(eligibilityHTMLElement,test,eligible_types);

                    var HTML=test[0].concat("</option>");
                    for (var i = 1; i < eligibilityHTMLElement.length; i++) { // 0 is <option> SELECT TOURTYPE </option>
                        var idx = eligible_types.indexOf(eligibilityHTMLElement[i].value); //returns int
                        console.log("Testing :---------> ",parseInt(idx));
                        if (idx>=0) {
                            HTML += test[i].substring(0,8).concat("selected ");
                            HTML += test[i].substring(8,test[i].length).concat("</option>");                            
                        }else{
                            HTML += test[i].concat("</option>");                            
                        }
                    }
                    document.getElementById("eligibility_input").innerHTML = HTML;
                    eligibilityChanged(document.getElementById("eligibility_input"));
                }
            }else if (getVSTData1APICalled){
                console.log(response);
                if (response != "[]") {
                    res_list = response.split(">");
                    var stData = res_list[0].substring(1,res_list[0].length);
                    var typeData = res_list[1];
                    storeTypes(typeData);
                    parseStorytellers(stData);
                    currentList = VST_storytellers;
                    setVSTTable(VST_storytellers);
                    console.log("VST_storytellers : ",VST_storytellers);
                }else{
                    alert("First include some storytellers in ADD STORYTELLER !!");
                }
                getVSTData1APICalled = false;
            }else if (saveStorytellerAPICalled){
                if (response=="API executed successfully"){
                    alert("Storyteller Saved!!");
                    window.location.reload();
                }                
                saveStorytellerAPIcalled = false;
            }else if (editStorytellerAPICalled){
                if (response=="API executed successfully"){
                    alert("Storyteller Edited!!");
                    window.location.reload();
                }                
                editStorytellerAPICalled = false;
            }else if (deleteStorytellerAPICalled){
                if (response=="API executed successfully"){
                    alert("Storyteller Deleted!!");
                    // document.getElementById("save_button").style.visibility = "hidden"
                    viewStorytellerClicked();
                }else{
                    alert(response);
                }                
                deleteStorytellerAPICalled = false;
            }else if (getEditSTDataAPICalled) {
                if (response != "[]") {
                    response = response.split(":")[1];
                    response = response.substring(1,response.length-2);
                    var resList  = response.split(",");
                    console.log(" RETRIEVED_ST : ",resList);
                    SAVED_ST_ID = resList[0];
                    var name = resList[1];
                    var city_id = resList[2];
                    var DOB = resList[3];
                    var recruitment = resList[4];
                    var DOJ = resList[5];
                    var POJ = resList[6];
                    var PTF = resList[7];
                    var PTP = resList[8];
                    var allowance = resList[9];
                    var email = resList[10];
                    var phone = resList[11];
                    var emergency_phone = resList[12];
                    var address = resList[13];
                    var addressSplit = address.split("~");
                    address="";
                    for (var i = 0; i < addressSplit.length; i++) {
                        address += addressSplit[i].concat(",");
                    }
                    address = address.substring(0,address.length-1);
                    var education = resList[14];
                    var blood_group = resList[15];
                    var id_proof_number = resList[16];
                    var id_proof_type = resList[17];
                    var PCC = resList[18];
                    var account_number = resList[19];
                    var account_holder_name = resList[20];
                    var ifsc_code = resList[21];
                    var bank_name = resList[22];
                    var branch = resList[23];
                    var exp_level = resList[24];
                    var eligibility = resList[25];
                    RETRIEVED_ST = new Storyteller(SAVED_ST_ID,city_id,eligibility,name,DOB,recruitment,DOJ,POJ,PTF,PTP,allowance,email,phone,emergency_phone,address,education,blood_group,id_proof_number,id_proof_type,PCC,account_number,account_holder_name,ifsc_code,bank_name,branch,exp_level)
                    console.log("RETRIEVED_ST : ", RETRIEVED_ST);
                    addStorytellerClicked("EDIT");
                }
                getEditSTDataAPICalled = false;
            }
            // console.log("Response : ",response);
            document.getElementsByClassName("main")[0].classList.remove("disable_screen"); 
        }
    };
    xhr.send(query);
}

window.onload = function(){
    updateMainUI();   
};