const db = require("../../data/db-config");
const Account = require("../accounts/accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if (name === undefined || budget === undefined) {
    next({ status: 400, message: "name and budget are required" });
  }
  if (typeof name !== "string") {
    next({ status: 400, message: "name of account must be a string" });
  }
  if (name.trim().length < 3 || name.trim().length > 100) {
    next({
      status: 400,
      message: "name of account must be between 3 and 100 characters long",
    });
  }
  if (typeof budget !== "number" || isNaN(budget)) {
    next({ status: 400, message: "budget of account must be a number" });
  }
  if (budget < 0 || budget > 1000000) {
    next({
      status: 400,
      message: "budget of account is too large or too small",
    });
  }
  next();
};

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const exists = await db("accounts")
      .where("name", req.body.name.trim())
      .first();

    if (exists) {
      next({ status: 400, message: "That name is taken" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id);
    if (!account) {
      res.status(404).json({ message: "account not found" });
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    res.status(500).json({ message: "problem finding account" });
  }
};
