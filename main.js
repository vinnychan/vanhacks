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

var totalAmt = ko.observable("0.00");

ko.applyBindings({
    newsFeedItems: dataItems
})

var checkboxClick_handler = function(item) {
    console.log('clicked: ' + item);
    var checkbox = $("#checkbox_" + item);
    var price = $("#price_" + item);
    var number = $("#number_" + item);
    if (checkbox.prop('checked')) {
        price.show();
        number.show();
    } else {
        price.hide();
        number.hide();
    }

    var amt = Number($("#number_" + item).val());
    if (amt != 0) {
        totalAmtChange_handler();
    }

    var noneChecked = true;
    $("input[type=checkbox]").each(function(index) {
        if ($("#checkbox_" + index).prop('checked')) {
            noneChecked = false;
        }
    });
    if (!noneChecked) {
        $(".price_th").css("display", "block");
    } else {
        $(".price_th").css("display", "none");
    }
}

var totalAmtChange_handler = function() {
    console.log('total amount changed');
    var totalSoFar = 0;
    $("input[type=number]").each(function(index) {
        var isChecked = $("#checkbox_" + index).prop('checked');
        var inputtedNumber = Number($(this).val());
        var price = Number($("#price_" + index).text());
        if (inputtedNumber && price && isChecked) {
            totalSoFar += (inputtedNumber * price);
        }
    });
    var rounded = Math.round(totalSoFar*100)/100;
    totalAmt(rounded.toString());
}

$(document).ready(function() {
    $.get("http://jsonplaceholder.typicode.com/users", function(data, status) {
      //todo check status
        for (var i = 0; i < data.length; i++) {
            dataItems.push(data[i]);
            $("#price_"+i).hide();
            $("#number_"+i).hide();
        }
    });
});
