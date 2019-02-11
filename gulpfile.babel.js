import gulp from 'gulp'
import sass from 'gulp-sass'
import babel from  'gulp-babel'
import uglify from  'gulp-uglify'
import rename from  'gulp-rename'
import cleanCSS from  'gulp-clean-css'
import del from  'del'
import browserSync from 'browser-sync'

const server = browserSync.create();

const config = {
  paths: {
    html: {
      src: 'src/html/**/*.html',
      dest: 'build/'
    },
    styles: {
      src: 'src/sass/**/*.scss',
      dest: 'build/styles/'
    },
    scripts: {
      src: 'src/js/**/*.js',
      dest: 'build/scripts/'
    }
  },
  server:{
    server: {
      baseDir: './build'
    },
    port: 3000
  }
}

function reload( done ) {
  server.reload();
  done();
}

function serve( done ) {
  server.init(config.server);
  done();
}

function clean() {
  return del([ 'build' ]);
}

function html() {
  return gulp
    .src(config.paths.html.src)
    .pipe(gulp.dest(config.paths.html.dest));
}

function styles() {
  return gulp.src(config.paths.styles.src)
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.paths.styles.dest));
}

function scripts() {
  return gulp
    .src(config.paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.scripts.dest));
}


function watch() {
  gulp.watch(config.paths.html.src, gulp.series( html, reload ));
  gulp.watch(config.paths.scripts.src, gulp.series( scripts, reload ));
  gulp.watch(config.paths.styles.src, gulp.series( styles, reload ));
}

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;

const build = gulp.series(clean, gulp.parallel(html, styles, scripts));
const dev = gulp.series(clean, serve, gulp.parallel(html, styles, scripts), watch);

gulp.task('build', build);
gulp.task('default', dev);