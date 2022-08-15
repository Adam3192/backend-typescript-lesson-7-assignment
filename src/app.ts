import express, { NextFunction, Request, Response } from 'express';
import jobRoutes from './routes/jobRoutes';
import { defaultJobs } from './controllers/jobsController';
import path from 'path';
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Setting our view engine as Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "../src/views"));
app.set('view options', {layout: 'layout'});

app.use(express.static(path.join(__dirname, '../src/public')));

// TODO: Add routing middleware here
app.use('/jobs', jobRoutes);
app.use('/', defaultJobs);
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).render('error', {
        message: "This is not the URL you are looking for!"
    });
})

app.listen(3000);

