var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var shell = require('gulp-shell');

gulp.task('watch', function (cb) {
    nodemon({
      script: './index.js',
      ext: 'js',
      env: { NODE_ENV: 'development' }
    });
});

gulp.task('watch-mattermost', function (cb) {
    nodemon({
      script: './mattermost.js',
      ext: 'js',
      env: { NODE_ENV: 'development' }
    });
});

gulp.task('run', shell.task([
  'node index.js'
]));

gulp.task('run-mattermost', shell.task([
  'node mattermost.js'
]));
