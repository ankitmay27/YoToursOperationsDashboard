var SERVER_IP_ADDRESS = "http://18.191.5.27"; //Server
// var SERVER_IP_ADDRESS = "http://10.109.25.101"; //LAN
// var SERVER_IP_ADDRESS = "http://10.145.149.92";//Wi-Fi
// var SERVER_IP_ADDRESS = "http://192.168.42.206"; //Mobile

console.log("SERVER_IP_ADDRESS : ", SERVER_IP_ADDRESS);

function addNewBooking(){
    window.location.replace("modifyBooking.html");
    localStorage.setItem("identifier","ADD");
}
function open_report(){
    window.location.replace("report.html");
}
function open_customers(){
    window.location.replace("customers.html");
}
function open_storytellers(){
    window.location.replace("storytellers.html");
}
function open_settings(){
    window.location.replace("settings.html");
}
function open_inventory(){
    window.location.replace("inventory.html");
}
function open_bookings(){
    window.location.replace("bookings.html");
}
function applyPreviledges(designation){
    console.log("USER DESIGNATION : ",designation);
    if (designation=="Non Admin") {
        var linkList = window.location.href.toString().split("/");
        var currentPage = linkList[linkList.length-1];
        console.log("current page : ",currentPage);
        if (currentPage=="report.html"){
            document.getElementsByClassName("main")[0].classList.add("disable_screen");        
        }else if(currentPage=="settings.html") {
            document.getElementsByClassName("sub_main")[0].classList.add("disable_screen2");        
            document.getElementsByClassName("sub_main")[1].classList.add("disable_screen2");        
        }
    }
}
function updateMainUI(){
    document.getElementById("user_name").innerHTML = localStorage.getItem("OE_name");;
    document.getElementById("user_designation").innerHTML = localStorage.getItem("OE_designation");
    document.getElementById("user_location").innerHTML = localStorage.getItem("OE_city");
    applyPreviledges(localStorage.getItem("OE_designation"));               
}
window.onload = function () {
    updateMainUI();
};

