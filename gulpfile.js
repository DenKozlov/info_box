var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
    var spriteData = gulp.src('img/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css',
        algorithm: 'binary-tree',
        padding: 4
    }));
    return spriteData.pipe(gulp.dest('img/sprite'));
});