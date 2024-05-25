const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/timetable", require("./routes/timetableRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/classroom", require("./routes/classroomRoutes"));
app.use("/api/resources", require("./routes/resourcesRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
