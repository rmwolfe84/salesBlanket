const gulp = require('gulp');
const insert = require('gulp-insert');
const concat = require('gulp-concat');

const files = [
    // Core files
    'src/core/**/*.js',
    'src/core/**/*.css',
    
    // Components
    'src/components/**/*.js',
    'src/components/**/*.css',
    
    // Routes
    'src/routes/**/*.js',
    'src/routes/**/*.css',
    
    // Services
    'src/services/**/*.js',
    'src/services/**/*.css',

    
    
    // Config files
    'firebase.json',
    '.firebaserc',
    'firestore.rules',
    'storage.rules',
    '.env',
    'functions/index.js',
    'functions/.eslintrc.js',
    'functions/package.json',
    
    // Public files
    'public/index.html',
    'public/styles.css',
    
    // Root files
    'src/app-root.js',
    'src/app.js',
    'package.json',
    'build.js',
    'updates.txt',
    
    // Exclude node_modules
    '!**/node_modules/**'
];

gulp.task('scripts', function () {
    return gulp.src(files, { allowEmpty: true })
        .pipe(insert.prepend((file) => 
            `\n//**End of code or start of new file** \n \n// File: ${file.relative}\n// Path: ${file.path}\n// Current Code:\n\n`
        ))
        .pipe(concat('aisnapshot.js'))
        .pipe(insert.append((file) => 
            `\n// End of ${file.relative} (${file.path}) code\n\n`
        ))
        .pipe(gulp.dest('gulp/'));
});

gulp.task('default', gulp.series('scripts'));