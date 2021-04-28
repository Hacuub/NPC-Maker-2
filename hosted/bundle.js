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
    loadNPCsFromServer();
  });
  return false;
};

function handleDelete(id) {
  var csrfValue = document.querySelector("#csrfID").value;
  var postData = "_csrf=".concat(csrfValue, "&_id=").concat(id);
  sendAjax('DELETE', '/delete', postData, function () {
    loadNPCsFromServer();
  });
  return false;
}

var NPCForm = function NPCForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "npcForm",
      onSubmit: NPC,
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
      htmlFor: "class"
    }, "Class: "), /*#__PURE__*/React.createElement("input", {
      id: "npcClass",
      type: "text",
      name: "class",
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
      }, "Class: ", NPC["class"], " "), /*#__PURE__*/React.createElement("h3", {
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
          return handleDelete(NPC._id);
        }
      }))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "npcList"
    }, npcNodes)
  );
};

var loadNPCsFromServer = function loadNPCsFromServer() {
  sendAjax('GET', '/getNPCs', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(NPCList, {
      NPCs: data.NPCs
    }), document.querySelector("#NPCs"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(NPCForm, {
    csrf: csrf
  }), document.querySelector("#makeNPC"));
  ReactDOM.render( /*#__PURE__*/React.createElement("npcList", {
    NPCs: []
  }), document.querySelector("#NPCs"));
  loadNPCsFromServer();
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
