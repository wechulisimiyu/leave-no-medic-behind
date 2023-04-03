const studentRound = 700;
const studentPolo = 1000;
const nonStudentRound = 1000;
const nonStudentPolo = 2000;

// const verifyTshirtPurchase = (req, res, next) => {
//   const quantity = req.body.quantity;
//   const amount = req.body.totalAmount;
//   if (req.body.student === "yes") {
//     if (req.body.tshirtType === "polo") {
//       const calculatedAmount = quantity * studentPolo;
//       if (calculatedAmount === amount) {
//         next();
//       } else {
//         res.status(403).json({ message: "Invalid amount given." });
//       }
//     }
//     if (req.body.tshirtType === "round") {
//       const calculatedAmount = quantity * studentRound;
//       if (calculatedAmount === amount) {
//         next();
//       } else {
//         res.status(403).json({ message: "Invalid amount given." });
//       }
//     }
//   }
//   if (req.body.student === "no") {
//     if (req.body.tshirtType === "polo") {
//       const calculatedAmount = quantity * nonStudentPolo;
//       if (calculatedAmount === amount) {
//         next();
//       } else {
//         res.status(403).json({ message: "Invalid amount given." });
//       }
//     }
//     if (req.body.tshirtType === "round") {
//       const calculatedAmount = quantity * nonStudentRound;
//       if (calculatedAmount === amount) {
//         next();
//       } else {
//         res.status(403).json({ message: "Invalid amount given." });
//       }
//     }
//   }
// }

const verifyTshirtPurchase = (req, res, next) => {
  const { quantity, totalAmount, tshirtType, student } = req.body;
  let calculatedAmount;

  switch (tshirtType) {
    case "polo":
      calculatedAmount =
        quantity * (student === "yes" ? studentPolo : nonStudentPolo);
      break;
    case "round":
      calculatedAmount =
        quantity * (student === "yes" ? studentRound : nonStudentRound);
      break;
    default:
      return res.status(403).json({ message: "Invalid tshirt type." });
  }

  if (calculatedAmount === totalAmount) {
    next();
  } else {
    res.status(403).json({ message: "Invalid amount given." });
  }
};

module.exports = verifyTshirtPurchase;
