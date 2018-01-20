  const config = {
    apiKey: "AIzaSyAUTYX7lHRsFxh1djAbnrBVfOvJDD2Sd3g",
    authDomain: "classtrainproject.firebaseapp.com",
    databaseURL: "https://classtrainproject.firebaseio.com",
    projectId: "classtrainproject",
    storageBucket: "",
    messagingSenderId: "895355219960"
  };

  firebase.initializeApp(config);

  const database = firebase.database();
  const connections = database.ref("connections");
  const connected   = database.ref(".info/connected");

  const employeeDb = database.ref("employees");

  connected.on("value", function(snap) {

	  if (snap.val()) {
	  	console.log("connected");
	    const con = connections.push(true);
	    con.onDisconnect().remove();
	  }

  });

  database.ref().on("value",function(snap){

  		console.log(snap.val().employees);

  });

  $(document).ready(function(e){

  	$("#form").submit(function(e){

  		e.preventDefault();

  	});

  });