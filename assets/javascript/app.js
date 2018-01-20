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
    let mult = obj.monthly_rate * obj.months_worked;

    newRow.append(newCol(obj.name))
          .append(newCol(obj.role))
          .append(newCol(obj.start_date))
          .append(newCol(obj.monthly_rate))
          .append(newCol(obj.months_worked))
          .append(newCol(mult));

    return newRow;

  }

  function newCol(data){

    return $("<div>").addClass("col-md-2")
                     .text(data);

  }

  $(document).ready(function(e){

    database.ref().orderByChild("dateAdded").on("child_added",function(snap){

      console.log("child added!");

      console.log(Object.keys(snap.val()));
      let keys = Object.keys(snap.val());

      for(let i = 0 ; i < keys.length ; i++){

        renderRow(snap.val()[keys[i]]).appendTo("#data");

      }

    });

    database.ref("employees").orderByChild('dateAdded').limitToLast(1).on('child_added', function(snap){

      console.log("adding new child");
      renderRow(snap.val()).appendTo("#data");

    });

  	$("#form").submit(function(e){

  		e.preventDefault();

      let name          = $("#name");
      let role          = $("#role");
      let months_worked = $("#months-worked");
      let monthly_rate  = $("#monthly-rate");
      let start_date    = $("#start-date");
      
      database.ref().child("employees").push({

          name:          name.val().trim(),
          role:          role.val().trim(),
          months_worked: months_worked.val().trim(),
          monthly_rate:  monthly_rate.val().trim(),
          start_date:    start_date.val().trim(),
          dateAdded:     firebase.database.ServerValue.TIMESTAMP

      });

      name.val("");
      role.val("");
      monthly_rate.val("");
      months_worked.val("");
      start_date.val("");

  	});

  });