import {asyncHandler} from "../utils/async.utils.js";
import { ApiResponse } from "../utils/response.utils.js";

  const loginSalesPerson = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res
      .status(400)
      .json(
          new ApiResponse(
          200,
          null, // send access token in response if client decides to save them by themselves
          "Username or email is required"
          )
      );
    }
  
    // Fix me later
    if (username === process.env.DEFAULT_SALES_USERNAME
        && password === process.env.DEFAULT_SALES_PASSWORD) {
            return res
        .status(200)
        .json(
            new ApiResponse(
            200,
            { user: {
                name: process.env.DEFAULT_SALES_USERNAME,
                username: process.env.DEFAULT_SALES_USERNAME,
            }, accessToken: process.env.DEFAULT_SALES_TOKEN }, // send access token in response if client decides to save them by themselves
            "User logged in successfully"
            )
        );
    }
    return res
    .status(401)
    .json(
        new ApiResponse(
        200,
        null, // send access token in response if client decides to save them by themselves
        "Username or password is incorrect"
        )
    );
  });

export { loginSalesPerson }