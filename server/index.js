const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { fileURLToPath } = require('url');
const dbConnection = require('./config/dbConn');
const { register } = require('./controllers/auth.js')
const authRoutes = require('./routes/auth.js')
const userRoutes = require('./routes/users.js')
const postRoutes = require('./routes/posts.js');
const verifyToken = require('./middleware/auth.js');
const { createPost } = require('./controllers/posts.js')
const User = require('./model/User.js')
const Post = require('./model/Post.js')
const { users, posts } = require('./data/index.js')



// Configuration Middleware
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


// Setting up the file storage
// This is when anyone uploads file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

// For saving
const upload = multer({ storage });

//routes with files
//upload the picture locally in public/asseets folder
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);


app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes)



// Setting up mongoose
const PORT = process.env.PORT || 8080;
dbConnection().then(() => {
    app.listen(PORT, () => {
        console.log('Server listening on PORT ', PORT);

        // //add data just once
        // User.insertMany(users);
        // Post.insertMany(posts)
    });
}).catch((error) => console.log(error));
