const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const newer = require("gulp-newer");
const imageResize = require("gulp-image-resize")
const imagemin = require("gulp-imagemin");
const imgCompress = require("imagemin-jpeg-recompress");

function styles() {
    return gulp.src("app/sass/**/*.scss")
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: "Styles",
                    message: err.message + " on line " + err.line,
                };
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(concat("styles.min.css"))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ level: 2 }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream())
}

function scripts() {
    return gulp.src([
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/mmenu-js/dist/mmenu.js",
        "node_modules/owl.carousel/dist/owl.carousel.js",
        "app/libs/equalHeight/src/jquery.equalheights.js",
        "app/libs/fotorama/fotorama.js",
        "app/libs/selectize/js/standalone/selectize.min.js",
        "app/js/common.js"
    ])
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: "Scripts",
                    message: err.message + " on line " + err.line,
                };
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(concat("scripts.min.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("app/js"))
        .pipe(browserSync.stream())
}

function images(done) {
    [100, 300, 800, 1000, 2000].forEach(function (size) {
        gulp.src("app/img/src/**/*.{png,jpg,jpeg,webp,raw}")
        .pipe(newer("app/img/" + size))
        .pipe(imageResize({width: size}))
        .pipe(imagemin([
            imgCompress({
                loops: 4,
                min: 70,
                max: 80,
                quality: 'high'
            }),
            imagemin.gifsicle({ interlaced: true }),
            imagemin.optipng({ optimizationLevel: 5 })            
        ]))
        .pipe(gulp.dest("app/img/" + size))
        .pipe(browserSync.stream());
    });    
    done();
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });

    gulp.watch("app/**/*.html").on("change", browserSync.reload);
    gulp.watch("app/sass/**/*.scss", gulp.series(styles));
    gulp.watch(["app/js/common.js"], gulp.series(scripts));
    gulp.watch("app/img/src/**/*.{png,jpg,jpeg,webp,raw}", gulp.series(images))
}

exports.default = gulp.series(gulp.parallel(styles, scripts, images), watch);