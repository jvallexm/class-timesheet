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

    console.log("trying to render " + JSON.stringify(obj));
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

  $(document).ready(function(e){

    database.ref().orderByChild("dateAdded").on("child_added",function(snap){

      console.log(Object.keys(snap.val()));
      let keys = Object.keys(snap.val());

      for(let i = 0 ; i < keys.length ; i++){

        renderRow(snap.val()[keys[i]]).appendTo("#data");

      }

    });

  	$("#form").submit(function(e){

  		e.preventDefault();

      let name = $("#name");
      let role = $("#role");
      let months_worked = $("#months_worked");
      let monthly_rate = $("#monthly_rate");
      let start_date = $("#start_date");
      
      database.ref().child("employees").push({

          name: name.val().trim(),
          role: role.val().trim(),
          months_worked: months_worked.val().trim(),
          monthly_rate: monthly_rate.val().trim(),
          start_date: start_date.val().trim(),
          dateAdded:  firebase.database.ServerValue.TIMESTAMP

      });

      name.empty();
      role.empty();
      monthly_rate.empty();
      months_worked.empty();
      start_date.empty();

  	});

  });