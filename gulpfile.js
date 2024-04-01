const gulp = require("gulp")
const gulpSass = require('gulp-sass')
const dartSass = require("dart-sass");
const sass = gulpSass(dartSass);

gulp.task("copyHtmlFiles", () => {
  return gulp.src('src/html/*.html')
      .pipe(gulp.dest('./dist'));
});

gulp.task("copyThirdParty", () => {
  return gulp.src('third_party/*')
      .pipe(gulp.dest('./dist/third_party'));
});
gulp.task("copySqliteWorker", () => {
  return gulp.src('node_modules/@magieno/sqlite-client/dist/bundle/sqlite-client-worker.js')
      .pipe(gulp.dest('./dist/third_party'));
});
gulp.task("copySqliteWasm", () => {
  return gulp.src('node_modules/@sqlite.org/sqlite-wasm/sqlite-wasm/jswasm/*')
      .pipe(gulp.dest('./dist/third_party'));
});

gulp.task("buildCss", () => {
  return gulp.src('./src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task("build", gulp.series("copyHtmlFiles", "copyThirdParty", "buildCss", "copySqliteWorker", "copySqliteWasm"));