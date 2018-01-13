const gulp = require('gulp')
const ts = require('gulp-typescript')
const tsProject = ts.createProject('tsconfig.json')
const standard = require('gulp-standard')
const sourcemaps = require('gulp-sourcemaps')

const jsFolder = './lib'

gulp.task('default', function () {
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js
    .pipe(standard({
      fix: true
    }))
    .pipe(sourcemaps.write({sourceRoot: '/lib'}))
    .pipe(gulp.dest(jsFolder))
})
