"use strict";

function displayName() {
  var text = $('input');
  $('html').click(function (e) {
    console.log(text.val());

    if (text.val().length != "") {
      //alert(text.val())
      //DisplayName = text.val();
      localStorage.setItem("user_name", JSON.stringify(text.val()));
      window.location.href = "/vid-room";
    } else {
      alert("Please Enter Display Name");
      window.location.href = "/";
    }
  }); // window.location.href="/vid-room"
}