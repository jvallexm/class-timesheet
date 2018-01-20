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

  function renderRow(obj){

    let newRow = $("<div>").addClass("row");
    newRow.append(newCol(obj.name));
    newRow.append(newCol(obj.role));
    newRow.append(newCol(obj.start_date));
    newRow.append(newCol(obj.monthly_rate));
    newRow.append(newCol(obj.months_worked));
    let mult = obj.monthly_rate * obj.months_worked;
    newRow.append(newCol(mult));
    return newRow;

  }

  function newCol(data){

    return $("<div>").addClass("col-md-2")
                     .text(data);

  }

  database.ref().child("employees").push({
      name: "Mister push",
      role: "Push",
      months_worked: 12,
      monthly_rate: 12,
      start_date: 12,
      dateAdded:  firebase.database.ServerValue.TIMESTAMP
  });

  $(document).ready(function(e){

    database.ref().orderByChild("dateAdded").on("child_added",function(snap){

      console.log(Object.keys(snap.val()));
      let keys = Object.keys(snap.val());

      for(let i = 0 ; i < keys.length ; i++){

        renderRow(snap.val()[i]).appendTo("#data");

      }

    });

  	$("#form").submit(function(e){

  		e.preventDefault();




  	});

  });