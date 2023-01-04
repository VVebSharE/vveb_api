let user_name;
let uid;

loading_spinner_modal_open.click();

token = localStorage.getItem("token");
// console.log(token)
if (token) {
  // checking that token is working or not
  CallApi("users/me", "GET", null, token)
    .then((r) => {
      loading_spinner_modal_close.click(); //thie is working here
    //   console.log(r);
      if (r.name) {
        greeting = `<h1 class=" m-5 text-center">Hi ${r.name} You are Welcome</h1>`;
        greeting_con.innerHTML += greeting;
        alert_notification("Welcome to dashboard", "success");
        main_con.classList.remove("d-none");
        user_name = r.name;
        uid = r.uid;

        get_projects();
      } else {
        alert_notification(
          r.message + ", redirect to home page and login again",
          "warning"
        );
        loading_spinner_modal_close.click();
      }
    })
    .catch((error) => {
      loading_spinner_modal_close.click();
      alert_notification(
        error + ", redirect to home page and login again",
        "warning"
      );
    });
} else {
  // console.log(loading_spinner_modal_close)
  loading_spinner_modal_close.click(); //hell why this is not working

  alert_notification("Redirect to home page and login first", "warning");
}

function make_card_for_project(id, name) {
  card = `<div class="card m-2 project_cards" style="width: 17rem; height:16rem">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                the
                card's content.</p>
            <a href="#" class=" link-primary d-block py-1" data-bs-toggle="modal" data-bs-target="#edit_project_modal" data-bs-id="${id}" data-bs-name="${name}">Edit Project</a>
            <a href="#" class=" link-danger d-block py-1" data-bs-toggle="modal" data-bs-target="#delete_project_modal" data-bs-id="${id}" data-bs-name="${name}" >Delete Project</a>
        </div>
    </div>`;
  // console.log(card);
  return card;
}

function get_projects(alert_message = null) {
  //loading all the projects
  CallApi("projects", "GET", null, token)
    .then((r) => {
    //   console.log(r);
      if (!r.message) {
        for (let project of r) {
        //   console.log(project);
          document.querySelector("#projects_con").innerHTML +=
            make_card_for_project(project._id, project.name);
        }

        // for varying modal content->edit //why not working out of here as madal exist already
        const editModal = document.getElementById("edit_project_modal");
        editModal.addEventListener("show.bs.modal", (event) => {
        //   console.log("modal opened");

          // Button that triggered the modal
          const button = event.relatedTarget;
          // Extract info from data-bs-* attributes
          const project_name = button.getAttribute("data-bs-name");
          const project_id = button.getAttribute("data-bs-id");
          // If necessary, you could initiate an AJAX request here
          // and then do the updating in a callback.
          //
          // Update the modal's content.
          const modalBodyInput_project_name = document.querySelector(
            "#for_edit_project_name"
          );
          const modalBodyInput_project_id = document.querySelector(
            "#for_edit_project_id"
          );

          modalBodyInput_project_name.value = project_name;
          modalBodyInput_project_id.value = project_id;
        });
        // for varying modal content->delete
        const deleteModal = document.getElementById("delete_project_modal");
        deleteModal.addEventListener("show.bs.modal", (event) => {
        //   console.log("modal opened");

          // Button that triggered the modal
          const button = event.relatedTarget;
          // Extract info from data-bs-* attributes
          // const project_name = button.getAttribute('data-bs-name'); //no name for delete
          const project_id = button.getAttribute("data-bs-id");
          // If necessary, you could initiate an AJAX request here
          // and then do the updating in a callback.
          //
          // Update the modal's content.
          // const modalBodyInput_project_name = deleteModal.querySelector('#for_edit_project_name') //no name for delete
          const modalBodyInput_project_id = document.querySelector(
            "#for_delete_project_id"
          );

          // modalBodyInput_project_name.value = project_name; //no name for delete
          modalBodyInput_project_id.value = project_id;
        });

        if (!alert_message) {
          alert_message = "projects fetched successfully";
        }
        alert_notification(alert_message, "success");
      } else {
        alert_notification(r.message + ",try to refresh the page", "warning");
      }
    })
    .catch((error) => {
      alert_notification(error + ",try to refresh the page", "warning");
    });
}

function refresh_project_cards() {
  document.querySelectorAll(".project_cards").forEach((ele) => {
    document.querySelector("#projects_con").removeChild(ele);
  });
  alert_message = "Project refreshed successfully";
  get_projects(alert_message);
}

function add_project() {
  // console.log("adding")
  add_project_modal_close_btn.click();
  body = {
    name: document.querySelector("#for_add_project_name").value,
  };
  CallApi("projects", "POST", body, token)
    .then((r) => {
      // console.log(r);
      if (r.name) {
        alert_notification("Project Added Successfully", "success");
      } else {
        alert_notification(r.message, "warning");
      }
      refresh_project_cards();
    })
    .catch((e) => {
      alert_notification(e, "warning");
    });
}
function update_project() {
  // console.log("editing")

  edit_project_modal_close_btn.click();

  body = {
    name: document.querySelector("#for_edit_project_name").value,
  };
  id = document.querySelector("#for_edit_project_id").value.trim();
  CallApi("projects/" + id, "PUT", body, token)
    .then((r) => {
      // console.log(r)
      if (r.name) {
        alert_notification("Project Updated Successfully", "success");
      } else {
        alert_notification(r.message, "warning");
      }
      refresh_project_cards();
    })
    .catch((e) => {
      alert_notification(e, "warning");
    });
}
function delete_project() {
  // console.log("deleting")

  delete_project_modal_close_btn.click();

  id = document.querySelector("#for_delete_project_id").value.trim();
  CallApi("projects/" + id, "DELETE", null, token)
    .then((r) => {
      // console.log(r)
      if (r.id) {
        alert_notification("Project deleted", "success");
      } else {
        alert_notification(r.message, "warning");
      }
      refresh_project_cards();
    })
    .catch((e) => {
      alert_notification(e, "warning");
    });
}
