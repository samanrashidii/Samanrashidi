$(document).ready(function(){

// Test Function

var Testing = function(testText){
  console.log(testText);
}

// Get the Current Year

var thisYear = new Date().getFullYear();
$('.current-year').html(thisYear);

// Textarea Character Left

var charLeft;

$('.textarea-word-tracker textarea').on('keyup load', function () {
  charLeft = 250 - $(this).val().length;
  if (charLeft < 0) {
      charLeft = 0;
  }
  $(this).siblings('span').text(charLeft);
});

$(window).load( function() {
    $('.textarea-word-tracker textarea').each( function () {
        charLeft = 250 - $(this).val().length;
        $(this).siblings('span').text(charLeft);    
    });
});

// Static Content ol li number

$(window).load(function(){
  var StaticliNumber = $('.static-content ol li').length;
  for(var i = 1; i <= StaticliNumber; i++){
    $('.static-content ol li:nth-child('+i+')').attr('list-number', i+' -');
  }
});

// Number Bullet

$(window).load(function(){
  var liNumber = $('.number-bullet li').length;
  for(var i = 1; i <= liNumber; i++){
    $('.number-bullet li:nth-child('+i+')').attr('list-number', i+' -');
  }
});  

// Responsive Table

$(window).load(function(){
  $('.table.responsive').each(function(){  
    for (var i = 1; i <= $(this).find('th').length ; i++) {
      var thVal = $(this).find('th:nth-child('+i+')').html();
      $(this).find('td:nth-child('+i+')').attr('th-data', thVal);
    };
  });
});

// Message Popup

var MessagePopup = function(){
  $('.message').addClass('active');
  setTimeout(function(){
    $('.message').removeClass('active');
  },5000);
} 

// Select Menu

if($(window).width() > 980){
  $(function() {
      $( ".ui-selectmenu" ).selectmenu();
  });
}

// Form Validate

$('.number-field').numeric();

$('form').validate({
  rules: {
    nickname: {
      required: true,
      minlength: 5
    },
    email_address: {
      required: true,
      minlength: 5,
      email:true
    },
    password: {
      required: true,
      minlength: 8
    },
    confirm_password: {
      required: true,
      minlength : 8,
      equalTo : "#password"
    },
    mobile: {
      required: true,
      minlength: 5,
      number:true
    }
  },
  messages: {
    nickname: "Please Enter Your Nickname",
    email_address: "Please Enter Your Email Address",
    password: "Please Enter Your Password",
    confirm_password: "Please Confirm Your Password",
    mobile: "Please Enter Your Mobile Number"
  },
  errorPlacement: function(error, element) {
    error.insertAfter(element);
  },
  submitHandler: function (form) {
    if($('.samanira_secure').val() == '') {
      $.ajax({
        type: "POST",
        url: "mail.php",
        data: $(form).serialize(),
        success: function () {
            $('.contact_form :input').prop('disabled', true);
            $('.message.success').addClass('active'); 
            setTimeout(function(){
              $('.message.success').removeClass('active');
            },5000);
        }
      });
      return false; // required to block normal submit since you used ajax
    } else {
      $('.contact_form input[type="submit"]').prop('disabled', true);
      return false;
    }
  }

});

});