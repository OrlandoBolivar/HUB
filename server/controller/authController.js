const createError = require("http-errors");

// exports.register = async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;
//     const doesExist = await Customer.findOne({ email: email });
//     if (doesExist) throw createError.Conflict(`${email} already exist!`);
//     res.status(200).json({
//       message: "Register Successful",
//         });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

// exports.login = async (req, res, next) => {
//   try {
//     console.log(req.body);
//     const { email, password } = req.body;
//     const customer = await Customer.findOne({ email: email });

//     if (!customer) throw createError.NotFound("User not registered");

//     const isMatch = await customer.isValidPassword(password);
//     if (!isMatch) throw createError.Unauthorized("Username/Password not valid");

//     console.log(customer);

//     const { _id, role, name } = customer;

//     res.status(200).json({
//       message: "Login Successful",
//     });
//   } catch (error) {
//     next(error);
//   }
// };


