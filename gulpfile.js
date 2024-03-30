const gulp = require("gulp")
const sass = require('gulp-sass')(require('sass'));

gulp.task("copyHtmlFiles", () => {
  return gulp.src('html/*.html')
      .pipe(gulp.dest('./dist/'));
});

gulp.task("copyThirdParty", () => {
  return gulp.src('third_party')
      .pipe(gulp.dest('./dist/third_party'));
});

gulp.task("buildCss", () => {
  return gulp.src('./scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task("build", gulp.series("copyHtmlFiles", "copyThirdParty", "buildCss"));