var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify-es').default,
    fileinclude = require('gulp-ex-file-include'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    notify = require('gulp-notify'),
    basePath = require('path'),
    concat = require('gulp-concat'),
    svgmin = require('gulp-svgmin'),
    svgstore = require('gulp-svgstore'),
    imagemin = require('gulp-imagemin'),
    ftp = require('vinyl-ftp'),
    cache = require('gulp-cache');

const paths = {
    js: {
        src: [
            'src/js/vendors/jquery.min.js',
            'src/js/vendors/jquery.fancybox.min.js',
            'src/js/snippets/mask.js',
            'src/js/snippets/tab.js',
            'src/js/scripts.js'
        ],
        build: './build/js',
        watch: './src/js/**/*.js'
    },
    styles: {
        src: './src/styles/styles.scss',
        build: './build/css',
        watch: './src/styles/**/*.scss'
    },
    html: {
        src: './src/*.html',
        build: './build',
        watch: './src/*.html'
    },
    img: {
        src: './src/img/**/*.*',
        build: './build/img',
        watch: './src/img/**/*.*',
        icons: './src/img/icons/*.svg'
    },
    favicon: {
        src: './src/favicon/**/*.*',
        build: './build/favicon',
        watch: './src/favicon/**/*.*'
    },
    fonts: {
        src: './src/fonts/*.*',
        build: './build/fonts',
        watch: './src/fonts/*.*'
    }
};

gulp.task('svgIcons', function () {
    return gulp
        .src(paths.img.icons)
        .pipe(svgmin(function (file) {
            var prefix = basePath.basename(file.relative, basePath.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('./build/img'));
});


// Local Server
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './build'
        },
        notify: false,
        port: 3030,
        // online: false, // Work offline without internet connection
        // tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
    })
});

function bsReload(done) {
    browserSync.reload();
    done()
}

// SCSS Styles
gulp.task('styles', function () {
    return gulp.src(paths.styles.src)
        .pipe(sass({outputStyle: 'compressed'}).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(postcss([autoprefixer({
            overrideBrowserslist: ['last 7 versions']
        })]))
        .pipe(cleancss({level: {1: {specialComments: 0}}})) // Opt., comment out when debugging
        .pipe(gulp.dest(paths.styles.build))
        .pipe(browserSync.stream())
});

// JS
gulp.task('scripts', function () {
    return gulp.src(paths.js.src)
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.build))
        .pipe(browserSync.reload({stream: true}))
});

// HTML Live Reload
gulp.task('code', function () {
    return gulp.src(paths.html.src)
        .pipe(fileinclude())
        .pipe(gulp.dest(paths.html.build))
        .pipe(browserSync.reload({stream: true}))
});

// img task
gulp.task('img', function () {
    return gulp.src(paths.img.src)
        .pipe(cache(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 85, progressive: true}),
            imagemin.optipng({optimizationLevel: 4}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ])))
        .pipe(gulp.dest(paths.img.build))
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('removedist', function () {
    return del(['dist'], {force: true})
});

gulp.task('clearcache', function () {
    return cache.clearAll();
});


// favicon task
gulp.task('favicon', function () {
    return gulp.src(paths.favicon.src)
        .pipe(gulp.dest(paths.favicon.build))
        .pipe(browserSync.reload({stream: true}))
});


// fonts task
gulp.task('fonts', function () {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.build))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('img', gulp.parallel('img'));

gulp.task('favicon', gulp.parallel('favicon'));

gulp.task('fonts', gulp.parallel('fonts'));

gulp.task('watch', function () {
    gulp.watch(paths.styles.watch, gulp.parallel('styles'));
    gulp.watch(paths.js.watch, gulp.parallel('scripts'));
    gulp.watch(paths.html.watch, gulp.parallel('code'));
});

gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'code', 'watch'));

gulp.task('deploy', function () {
    //Файлы отправляются на этот сайт http://stroimegabaza.ru/
    var conn = ftp.create({
        host: 'rudnap.beget.tech',
        user: 'rudnap_stroimegabaza',
        password: 'C5*tir6h&v7ficWs',
        parallel: 10
    });

    var globs = [
        'build/**'
    ];
    return gulp.src(globs, {buffer: false})
        .pipe(conn.dest('/'));

});
