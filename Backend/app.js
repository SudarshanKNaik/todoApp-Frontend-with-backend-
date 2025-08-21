// Core Module
const path = require('path');

// External Module

const MongoDBStore = require('connect-mongodb-session')(session);
const { default: mongoose } = require('mongoose');
const DB_PATH = "mongodb+srv://root:root@todo.u1asz.mongodb.net/airbnb?retryWrites=true&w=majority&appName=CompleteCoding";
const errorsController = require('./controller/error');
//Local Module

const app = express();


app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, 'public')));
app.use(errorsController.pageNotFound);

const PORT = 3003;

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});
