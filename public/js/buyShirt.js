const isStudent = document.getElementById("yes");
const isNonStudent = document.getElementById("no");
const studentStatus = document.getElementById("studentStatus");
const registrationNumber = document.getElementById("regNumber");
const buying = document.getElementById("buying");
const donating = document.getElementById("donating");
const fullNameDiv = document.getElementById("full-name");
const emailAddressDiv = document.getElementById("email-address");
const phoneNumberDiv = document.getElementById("phone-number");
const amountDiv = document.getElementById("amount-div");
const shirtInfo = document.querySelector(".shirts");
const pickUp = document.querySelector(".pick-up-point");
const pickUpSelect = document.getElementById("pickUp");
const tshirtType = document.getElementById("tshirtType");
const tshirtNumber = document.getElementById("quantity");

//event listeners to trigger the calculation function
tshirtType.addEventListener("change", calculateTotalAmount);
tshirtNumber.addEventListener("change", calculateTotalAmount);
studentStatus.addEventListener("change", calculateTotalAmount);

isStudent.addEventListener("change", () => {
  registrationNumber.style.display = "block";
});
isNonStudent.addEventListener("change", () => {
  registrationNumber.style.display = "none";
});

buying.addEventListener("change", () => {
  fullNameDiv.style.display = "block";
  emailAddressDiv.style.display = "block";
  phoneNumberDiv.style.display = "block";
  amountDiv.style.display = "none";
  shirtInfo.style.display = "block";
  pickUp.style.display = "block";
});

donating.addEventListener("change", () => {
  fullNameDiv.style.display = "block";
  emailAddressDiv.style.display = "block";
  phoneNumberDiv.style.display = "block";
  amountDiv.style.display = "block";
  shirtInfo.style.display = "none";
  pickUp.style.display = "none";
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
  const studentStatusValue = studentStatus.value;
  let tshirtPrice = 0;

  // determine the tshirt price based on the type and student status
  if (tshirtTypeValue === "round") {
    tshirtPrice = studentStatusValue === "yes" ? 600 : 1000;
  } else if (tshirtTypeValue === "polo") {
    tshirtPrice = studentStatusValue === "yes" ? 1000 : 2000;
  }

  // calculate the total amount and update the element
  const totalAmount = tshirtPrice * tshirtQuantityValue;
  document.getElementById("totalAmount").textContent = totalAmount;
}
