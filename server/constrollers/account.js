import express from "express";
const router = express.Router();
import Account from "../models/account.js";
import bcryptjs from "bcryptjs"; //Password crypt
import Jwt from "jsonwebtoken"; //Manage TOKENS
import mongoose from "mongoose";

router.post("/createAccount", async (req, res) => {
  const user = req.body.user;
  const id = new mongoose.Types.ObjectId();

  Account.findOne({ email: user.email })
    .then(async (account) => {
      if (account) {
        return res.status(401).json({
          message: "Account is not available",
        });
      } else {
        const hash = await bcryptjs.hash(user.password, 10);
        const _account = new Account({
          _id: id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: hash,
          verficationCode: generateRandomIntegerInRange(1000, 9999),
          mobile: user.mobile,
        });
        _account
          .save()
          .then((accountCreaterd) => {
            return res.status(200).json({
              message: accountCreaterd.verficationCode,
            });
          })
          .catch((error) => {
            return res.status(500).json({
              message: error.message,
            });
          });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
});

router.post("/login", async (req, res) => {
  const user = req.body.user;
  Account.findOne({ email: user.email })
    .then(async (account) => {
      if (account) {
        const isMatch = await bcryptjs.compare(user.password, account.password);
        if (isMatch && account.isVarified) {
          const dataTotoken = {
            _id: account._id,
            firstName: account.firstName,
            lastName: account.lastName,
            email: account.email,
          };
          const token = await Jwt.sign({ dataTotoken }, process.env.JWT_KEY);
          return res.status(200).json({
            message: token,
          });
        } else {
          return res.status(401).json({
            message: "Password not match or account not verified yet",
          });
        }
      } else {
        return res.status(401).json({
          message: "Account not exist",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
});

router.put("/verifyNewAccount", (req, res) => {
  const { email, passcode } = req.body;
  Account.findOne({ email })
    .then((account) => {
      if (account.verficationCode.toString() === passcode.toString()) {
        account.isVarified = true;
        return account.save().then(() => {
          return res.status(200).json({
            status: true,
            message: "Your account was verifyed succssfuly!",
          });
        });
      }
      return res.status(200).json({
        status: false,
        message: "You have entered wrong verification code!",
      });
    })
    .catch((error) => {
      return res.status(401).json({
        status: false,
        message: error.message,
      });
    });
});

router.put("/getNewVerificationCode", (req, res) => {
  const { email } = req.body;
  Account.findOne({ email })
    .then((account) => {
      console.log(account);
      account.verficationCode = generateRandomIntegerInRange(1000, 9999);
      return account.save().then((updated_account) => {
        return res.status(200).json({
          message: updated_account.verficationCode,
        });
      });
    })
    .catch((error) => {
      return res.status(401).json({
        status: false,
        message: error.message,
      });
    });
});

function generateRandomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default router;
