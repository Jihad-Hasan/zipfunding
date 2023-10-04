var step = 1;
var fundingNeed, timeInBusiness, avgBankingDeposits, creditScore, hasBusinessChecking, email, firstName, lastName, phoneNumber, companyName, businessIndustry;

$(document).ready(function () {
  stepProgress(step);
});

$(".action").on("click", function () {
  if (!validateFields(step)) {
    return;
  }
  if (step < $(".step").length) {
    updateSelectedValues(step);

    $(".step").hide();
    $(".step").eq(step).show();
    stepProgress(++step);
  }
});

function nextStepWithValidation() {
  if (step === 6) {
    var email = $("#email-step-6").val();
    if (!validateEmail(email)) {
      $("#email-step-6").addClass("form-control-red");
      return;
    }
  } else if (step === 9) {
    var phone = $("#phone-step-10").val();
    if (!validatePhoneNumber(phone)) {
      $("#phone-step-10").addClass("form-control-red");
      return;
    }
  }
  updateSelectedValues(step);

  $(".step").hide();
  $(".step").eq(step).show();
  stepProgress(++step);
}




stepProgress = function (currstep) {
  var percent = parseFloat(100 / $(".step").length) * currstep;
  percent = percent.toFixed();
  $(".progress-bar")
    .css("width", percent + "%");
};

$(".step select input").on("change", function () {
  $(this).removeClass("form-control-red");
});

function validateFields(step) {

  var isValid = true;
  var currentStepFields = $(".step").eq(step - 1).find("#validation");

  currentStepFields.each(function () {
    if ($(this).val() === '') {
      isValid = false;
      $(this).addClass("form-control-red");
      return false;
    } else {
      $(this).removeClass("form-control-red");
    }
  });

  return isValid;
}


// Validate email format
function validateEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number format
function validatePhoneNumber(phoneNumber) {
  var phoneRegex = /^\d{11}$/; // Change this regex based on your phone number format
  return phoneRegex.test(phoneNumber);
}

// Object to hold all the data
const formData = {
  fundingNeed: '',
  timeInBusiness: '',
  avgBankingDeposits: '',
  creditScore: '',
  hasBusinessChecking: '',
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  companyName: '',
  businessIndustry: ''
};

function sendToWebhook(data) {

  fetch('', {
      method: 'POST',
      mode: "no-cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      console.log('Request sent. Status:', response.status);
    })
    .catch(error => {
      console.error('Error:', error);
    });

}


function updateSelectedValues(step) {
  switch (step) {
    case 1:
      formData.fundingNeed = $(".fundingNeed").val();
      break;
    case 2:
      formData.timeInBusiness = $(".timeInBusiness").val();
      break;
    case 3:
      formData.avgBankingDeposits = $(".avgBankingDeposits").val();
      break;
    case 4:
      formData.creditScore = $(".creditScore").val();
      break;
    case 5:
      formData.hasBusinessChecking = $("input[name='flexRadioDefault']:checked").val();
      break;
    case 6:
      formData.email = $("#email-step-6").val();
      break;
    case 7:
      formData.firstName = $(".firstName").val();
      break;
    case 8:
      formData.lastName = $(".lastName").val();
      break;
    case 9:
      formData.phoneNumber = $("#phone-step-10").val();
      break;
    case 10:
      formData.companyName = $(".companyName").val();
      break;
    case 11:
      formData.businessIndustry = $(".businessIndustry").val();
      break;
    default:
      break;
  }

  if (step === 11) {
    sendToWebhook(formData);
  }
}