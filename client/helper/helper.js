//  displays message on the error section
const handleError = (message) => {
    $("#errorMessage").text(message);
};

//  redirects to another page
const redirect = (response) => {
    window.location = response.redirect;
};

//  helper method for interacting with the server
const sendAjax = (type, action, data, success) => {
    $.ajax({
        cahce: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function(xhr, status, error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};