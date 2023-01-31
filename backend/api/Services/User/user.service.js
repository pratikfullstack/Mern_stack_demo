const User = require("../User/user.modal");
const pagination = require("../../../helper/pagination");
const bcrypt = require("bcryptjs");


exports.create = async (file, user) => {
  try {
    const existUser = await User.findOne({ email: user.email.trim() });
    if (existUser != null) {
      return {
        success: false,
        message: "User already exists",
        data: null,
      };
    }

    const info = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      userImg: file.path,
    });

    const userData = await info.save();
    if (userData) {
      return {
        success: true,
        message: "User created successfully",
        data: userData,
      };
    } else {
      await User.findByIdAndDelete(userData.id);
      return {
        success: false,
        message: messageMail,
        data: {},
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ERROR_ADDING_USER_DETAILS",
      data: error.message,
    };
  }
};

exports.Exists = async (where) => {
  try {
    const user = await User.findOne(where);
    if (user) {
      return { success: true, message: "User found!", data: user };
    } else {
      return {
        success: false,
        message: "User not found!",
        data: {},
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "User not found!",
      data: null,
    };
  }
};

exports.update = async (params_id, user) => {
  try {
    const options = { new: true };
    const result = await User.findByIdAndUpdate(params_id, user, options);
    if (result) {
      return {
        success: true,
        message: "User updated!",
        data: result,
      };
    } else if (!result) {
      return {
        success: false,
        message: "User not updated!",
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error,
      data: null,
    };
  }
};

exports.softDelete = async (params_id) => {
  try {
    const result = await User.findByIdAndUpdate(params_id, { isActive: false });
    if (result) {
      return {
        success: true,
        message: "User Deleted!",
        data: result,
      };
    } else {
      return {
        success: false,
        message: "User not Found!",
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error,
      data: null,
    };
  }
};

exports.list = async (where, datum) => {
  try {
    const respose = await pagination.list(User, where, datum);
    if (respose) {
      return {
        success: true,
        message: "User Data found!",
        data: respose,
      };
    } else {
      return {
        success: false,
        message: "User data not found!",
        data: respose,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error,
      data: null,
    };
  }
};
