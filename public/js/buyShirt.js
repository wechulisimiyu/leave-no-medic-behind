const isStudent = document.getElementById("yes");
const isNonStudent = document.getElementById("no");
const studentStatus = document.getElementById("studentStatus");
const registrationNumber = document.getElementById("regNumber");
const buying = document.getElementById("buying");
const donating = document.getElementById("donating");
const attend = document.getElementById("attend")
const university = document.getElementById("university")
const fullNameDiv = document.getElementById("full-name");
const emailAddressDiv = document.getElementById("email-address");
const phoneNumberDiv = document.getElementById("phone-number");
const kinDiv = document.getElementById("kin-div");
const kinNumberDiv = document.getElementById("kin-number-div");
const levelDiv = document.getElementById("level");
const amountDiv = document.getElementById("amount-div");
const shirtInfo = document.querySelector(".shirts");
const pickUp = document.querySelector(".pick-up-point");
const pickUpSelect = document.getElementById("pickUp");
const tshirtType = document.getElementById("tshirtType");
const tshirtNumber = document.getElementById("quantity");
const confirmDiv = document.getElementById("confirmDiv");
const totalAmountSpan = document.getElementById("totalAmount")
const totalAmountInput = document.getElementById('totalAmountInput');

//event listeners to trigger the calculation function
tshirtType.addEventListener("change", calculateTotalAmount);
tshirtNumber.addEventListener("change", calculateTotalAmount);
studentStatus.addEventListener("change", calculateTotalAmount);

isStudent.addEventListener("change", () => {
  registrationNumber.style.display = "block";
  university.style.display = "block";
  levelDiv.style.display = "block";
});

isNonStudent.addEventListener("change", () => {
  registrationNumber.style.display = "none";
  university.style.display = "none";
  levelDiv.style.display = "none";
});

buying.addEventListener("change", () => {
  fullNameDiv.style.display = "block";
  emailAddressDiv.style.display = "block";
  phoneNumberDiv.style.display = "block";
  amountDiv.style.display = "none";
  shirtInfo.style.display = "block";
  pickUp.style.display = "block";
  attend.style.display= "block";
  kinDiv.style.display = "block";
  kinNumberDiv.style.display= "block";
  confirmDiv.style.display="block";
});

donating.addEventListener("change", () => {
  fullNameDiv.style.display = "block";
  emailAddressDiv.style.display = "block";
  phoneNumberDiv.style.display = "block";
  amountDiv.style.display = "block";
  shirtInfo.style.display = "none";
  pickUp.style.display = "none";
  attend.style.display = "none";
  confirmDiv.style.display = "none";
});

donating.addEventListener("change", function () {
  if (this.checked) {
    amountDiv.required = true;
  } else {
    amountDiv.required = false;
  }
});

donating.addEventListener("change", function () {
  if (this.checked) {
    pickUpSelect.required = false;
  } else {
    pickUpSelect.required = true;
    pickUpSelect.value = "none";
  }
});


function calculateTotalAmount() {
  const tshirtTypeValue = tshirtType.value;
  const tshirtQuantityValue = tshirtNumber.value;
  const studentStatusYes = document.querySelector(
    'input[name="student"][value="yes"]'
  ).checked;
  const studentStatusNo = document.querySelector(
    'input[name="student"][value="no"]'
  ).checked;
  let tshirtPrice = 0;

  // determine the tshirt price based on the type and student status
  if (tshirtTypeValue === "round") {
    tshirtPrice = studentStatusYes ? 600 : 1000;
  } else if (tshirtTypeValue === "polo") {
    tshirtPrice = studentStatusYes ? 1000 : 2000;
  }

  // calculate the total amount and update the element
  const totalAmount = tshirtPrice * tshirtQuantityValue;
  totalAmountSpan.textContent = totalAmount;
  totalAmountInput.value = totalAmount;
}
