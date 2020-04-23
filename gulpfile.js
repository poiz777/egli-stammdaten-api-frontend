const gulp                  = require('gulp');
const sass                  = require('gulp-sass');
const autoprefixer          = require('gulp-autoprefixer');
const { series, parallel }  = require('gulp');


const processSass       = (done) => {
    const procedure = gulp.src('./src/assets/scss/**/*.sass')                       // Get source files with gulp.src
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))         // Sends it through a gulp plugin
        .pipe(gulp.dest('./src/assets/css'));                                       // Outputs the file in the destination folder
    done();
    return procedure;
};


const processScss       = (done) => {
    const procedure = gulp.src('./src/assets/scss/**/*.scss')                       // Get source files with gulp.src
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))         // Sends it through a gulp plugin
        .pipe(gulp.dest('./src/assets/css'));                                       // Outputs the file in the destination folder
    done();
    return procedure;
};



const processCss        = (done) => {
    const procedure = gulp.src('./src/assets/css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./assets/css'));
    done();
    return procedure;
};


const observeSass       = (done) => {
    gulp.watch('./src/assets/scss/**/*.scss', gulp.series(processSass, processScss, processCss) );
    done();
};


exports.default = series(
    processSass,
    processScss,
    processCss,
    observeSass,
);

exports.observe = series(
    observeSass,
);

exports.build = series(
    processSass,
    processCss,
);
