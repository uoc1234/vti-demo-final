function login() {
    // Get username & password
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var token = "";
    let newReply = {
        token : token
    };
    console.log("username",username);
    console.log("password",password);

    // validate
    if (!username) {
        showNameErrorMessage("Please input username!");
        return;
    }

    if (!password) {
        showNameErrorMessage("Please input password!");
        return;
    }


    // validate username 6 -> 30 characters
    if (username.length < 3 || username.length > 50 || password.length < 6 || password.length > 50) {
        // show error message
        showNameErrorMessage("Login fail!");
        return;
    }

    // Call API
    $.ajax({
        url: 'https://reqres.in/api/login',
        type: 'POST',
        contentType: "application/json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: 'json', // datatype return
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader("Authorization", "Bearer " + btoa(username + ":" + password));
        // },
        data: JSON.stringify({
            "email": username,
            "password": password
        }),
        success: function (data, textStatus, xhr) {
            console.log("data: " , data)
            localStorage.setItem("token", data.token);

            console.log(localStorage.getItem("token"));
            //  window.location.replace("http://127.0.0.1:5500/program.html");
             window.location.href='index.html'
        },
        error(jqXHR, textStatus, errorThrown) {
            confirm(jqXHR.responseJSON.error)
            if (jqXHR.status == 401) {
                showNameErrorMessage("Login fail!");
            } else {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        }
    });
}

function showNameErrorMessage(message) {
    document.getElementById("nameErrorMessage").style.display = "block";
    document.getElementById("nameErrorMessage").innerHTML = message;
}

function hideNameErrorMessage() {
    document.getElementById("nameErrorMessage").style.display = "none";
}
