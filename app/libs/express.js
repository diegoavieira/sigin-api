import express from 'express';
import consign from 'consign';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';

const app = express();
const router = express.Router();

app.set('json spaces', 2);
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());

router.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.errors = req.flash('error');
	res.locals.infos = req.flash('info');
	next();
});

consign({cwd: 'app', verbose: false})
	.include('libs/config.js')
	.then('libs/database.js')
	.then('controllers')
	.then('routes')
	.into(app);

module.exports = app;
