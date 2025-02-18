const socketIo = require("socket.io");
const userModel = require("./models/user");
const captainModel = require("./models/captain");
const mapServices = require("./services/map");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
     origin: "https://godrive-1.onrender.com",
      methods: ["GET", "POST"],
    },
    credentials: true,
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });

      const captainsInRadius = await mapServices.getCaptainsInTheRadius(
        location.ltd,
        location.lng,
        1
      );
      captainsInRadius.forEach((captain) => {
        socket.emit("captain-location", {
          captainId: captain._id,
          location: captain.location,
        });
      });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

const sendMessageToSocketId = (socketId, messageObject) => {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
};

module.exports = { initializeSocket, sendMessageToSocketId };
