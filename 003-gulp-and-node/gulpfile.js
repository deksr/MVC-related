var gulp = require('gulp');

//include the gulp-server
var connect = require('gulp-connect');


// Include Other Plugins
// var jshint = require('gulp-jshint');
// var sass = require('gulp-sass');
// var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minify = require('gulp-minify');
//******




// running the server
gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});
//******





//****** old code this also works
// Lint Task
// gulp.task('lint', function() {
//   return gulp.src('javascripts/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'));
// });


// Concatenate & Minify JS
// gulp.task('scripts', function() {
//   return gulp.src('public/javascripts/*.js')//source file

// 	  .pipe(concat('main.js'))//run concat plugin on main.js
// 	  .pipe(gulp.dest('dist'))//once finished dump in dist folder

// 	  .pipe(rename('main.min.js'))//run rename plugin and rename it to min.js
// 	  // .pipe(uglify())
// 	  .pipe(gulp.dest('dist/js'))//then dump the minified version into js folder within dist folder

// 	  .pipe(connect.reload());//look for any changes in these file and automatically reload and make changes

// });
//******

//****** original code from gulp-connect
// gulp.task('html', function () {
//   gulp.src('./public/**/*.html')
//     .pipe(connect.reload());
// });

// gulp.task('watch', function () {
//   gulp.watch(['./public/**/*.html'], ['html']);
// });
 //******


//****** this code minifies
gulp.task('minify', function() {
  return gulp.src('public/javascripts/*.js')//source file
	  
	  .pipe(minify({
      ext:{
            src:'.unminfied.js',
            min:'.min.js'
        }
      }))
	  .pipe(gulp.dest('dist/js'))
	  .pipe(connect.reload());

});




// Watch Files For Changes and automatically make changes
gulp.task('watch', function () {
   gulp.watch('public/javascripts/*.js', ['minify']);
   // gulp.watch('scss/*.scss', ['sass']);

});
 

gulp.task('default', ['connect','minify','watch']);