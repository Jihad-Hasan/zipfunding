
var step = 1;

$(document).ready(function () {
  stepProgress(step);
});

$(".next").on("click", function () {
  // Perform validation before proceeding to the next step
  if (!validateFields(step)) {
    alert('Please fill in all the fields.');
    return;
  }


  if (step < $(".step").length) {
    $(".step").hide();
    $(".step").eq(step).show();
    stepProgress(++step);
  }
console.log(step)
  hideButtons(step);
});





function nextStepWithValidation(step) {
    if (step === 6) {
        var email = $("#email-step-6").val();
        if (!validateEmail(email)) {
            alert('Please enter a valid email.');
            return;  // Stop here if email is invalid
        }
    } else if (step === 10) {
        var phone = $("#phone-step-10").val();
        if (!validatePhoneNumber(phone)) {
            alert('Please enter a valid phone number.');
            return;  // Stop here if phone number is invalid
        }
    }

    // Move to the next step
    if (step < $(".step").length) {
        $(".step").hide();
        $(".step").eq(step).show();
        stepProgress(++step);
    }

    hideButtons(step);
}






// ON CLICK BACK BUTTON
$(".back").on("click", function () {
  if (step > 1) {
    step = step - 2;
    $(".next").trigger("click");
  }
  hideButtons(step);
});

// CALCULATE PROGRESS BAR
stepProgress = function (currstep) {
  var percent = parseFloat(100 / $(".step").length) * currstep;
  percent = percent.toFixed();
  $(".progress-bar")
    .css("width", percent + "%");
};

// DISPLAY AND HIDE "NEXT", "BACK" AND "SUMBIT" BUTTONS
hideButtons = function (step) {
  var limit = parseInt($(".step").length);
  $(".action").hide();
  if (step < limit) {
    $(".next").show();
  }
  if (step > 1) {
    $(".back").show();
  }
  if (step == limit) {
    $(".next").hide();
    $(".submit").show();
  }
};

// Validate the input fields for the current step
if(step !==6 || step !== 10){

function validateFields(step) {
  var isValid = true;
  var currentStepFields = $(".step").eq(step - 1).find("select, input");

  currentStepFields.each(function () {
    if ($(this).val() === '') {
      isValid = false;
      return false; // Stop the loop on first empty field
    }
  });

  return isValid;
}
}
// Validate email format
function validateEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number format
function validatePhoneNumber(phoneNumber) {
  var phoneRegex = /^\d{10}$/; // Change this regex based on your phone number format
  return phoneRegex.test(phoneNumber);
}

// Validate email and phone number on the last step
$(".submit").on("click", function () {
  // Handle submission logic here
  alert('Form submitted successfully!');
});