import express from "express"
import cors from "cors"
import 'dotenv/config'
import songRouter from "./src/routes/songRoute.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import albumRouter from "./src/routes/albumRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors());

// Initialising Routes
app.use("/api/song", songRouter);
app.use('/api/album', albumRouter);

app.get('/', (req, res) => res.send(`
    <html>
      <body>
        <h1>Welcome to the Server Page</h1>
        <h3>API Working Successfully.</h3>
        <p>Click <a href="https://spotify-clone-frontend-5yba.onrender.com/" target="_blank">Spotify Clone</a> to go back to the Home Page</p>
      </body>
    </html>
  `));

app.listen(port, () => console.log(`Server Started on ${port}`));
