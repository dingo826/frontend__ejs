const path = require('path');

const gulp = require('gulp');
const babel = require('gulp-babel');                //ES6转ES5
const uglify = require('gulp-uglify');              //压缩js文件
const cssnano = require('gulp-cssnano');            //压缩css文件
const concat = require('gulp-concat');              //合并文件
const fileinclude = require('gulp-file-include');   //文件中用include
const rename = require('gulp-rename');              //重命名文件
const ejs = require("gulp-ejs");                    //JS模板
const es2015 = require('babel-preset-es2015');

const webpack = require('webpack');
const less = require("gulp-less");
const clean = require('gulp-clean');
const zip = require('gulp-zip');
const sequence = require('gulp-sequence');
const cssmin = require('gulp-clean-css');
const sourceMap = require('gulp-sourcemaps');
const browsersync = require('browser-sync');
const changed = require('gulp-changed');

const basePath = path.resolve(__dirname, '');//-项目路径
console.log(basePath)

// 社区开始
// 需要补充 js依赖，js压缩，css压缩，加时间戳
    const srcPathEjs = basePath+'/Src/**/*.ejs',
          output = basePath+'/Dist';
    //const cfg = require(basePath + '/assest/config/configmenu.json');
    const cfg = '';
    gulp.task('clean', function () {
        return gulp.src(output, {read: false})
            .pipe(clean({force: true}));
    })

    gulp.task('ejs', function(){
        return gulp.src(srcPathEjs)
            .pipe(ejs(cfg))
            .pipe(fileinclude())
            .pipe(rename(function(path){
                path.extname = ".html";
            }))
            .pipe(gulp.dest(output));
    });

    gulp.task('watch', function () {
        gulp.watch(srcPathEjs,['ejs']);
    });

    gulp.task("dev", function (cb) {
        sequence('clean', 'ejs',  'watch', cb);
    });
// 社区结束