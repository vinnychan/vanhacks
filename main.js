// Get the modal
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var dataItems = ko.observableArray();

ko.applyBindings({
  newsFeedItems: dataItems
})

// When the user clicks anywhere outside of the modal, close it

$(document).ready(function() {
  $.get("http://jsonplaceholder.typicode.com/users", function(data, status) {
    //todo check status
    for (var i = 0; i < data.length; i++) {
      dataItems.push(data[i]);
    }
  });
});
