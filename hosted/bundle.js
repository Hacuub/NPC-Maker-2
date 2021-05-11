"use strict";

//  handles npc uploads
var handleNPC = function handleNPC(e) {
  e.preventDefault(); //  checks if all fields are filled

  if ($("#npcName").val() === '' || $("#npcGender").val() === '' || $("#npcAge").val() === '' || $("#npcRace").val() === '' || $("#npcClass").val() === '' || $("#npcalignment").val() === '' || $("#npcLevel").val() === '' || $("#npcDisposition").val() === '' || $("#npcBackstory").val() === '') {
    handleError("All fields are required");
    return false;
  } //  posts


  sendAjax('POST', $("#npcForm").attr("action"), $("#npcForm").serialize(), function () {
    var csrfPassIn = $("#csrfID").val(); //  clears the form

    ReactDOM.unmountComponentAtNode(document.querySelector("#makeNPC"));
    ReactDOM.render( /*#__PURE__*/React.createElement(NPCForm, {
      csrf: csrfPassIn
    }), document.querySelector("#makeNPC"));
    ReactDOM.render( /*#__PURE__*/React.createElement(NPCPostSuccess, null), document.querySelector("#success"));
  });
  return false;
}; //  handles deleting npcs


function handleDelete(id, csrf) {
  var postData = "_csrf=".concat(csrf, "&_id=").concat(id); //  send delete request

  sendAjax('DELETE', '/delete', postData, function () {
    createAdminWindow(csrf);
  });
  return false;
}

; //  handles searching for npc

function handleSearch() {
  var searchText = document.querySelector(".searchBarText").value.trim();
  var NPCSearchList = [];
  sendAjax('GET', '/getNPCs', null, function (data) {
    for (var i = 0; i < data.NPCs.length; i++) {
      if (data.NPCs[i].name.includes(searchText)) {
        NPCSearchList.push(data.NPCs[i]);
      }
    }

    ;
    ReactDOM.render( /*#__PURE__*/React.createElement(NPCList, {
      NPCs: NPCSearchList
    }), document.querySelector("#NPCs"));
  });
  return false;
}

; //  handles password updating

function handleUpdate(e) {
  e.preventDefault(); //  checks if fields are valid

  if ("#pass".val === '' || "#pass2".val === '') {
    handleError("All fields are required");
    return false;
  }

  if ($("#pass").val !== $("#pass2").val) {
    handleError("Passwords do not match");
    return false;
  } //  sends post to update


  sendAjax('POST', $("#updateForm").attr("action"), $("#updateForm").serialize(), function () {
    //  clears fields
    var csrfPassIn = $("#csrfID").val();
    ReactDOM.unmountComponentAtNode(document.querySelector("#accountChange"));
    ReactDOM.render( /*#__PURE__*/React.createElement(Account, {
      csrf: csrfPassIn
    }), document.querySelector("#makeNPC"));
    ReactDOM.render( /*#__PURE__*/React.createElement(NPCPostSuccess, null), document.querySelector("#success"));
    handleError('');
  });
  return false;
}

; //  submit form in react

var NPCForm = function NPCForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "npcForm",
      onSubmit: handleNPC,
      name: "npcForm",
      action: "/maker",
      method: "POST",
      className: "npcForm"
    }, /*#__PURE__*/React.createElement("div", {
      id: "nameDiv"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name: "), /*#__PURE__*/React.createElement("input", {
      id: "npcName",
      type: "text",
      name: "name",
      placeholder: "NPC Name"
    })), /*#__PURE__*/React.createElement("div", {
      id: "genderDiv"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "gender"
    }, "Gender: "), /*#__PURE__*/React.createElement("input", {
      id: "npcGender",
      type: "text",
      name: "gender",
      placeholder: "NPC Gender"
    })), /*#__PURE__*/React.createElement("div", {
      id: "ageDiv"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "age"
    }, "Age: "), /*#__PURE__*/React.createElement("input", {
      id: "npcAge",
      type: "number",
      name: "age",
      step: "1"
    })), /*#__PURE__*/React.createElement("div", {
      id: "raceDiv"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "race"
    }, "Race: "), /*#__PURE__*/React.createElement("input", {
      id: "npcRace",
      type: "text",
      name: "race",
      placeholder: "NPC Race"
    })), /*#__PURE__*/React.createElement("div", {
      id: "classDiv"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "classNPC"
    }, "Class: "), /*#__PURE__*/React.createElement("input", {
      id: "npcClass",
      type: "text",
      name: "classNPC",
      placeholder: "NPC Class"
    })), /*#__PURE__*/React.createElement("div", {
      id: "alignmentDiv"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "alignment"
    }, "Alignment: "), /*#__PURE__*/React.createElement("input", {
      id: "npcAlignment",
      type: "text",
      name: "alignment",
      placeholder: "NPC Alignment"
    })), /*#__PURE__*/React.createElement("div", {
      id: "levelDiv"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "level"
    }, "Level: "), /*#__PURE__*/React.createElement("input", {
      id: "npcLevel",
      type: "number",
      name: "level",
      step: "1"
    })), /*#__PURE__*/React.createElement("div", {
      id: "dispositionDiv"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "disposition"
    }, "Disposition: "), /*#__PURE__*/React.createElement("input", {
      id: "npcDisposition",
      type: "text",
      name: "disposition",
      placeholder: "NPC Disposition"
    })), /*#__PURE__*/React.createElement("div", {
      id: "backstoryDiv"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "backstory"
    }, "Backstory: "), /*#__PURE__*/React.createElement("input", {
      id: "npcBackstory",
      type: "text",
      name: "backstory",
      placeholder: "NPC Backstory"
    })), /*#__PURE__*/React.createElement("div", {
      id: "submitDiv"
    }, /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      id: "csrfID",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "makeNPCSubmit",
      type: "submit",
      value: "Submit  NPC"
    })))
  );
}; //  npc list in react


var NPCList = function NPCList(props) {
  if (props.NPCs.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "npcList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyNPC"
      }, "No NPCs Yet"))
    );
  }

  var npcNodes = props.NPCs.map(function (NPC) {
    return (/*#__PURE__*/React.createElement("div", {
        key: NPC._id,
        className: "NPC"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "npcName"
      }, "Name: ", NPC.name, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcGender"
      }, "Gender: ", NPC.gender, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcAge"
      }, "Age: ", NPC.age, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcRace"
      }, "Race: ", NPC.race, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcClass"
      }, "Class: ", NPC.classNPC, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcAlignment"
      }, "Alignment: ", NPC.alignment, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcLevel"
      }, "Level: ", NPC.level, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcDisposition"
      }, "Disposition: ", NPC.disposition, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcBackstory"
      }, "Backstory: ", NPC.backstory, " "))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "npcList"
    }, npcNodes)
  );
}; //  npc list with delete buttons in react


var NPCListAdmin = function NPCListAdmin(input) {
  if (input.props.data.NPCs.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "npcList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyNPC"
      }, "No NPCs Yet"))
    );
  }

  var npcNodes = input.props.data.NPCs.map(function (NPC) {
    return (/*#__PURE__*/React.createElement("div", {
        key: NPC._id,
        className: "NPC"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "npcName"
      }, "Name: ", NPC.name, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcGender"
      }, "Gender: ", NPC.gender, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcAge"
      }, "Age: ", NPC.age, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcRace"
      }, "Race: ", NPC.race, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcClass"
      }, "Class: ", NPC.classNPC, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcAlignment"
      }, "Alignment: ", NPC.alignment, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcLevel"
      }, "Level: ", NPC.level, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcDisposition"
      }, "Disposition: ", NPC.disposition, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcBackstory"
      }, "Backstory: ", NPC.backstory, " "), /*#__PURE__*/React.createElement("input", {
        className: "npcDelete",
        type: "button",
        value: "Delete",
        onClick: function onClick() {
          return handleDelete(NPC._id, input.props.csrf);
        }
      }))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "npcList"
    }, npcNodes)
  );
}; //  random npc in react


var RandomNPC = function RandomNPC(NPC) {
  if (NPC.currentNPC === undefined) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "npcList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyNPC"
      }, "No NPCs Yet"))
    );
  } else {
    return (/*#__PURE__*/React.createElement("div", {
        key: NPC._id,
        className: "NPC"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "npcName"
      }, "Name: ", NPC.currentNPC.name, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcGender"
      }, "Gender: ", NPC.currentNPC.gender, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcAge"
      }, "Age: ", NPC.currentNPC.age, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcRace"
      }, "Race: ", NPC.currentNPC.race, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcClass"
      }, "Class: ", NPC.currentNPC.classNPC, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcAlignment"
      }, "Alignment: ", NPC.currentNPC.alignment, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcLevel"
      }, "Level: ", NPC.currentNPC.level, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcDisposition"
      }, "Disposition: ", NPC.currentNPC.disposition, " "), /*#__PURE__*/React.createElement("h3", {
        className: "npcBackstory"
      }, "Backstory: ", NPC.currentNPC.backstory, " "))
    );
  }
}; //  search bar for npcs in react


var SearchBar = function SearchBar() {
  return (/*#__PURE__*/React.createElement("div", {
      id: "search"
    }, /*#__PURE__*/React.createElement("input", {
      className: "searchBarText",
      type: "text",
      placeholder: "Search..."
    }), /*#__PURE__*/React.createElement("input", {
      className: "searchSubmit",
      type: "submit",
      value: "Search",
      onClick: function onClick() {
        return handleSearch();
      }
    }))
  );
}; //  feedback for successful post in react


var NPCPostSuccess = function NPCPostSuccess() {
  return (/*#__PURE__*/React.createElement("div", {
      id: "postSuccess"
    }, /*#__PURE__*/React.createElement("h3", null, "Success!"))
  );
}; //  account page for changing passwords in react


var Account = function Account(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "updateForm",
      name: "updateForm",
      onSubmit: handleUpdate,
      action: "/account",
      method: "POST",
      className: "updateForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass",
      className: "passLabel"
    }, "Change Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass",
      type: "password",
      name: "pass",
      placeholder: "password"
    }), /*#__PURE__*/React.createElement("input", {
      id: "pass2",
      type: "password",
      name: "pass2",
      placeholder: "retype password"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      id: "csrfID",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "updateSubmit",
      type: "submit",
      value: "Change Password"
    }))
  );
}; //  loads all the npcs from the server


var loadNPCsFromServer = function loadNPCsFromServer() {
  sendAjax('GET', '/getNPCs', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(NPCList, {
      NPCs: data.NPCs
    }), document.querySelector("#NPCs"));
  });
}; //  unloads other react elements and loads random npc 


var createRandomWindow = function createRandomWindow() {
  sendAjax('GET', '/getNPCs', null, function (data) {
    var randomNPC = Math.floor(Math.random() * data.NPCs.length);
    ReactDOM.render( /*#__PURE__*/React.createElement(RandomNPC, {
      currentNPC: data.NPCs[randomNPC]
    }), document.querySelector("#NPCs"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#makeNPC"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#searchBar"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#success"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#accountChange"));
    handleError('');
  });
}; //  unloads other react elements and loads search bar


var createSearchWindow = function createSearchWindow() {
  ReactDOM.render( /*#__PURE__*/React.createElement(SearchBar, null), document.querySelector("#searchBar"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#makeNPC"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#NPCs"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#success"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#accountChange"));
  handleError('');
}; //  unloads other react elements and loads submit form


var createSubmitWindow = function createSubmitWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(NPCForm, {
    csrf: csrf
  }), document.querySelector("#makeNPC"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#NPCs"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#searchBar"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#success"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#accountChange"));
  handleError('');
}; //  unloads other react elements and loads admin page


var createAdminWindow = function createAdminWindow(csrf) {
  sendAjax('GET', '/getNPCs', null, function (data) {
    var props = {
      data: data,
      csrf: csrf
    };
    ReactDOM.render( /*#__PURE__*/React.createElement(NPCListAdmin, {
      props: props
    }), document.querySelector("#NPCs"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#makeNPC"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#searchBar"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#success"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#accountChange"));
    handleError('');
  });
}; //  unloads other react elements and loads account page


var createAccountWindow = function createAccountWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(Account, {
    csrf: csrf
  }), document.querySelector("#accountChange"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#NPCs"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#searchBar"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#success"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#makeNPC"));
  handleError('');
}; //  sets up nav bar and loads random npc to show


var setup = function setup(csrf) {
  var randomButton = document.querySelector("#randomButton");
  var searchButton = document.querySelector("#searchButton");
  var submitButton = document.querySelector("#submitButton");
  var adminButton = document.querySelector("#adminButton");
  var accountButton = document.querySelector("#accountButton");
  randomButton.addEventListener("click", function (e) {
    e.preventDefault();
    createRandomWindow();
    return false;
  });
  searchButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSearchWindow();
    return false;
  });
  submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSubmitWindow(csrf);
    return false;
  });
  adminButton.addEventListener("click", function (e) {
    e.preventDefault();
    createAdminWindow(csrf);
    return false;
  });
  accountButton.addEventListener("click", function (e) {
    e.preventDefault();
    createAccountWindow(csrf);
    return false;
  });
  ReactDOM.render( /*#__PURE__*/React.createElement(NPCList, {
    NPCs: []
  }), document.querySelector("#NPCs"));
  createRandomWindow();
}; //  gets csrf token


var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
}; //  starts everything on page load


$(document).ready(function () {
  getToken();
});
"use strict";

//  displays message on the error section
var handleError = function handleError(message) {
  $("#errorMessage").text(message);
}; //  redirects to another page


var redirect = function redirect(response) {
  window.location = response.redirect;
}; //  helper method for interacting with the server


var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cahce: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
