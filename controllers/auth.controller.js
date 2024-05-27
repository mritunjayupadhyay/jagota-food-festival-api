import {asyncHandler} from "../utils/async.utils.js";
import { ApiResponse } from "../utils/response.utils.js";

  const loginSalesPerson = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
  
   
    return res
    .status(401)
    .json(
        new ApiResponse(
        200,
        null, // send access token in response if client decides to save them by themselves
        "Invalid Url now"
        )
    );
  });

export { loginSalesPerson }