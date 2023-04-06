var gulp = require('gulp')
//task is method in gulp wee have to name it as default
gulp.task('default', function () {
  //use src method and take in src folder all html file if there are many file use pipe() and give a destination as dist folder
  return gulp.src('src/**/*.html').pipe(gulp.dest('dist'))
})
// type gulp in terminal then html file willbe copied and pasted in dist folder

//new method of above
//here we import all methods from gulp
const { src, dest, series,parallel,watch } = require('gulp')
const jsPaths = ['src/js/**/*.js']
const del= require('del');//we have to install it npm i del -D
const connect=require('gulp-connect')//npm i-D gulp-connect
const minifycss=require('gulp-csso')//NPM I GULP-CSSO -D
const rename=require('gulp-rename')//npm i gulp-rename -D
const sourceMaps=require('gulp-sourcemaps')// npm i gulp-sourcemaps -D
const babel=require(gulp-babel)
const imgPaths = ['src/images/**']
const saas=require("gulp-saas");
const saasPaths = ['src/sass/style.scss']
//to delete folders and file in dist folder
function clean(){
    return del('dist/**')
}


function copyHtml() {
  //from folder                     destination folder
  return src('src/**.html').pipe(dest('dist')).pipe(connect.reload())
}
function copyJs() {
  //return src(jsPaths).pipe(dest('dist')) it copies only file not under a folder js to fix that
  return src(jsPaths)
  .pipe(babel({
    presets:['@babel/preset-env']
  }))//we say convert es6 to es5 and save it in following folder
  .pipe(dest('dist/js'))
}
function copyImages() {
  //return src(imgPaths).pipe(dest('dist'))
  return src(jsPaths).pipe(dest('dist/images'))
}
function sassToCss(){

    return src(saasPaths)
    //after reading sass file we create map for the saas and the output file
    .pipe(sourceMaps.init())
    .pipe(saas())
    .pipe(dest('dest/css'))
    //after sass process convets as css file,we need to minify that css
    .pipe(minifycss())
    .pipe(rename({extname:'.min.css'}))// we say the extension name should be .min.css for minified css files
    .pipe(sourceMaps.write())//here we say the to write the sourcemap in the folder
    .pipe(dest('dest/css'))

    //it reloads the browser automatically if we made change in sass
    .pipe(connect.reload())
}


function watchFiles(){
    //we say in this path whatever change happens  run this function 1st param is path 2nd is which function should run
    watch("src/sass/**",{delay:500},sassToCss)
    //watch has another optional param how often this should run
    watch('src/**/*.html',{delay:500},copyHtml)
}
//to connect our web to node server
function server(){
  connect.server({
    root:"dist",//we say which folder should be served
    livereload:true// if it should reload live or not
  })
}
//exports.default = copyHtml //it gives only copy html function if we type on cli we can't add copyJ and copyImages functions seperated by commas,so we need to use series() from gulp
// here clean should happen before copy html js and images that's y we use clean
//exports.default = series(clean,copyHtml, copyJs, copyImages) // it combines all method for cli
exports.default = series(clean,parallel( copyHtml, copyJs, copyImages,sassToCss),parallel(server,watchFiles) ) //it copies 3 tasks parallley