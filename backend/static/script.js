// Global variables
API_uri = "https://mushy-ruby-firefly.cyclic.app/api/";
// API_uri= "http://127.0.0.1:5000/api/"
function CallApi(endpoint, method = "GET", body = null, token = null) {
  const toUrlEncoded = (obj) =>
    Object.keys(obj)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
      .join("&");
  body =body? toUrlEncoded(body):null;

  // if (body) {
  //   body = JSON.stringify(body);
  // }

  return new Promise((resolve) => {
    let headres = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Request-Headers":"Authorization",
      "Authorization": "Bearer " + (token?token:""),
      //  "Access-Control-Allow-Origin":"http://127.0.0.1:5500",
       
    };
    fetch(API_uri + endpoint, {
      method: method,
      headers: headres,
      body: body,
    })
      .then((r) => r.json())
      .then((response) => {
        resolve(response);
      })
      .catch((e) => {
        // console.log(e);
        resolve({
          status: 500,
          message: e.message,
        });
      });
  });
}

function alert_error(message) {
  div = document.getElementById("alert");
  div.innerHTML = message;
  div.style.display = "flex";
  div.style["text-align"] = "center";
  div.style.color = "red";
  div.style["border-radius"] = "5px";
  subcont = document.querySelector(".subcontainer");
  subcont.style.filter = "blur(3px)";
  setTimeout(() => {
    div.style.display = "none";
    subcont.style.filter = "blur(0px)";
  }, 2000);
}

// BODY={
//   uid:"abc@abc",
//   password:"pass"
// }

// CallApi("users/login", "POST", BODY).then((r) => {
//   console.log(r)
// })
function save_token_locally(token){
  localStorage.setItem("token",token);
}

function login(e) {
  e.preventDefault();
  body = {
    uid: document.querySelector("#login_email").value,
    password: document.querySelector("#login_password").value,
  };
  CallApi("users/login", "POST", body).then((r) => {
    // console.log(r);

    if (r.token) {
      document.querySelector("#login_close_btn").click();
      alert_notification("Login Successfully","success");
      save_token_locally(r.token)
    } else {
      alert_notification(r.message,"warning");
    }
  });
}

function sign_up(e) {
  e.preventDefault();
  body = {
    name: document.querySelector("#sign_up_name").value,
    uid: document.querySelector("#sign_up_email").value,
    password: document.querySelector("#sign_up_password").value,
  };
  CallApi("users", "POST", body).then((r) => {
    // console.log(r);

    if (r.token) {
      document.querySelector("#sign_up_close_btn").click();
      alert_notification("Sign Up Successfully","success");
    } else {
      alert_notification(r.message,"warning");
    }
  });
}

function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  return div.firstChild;
}

function remove_element_from_parent(p_id, el_id) {
  setTimeout(() => {
    // console.log(el_id);
    document
      .querySelector("#" + p_id)
      .removeChild(document.getElementById(el_id));
  }, 3000);
}
function click_btn_after(btn_id, time = 3000) {
  setTimeout(() => {
    document.getElementById(btn_id).click();
    ;
  }, time);
}

notify = 0;
function alert_notification(message, type) {
  notify++;
  n = notify;
  // message=message?message:""
  ele = `<div class="alert alert-primary d-flex align-items-center fade show" role="alert" id="${n}notify">
  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
      <use xlink:href="#info-fill" />
  </svg>
  <div>
      ${message}
  </div>
  <div class="ms-auto">
  <button type="button" class="btn-close ms-2" data-bs-dismiss="alert" aria-label="Close" id="${n}notify_close_btn"></button>
  <div>
</div>`;
  if (type) {
    if (type === "success") {
      ele =
        ele = `<div class="alert alert-success d-flex align-items-center fade show" role="alert" id="${n}notify">
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
        <use xlink:href="#check-circle-fill" />
    </svg>
    <div>
        ${message}
    </div>
    <div class="ms-auto">
    <button type="button" class="btn-close ms-2" data-bs-dismiss="alert" aria-label="Close" id="${n}notify_close_btn"></button>
    <div>
  </div>`;
    } else if (type === "warning") {
      ele = `<div class="alert alert-warning d-flex align-items-center fade show" role="alert" id="${n}notify">
  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
      <use xlink:href="#exclamation-triangle-fill" />
  </svg>
  <div>
      ${message}
  </div>
  <div class="ms-auto">
  <button type="button" class="btn-close ms-2" data-bs-dismiss="alert" aria-label="Close" id="${n}notify_close_btn"></button>
  <div>
</div>`;
    }
  }
  // ele=createElementFromHTML(ele)
  // document.querySelector("#notification_con").appendChild(ele);
  document.querySelector("#notification_con").innerHTML += ele;
  click_btn_after("" + n + "notify_close_btn");
  // setTimeout(() => {
  //   console.log("" + n + "notify");
  //   document.querySelector("#notification_con").removeChild(document.getElementById("" + n + "notify"))
  // }, 3000)
}

var alertList = document.querySelectorAll(".alert");
alertList.forEach(function (alert) {
  new bootstrap.Alert(alert);
});




