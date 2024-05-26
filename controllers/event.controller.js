import { ApiResponse } from "../utils/response.utils.js";
import { asyncHandler } from "../utils/async.utils.js";
import { isDate } from "../utils/date.utils.js";
import { Event } from "../models/Event.model.js";

 
const getEvents = asyncHandler(async (req, res) => {
  
    const events = await Event.find()

    return res
    .status(200)
    .json(
      new ApiResponse(200, events)
    );
});

const validateEvent = (event) => {
    const { name, code, fromDate, toDate } = event;
    if (!name || name.trim() === "") {
      return "Invalid name";
    }
    if (!code || code.trim() === "") {
      return "Invalid code";
    }
    if (!fromDate || fromDate.trim() === "" || isDate(fromDate) === false){

      return "Invalid from date";
    }
    if (!toDate || toDate.trim() === "" || isDate(toDate) === false) {
      return "Invalid to date";
    }
    return null;
}

const createEvent = asyncHandler(async (req, res) => {
    const {
      name,
      code,
      fromDate,
      toDate,
      thumbnail,
      orderBy,
    } = req.body;
  
    const error = validateEvent(req.body);
    if (error) {
      return res.status(400).json(new ApiResponse(400, null, error));
    }

    const existedEvent = await Event.findOne({
      code,
    });
  
    if (existedEvent) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, { existedEvent }, "event already exists")
        );
    }
    const event = await Event.create({
      name,
      code,
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
      thumbnail,
      orderBy,
    });
  
    await event.save();
  
    const createdEvent = await Event.findById(event._id);
  
    if (!createdEvent) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            null,
            "Something went wrong while creating the event"
          )
        );
    }
  
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          event,
          "Customer is created."
        )
      );
  });

export { getEvents, createEvent };