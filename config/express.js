import express from 'express';
import consign from 'consign';
import morgan from 'morgan';
import compress from 'compression'
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import {sessionSecret} from './config';
import passport from 'passport';
import flash from 'connect-flash';

const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
	app.use(compress());
};

app.set('view engine', 'ejs');
app.set('views','./app/views');
app.set('json spaces', 2);
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
	secret: sessionSecret,
	resave: true,
	saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

consign({cwd: 'app', verbose: false})
	.include('controllers')
	.then('routes')
	.into(app);

app.use(express.static('./public'));

module.exports = app;
