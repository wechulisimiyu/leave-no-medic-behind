const isStudent = document.getElementById("yes");
const isNonStudent = document.getElementById("no");
const studentStatus = document.getElementById("studentStatus");
const registrationNumber = document.getElementById("regNumber");
const university = document.getElementById("university")
const fullNameDiv = document.getElementById("full-name");
const emailAddressDiv = document.getElementById("email-address");
const phoneNumberDiv = document.getElementById("phone-number");
const kinDiv = document.getElementById("kin-div");
const kinNumberDiv = document.getElementById("kin-number-div");
const levelDiv = document.getElementById("level");
const tshirtType = document.getElementById("tshirtType");
const tshirtNumber = document.getElementById("quantity");
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
    tshirtPrice = studentStatusYes ? 800 : 1000;
  } else if (tshirtTypeValue === "polo") {
    tshirtPrice = studentStatusYes ? 1000 : 2000;
  }

  // calculate the total amount and update the element
  const totalAmount = tshirtPrice * tshirtQuantityValue;
  totalAmountSpan.textContent = totalAmount;
  totalAmountInput.value = totalAmount;
}
