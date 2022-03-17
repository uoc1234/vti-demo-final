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
        url: 'http://localhost:8888/api/v1/user/login' + "?username=" + username + "&password=" +  password,
        type: 'POST',
        contentType: "application/json",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json', // datatype return
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader("Authorization", "Bearer " + btoa(username + ":" + password));
        // },
        success: function (data, textStatus, xhr) {
            console.log("data: " , data)
            // save data to storage
            // https://www.w3schools.com/html/html5_webstorage.asp
            localStorage.setItem("token", data.token);

            
            // redirect to home page
            // https://www.w3schools.com/howto/howto_js_redirect_webpage.asp


            console.log(localStorage.getItem("token"));
             window.location.replace("http://127.0.0.1:5500/program.html");
        },
        error(jqXHR, textStatus, errorThrown) {

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