// 在gulpfile.js里面引入gulp模块
const gulp=require('gulp');
// 使用gulp.task方法建立gulp任务
gulp.task('要建立任务的名字',()=>{
  // 获取要处理的文件
  gulp.src('要处理文件的路径')
  // 将处理后的文件输出到dist目录下的css文件夹里面
  .pipe(gulp.dest('./dist/css'))
//   获取src下面的所有的html文件
  gulp.src('./src/*html')
});
// 导入插件
const babel=require('gulp-babel');
// 创建任务
gulp.task('jsmin', () =>
// 选中要处理的资源
    gulp.src('src/js/*.js')
        .pipe(babel({
            //判断当前代码的运行环境，将代码转换为当前运行环境所支持的代码
            presets: ['@babel/env']
        }))
        // 将处理的结果在dist目录下的js文件下输出
        .pipe(gulp.dest('dist/js'))
);
const babel=require('gulp-babel');
const uglify = require('gulp-uglify');
gulp.task('jsmin', () =>
// 选中要处理的资源
    gulp.src('src/js/*.js')
    // 对es6代码进行转换
        .pipe(babel({
            //判断当前代码的运行环境，将代码转换为当前运行环境所支持的代码
            presets: ['@babel/env']
        }))
        // 将转换的代码进行压缩
        .pipe(uglify())
        // 将处理的结果在dist目录下的js文件下输出
        .pipe(gulp.dest('dist/img'))
);
gulp.task('copy', () =>{
  // 选中要处理的资源,选中img里所有文件
    gulp.src('src/img/*')
        // 将处理的结果在dist目录下的js文件下输出
        .pipe(gulp.dest('dist/js'));
  // 选中要处理的资源,选中lib里所有文件
    gulp.src('src/lib/*')
        // 将处理的结果在dist目录下的lib文件下输出
        .pipe(gulp.dest('dist/lib'));
});
