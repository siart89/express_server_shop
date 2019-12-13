import express from 'express';
import useragent from 'express-useragent';
import uniqid from 'uniqid';
import multer from 'multer';
import path from 'path';
import registration from './components/registration';
import { authentication } from './components/authentication';
import { authorization } from './components/authorization';
import refreshToken from './components/refreshToken';
import setAvatar from './components/setAvatar';
import addBook from './components/addBook';
import userBookList from './components/userBookList';
import bookInfo from './components/bookInfo';
import favorites from './components/favorites';
import comments from './components/comments';
import bookRating from './components/bookRating';


// create server
const app = express();
app.set('trust proxy', true);

const port = (process.env.PORT || 8080);

app.listen(port, (err) => {
  if (err) {
    console.log('Server is not started, error : ', err);
  } else {
    console.log('Server is started');
  }
});


// use information of client os / browser ..etc
app.use(useragent.express());

app.use('/resources', express.static(path.join(__dirname, 'uploads')));

// Create upload folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './server/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uniqid()}${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });


// **REGISTRATION--------------
registration(app);
// **AUTHETICATION-----------------
authentication(app);
// **AUTHORIZATION--------------------
authorization(app);
// **REFRESH TOKEN ------------------
refreshToken(app);
// Add Avatar picture
setAvatar(app, upload);
// ADD USERS BOOK TO DB
addBook(app, upload);
// ** GET USER BOOKLIST
userBookList(app);
// GET BOOK INFO from Book card
bookInfo(app);
// SET FAVORITES
favorites(app);
// Comments
comments(app);
// Book rating
bookRating(app);
