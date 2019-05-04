var SERVER_IP_ADDRESS = "http://18.191.5.27"; //Server
// var SERVER_IP_ADDRESS = "http://10.109.25.101"; //LAN
// var SERVER_IP_ADDRESS = "http://192.168.42.206"; //Mobile
console.log("SERVER_IP_ADDRESS : ", SERVER_IP_ADDRESS);

function CaptchaVerifiedOrNot(){
	/* To-Do */
	return true;
}

function loginButtonClicked(){
	var id = document.getElementById("login_username_input").value;
	var password = document.getElementById("login_password_input").value;
	if(id.length>0 && password.length>0){
		if(CaptchaVerifiedOrNot()){
			try_login(id,password,false);
		}else{
			alert('Verify Captcha First!!');
		}		
	}else{
		alert("Username or Password input incomplete...");
		location.reload();
	}
}
function showPasswordClicked() {
  var x = document.getElementById("login_password_input");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
function try_login(id,password){ //autologin var passed!!
	if(id == null || password == null)
		return false ;

	var api = "authenticateUser()?".concat(id).concat(",").concat(password);
	var xhr = new XMLHttpRequest();
	var url = SERVER_IP_ADDRESS;
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	var response;
	xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4 && xhr.status === 200) {
	        response = xhr.responseText;
	        var splitRes = response.split(":");

			if(splitRes.length>1){
				if (typeof(Storage) !== "undefined") {
					var values = splitRes[1].split(",");
					console.log("| Testing ------> : values : ",values);
					localStorage.setItem("OE_name",values[1]);
				  	localStorage.setItem("OE_id", values[2]);
				  	localStorage.setItem("OE_password", values[3]);
				  	if (parseInt(values[4])==0) {
				    	localStorage.setItem("OE_designation", "Super User");
				  	}else if (parseInt(values[4])==1) {
				    	localStorage.setItem("OE_designation", "Non Admin");
				  	}

			    	localStorage.setItem("OE_city", values[5].substring(0,values[5].length-2));
			    } else {
					alert("No Web Storage! Autologin will not work...");
				}
				window.location.replace("main.html");
				// window.open("main.html","_top");
			}else{
				alert(response);//Incorrect Credentials
		    	localStorage.clear();
		    	location.reload();
			}
		}	
	};
	console.log("Fetching Executive Data : ")
	xhr.send("authenticateUser()?".concat(id).concat(",").concat(password));
}

window.onload = function(){
	
	if (typeof(Storage) !== "undefined") {
		var id = localStorage.getItem("OE_id");
		if(id!=null){
			if(confirm("Autolog User ".concat(id).concat(" ?"))){
				var password = localStorage.getItem("OE_password");
				localStorage.clear(); //To reset localStorage
				console.log("AutoLogging User...",id,password);
				try_login(id,password); // For AutoLogin
			
			}
		}
	}else {
		alert("No Web Storage! Autologin will not work...");
	}
}
