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

// Switch Button

$('.switch').on('click', function(){
  $(this).toggleClass('active');
});

// Nav Toggle

$('.nav-toggle').on('click', function(){
  $(this).toggleClass('active');
});

// Remove Button

$('a.remove').on('click', function(){
  $(this).parent().remove();
});

// Remove Button

$('a.close').on('click', function(){
  $(this).parent().hide();
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

// Upload Photo(s)

var fileUploaded = [];
var gI = 0;
window.onload = function(){   
    if(window.File && window.FileList && window.FileReader)
    {
        $('#upload_bttn').on("change", function(event) {
            var files = event.target.files;
            if(files.length <= 10){
              for(var i = 0; i < files.length; i++){
                var file = files[i];
                fileUploaded.push(file);
                if(file.type.match('image.*')){
                    if(this.files[0].size < 2097152){    
                    var picReader = new FileReader();
                    picReader.addEventListener("load",function(event){
                        var picFile = event.target;
                        if($('#uploaded-photos').children().length < 10){
                           $('#uploaded-photos').append('<div class="uploaded-photo-box"><img src="' + picFile.result + '" /><a class="remove" href="javascript:void(0)" data-attr="rm_'+ gI++ +'">&nbsp;</a></div>'); 
                        }            
                    });
                    picReader.readAsDataURL(file);
                    }else{
                      alert("Image Size is too big. Maximum size is 2MB.");
                      $(this).val("");
                    }
                }else{
                  alert("You can only upload image file.");
                  $(this).val("");
                }
              }
            }
        });
    }else{
      console.log("Your browser does not support File API");
    }
}

// Uploaded Photo Remove

$(document).on('click', '#uploaded-photos a.remove', function(){
  var removeID = $(this).data('attr');
  $(this).parents('.uploaded-photo-box').remove();
  removeID = removeID.split('_');
  fileUploaded.splice(removeID[1],1);
});

});