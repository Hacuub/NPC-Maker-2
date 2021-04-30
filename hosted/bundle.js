"use strict";

var handleNPC = function handleNPC(e) {
  e.preventDefault();
  $("#npcMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#npcName").val() === '' || $("#npcGender").val() === '' || $("#npcAge").val() === '' || $("#npcRace").val() === '' || $("#npcClass").val() === '' || $("#npcalignment").val() === '' || $("#npcLevel").val() === '' || $("#npcDisposition").val() === '' || $("#npcBackstory").val() === '') {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#npcForm").attr("action"), $("#npcForm").serialize(), function () {
    ReactDOM.render( /*#__PURE__*/React.createElement(NPCPostSuccess, null), document.querySelector("#success"));
  });
  return false;
};

function handleDelete(id, csrf) {
  var postData = "_csrf=".concat(csrf, "&_id=").concat(id);
  sendAjax('DELETE', '/delete', postData, function () {
    createAdminWindow();
  });
  return false;
}

;

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

;

var NPCForm = function NPCForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "npcForm",
      onSubmit: handleNPC,
      name: "npcForm",
      action: "/maker",
      method: "POST",
      className: "npcForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name: "), /*#__PURE__*/React.createElement("input", {
      id: "npcName",
      type: "text",
      name: "name",
      placeholder: "NPC Name"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "gender"
    }, "Gender: "), /*#__PURE__*/React.createElement("input", {
      id: "npcGender",
      type: "text",
      name: "gender",
      placeholder: "NPC Gender"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "age"
    }, "Age: "), /*#__PURE__*/React.createElement("input", {
      id: "npcAge",
      type: "text",
      name: "age",
      placeholder: "NPC Age"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "race"
    }, "Race: "), /*#__PURE__*/React.createElement("input", {
      id: "npcRace",
      type: "text",
      name: "race",
      placeholder: "NPC Race"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "classNPC"
    }, "Class: "), /*#__PURE__*/React.createElement("input", {
      id: "npcClass",
      type: "text",
      name: "classNPC",
      placeholder: "NPC Class"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "alignment"
    }, "Alignment: "), /*#__PURE__*/React.createElement("input", {
      id: "npcAlignment",
      type: "text",
      name: "alignment",
      placeholder: "NPC Alignment"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "level"
    }, "Level: "), /*#__PURE__*/React.createElement("input", {
      id: "npcLevel",
      type: "text",
      name: "level",
      placeholder: "NPC Level"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "disposition"
    }, "Disposition: "), /*#__PURE__*/React.createElement("input", {
      id: "npcDisposition",
      type: "text",
      name: "disposition",
      placeholder: "NPC Disposition"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "backstory"
    }, "Backstory: "), /*#__PURE__*/React.createElement("input", {
      id: "npcBackstory",
      type: "text",
      name: "backstory",
      placeholder: "NPC Backstory"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      id: "csrfID",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "makeNPCSubmit",
      type: "submit",
      value: "Submit  NPC"
    }))
  );
};

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
};

var NPCListAdmin = function NPCListAdmin(input) {
  console.log(input.props);

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
        value: "Delete (WIP)",
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
};

var RandomNPC = function RandomNPC(NPC) {
  if (NPC === null) {
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
};

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
};

var NPCPostSuccess = function NPCPostSuccess() {
  return (/*#__PURE__*/React.createElement("div", {
      id: "postSuccess"
    }, /*#__PURE__*/React.createElement("h3", null, "NPC Created Successfully"))
  );
};

var loadNPCsFromServer = function loadNPCsFromServer() {
  sendAjax('GET', '/getNPCs', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(NPCList, {
      NPCs: data.NPCs
    }), document.querySelector("#NPCs"));
  });
};

var createRandomWindow = function createRandomWindow() {
  sendAjax('GET', '/getNPCs', null, function (data) {
    var randomNPC = Math.floor(Math.random() * data.NPCs.length);
    ReactDOM.render( /*#__PURE__*/React.createElement(RandomNPC, {
      currentNPC: data.NPCs[randomNPC]
    }), document.querySelector("#NPCs"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#makeNPC"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#searchBar"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#success"));
  });
};

var createSearchWindow = function createSearchWindow() {
  ReactDOM.render( /*#__PURE__*/React.createElement(SearchBar, null), document.querySelector("#searchBar"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#makeNPC"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#NPCs"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#success"));
};

var createSubmitWindow = function createSubmitWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(NPCForm, {
    csrf: csrf
  }), document.querySelector("#makeNPC"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#NPCs"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#searchBar"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#success"));
};

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
  });
};

var setup = function setup(csrf) {
  var randomButton = document.querySelector("#randomButton");
  var searchButton = document.querySelector("#searchButton");
  var submitButton = document.querySelector("#submitButton");
  var adminButton = document.querySelector("#adminButton");
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
  ReactDOM.render( /*#__PURE__*/React.createElement(NPCList, {
    NPCs: []
  }), document.querySelector("#NPCs"));
  createRandomWindow();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#npcMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#npcMessage").animate({
    width: 'toggle'
  }, 350);
  window.location = response.redirect;
};

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
