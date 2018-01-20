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

  database.ref().on("child_added",function(snap){

  		console.log(snap.val());

  });

  $(document).ready(function(e){

  	$("#form").submit(function(e){

  		e.preventDefault();

  	});

  });