//business logic

function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + ", " + this.state;
}

function resetFields() {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
}

var showBox = (
  '<h2></h2>' +
  '<p>First name: <span class="first-name"></span></p>' +
  '<p>Last name: <span class="last-name"></span></p>' +
  '<p>Addresses:</p>' +
  '<ul id="addresses">' +
  '</ul>' +
  '<button id="delete-button" type="button" class="btn">Delete</button>'
);

// user interface logic
$(document).ready(function() {

  $("#add-address").click(function() {
    $("#new-addresses").append(
      "<div class='removable-address'>" +
      '<div class="new-address">' +
      '<div class="form-group">' +
      '<label for="new-street">Street</label>' +
      '<input type="text" class="form-control new-street">' +
      '</div>' +
      '<div class="form-group">' +
      '<label for="new-city">City</label>' +
      '<input type="text" class="form-control new-city">' +
      '</div>' +
      '<div class="form-group">' +
      '<label for="new-state">State</label>' +
      '<input type="text" class="form-control new-state">' +
      '</div>' +
      '</div>' +
      '</div>');
    });

    $("form#new-contact").submit(function(event) {
      event.preventDefault();

      var inputtedFirstName = $("input#new-first-name").val();
      var inputtedLastName = $("input#new-last-name").val();
      var newContact = new Contact(inputtedFirstName, inputtedLastName);

      $(".new-address").each(function() {
        var inputtedStreet = $(this).find("input.new-street").val();
        var inputtedCity = $(this).find("input.new-city").val();
        var inputtedState = $(this).find("input.new-state").val();
        var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState)
        newContact.addresses.push(newAddress)
      });

      $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");
      $(".contact").last().click(function() {
        var thisContact = $(this);
        $("#show-contact").children().remove()
        $("#show-contact").append(showBox);
        $("#delete-button").last().click(function() {
          thisContact.parent().remove();
          $("#show-contact").hide();
        });
        $("#show-contact").fadeIn();
        $("#show-contact h2").text(newContact.fullName());
        $(".first-name").text(newContact.firstName);
        $(".last-name").text(newContact.lastName);
        $("ul#addresses").text("");
        newContact.addresses.forEach(function(address) {
          $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
        });
      });
      $(".removable-address").remove();
      resetFields();

    });
  });
