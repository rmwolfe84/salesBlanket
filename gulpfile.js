const gulp = require('gulp');
const insert = require('gulp-insert');
const concat = require('gulp-concat');

// Task to concatenate specific JS files, include file name as a comment before each file
gulp.task('scripts', function () {
  return gulp.src([
    'functions/index.js',
    'functions/.eslintrc.js',
    'functions/package.json',
    'firebase.json',
    '.firebaserc',
    '.gitignore',
    'firestore.rules',
    'package.json',
    'storage.rules',
    'public/index.html',
    'public/styles.css',
    'src/core/security/claims.js',
    'src/core/security/rules.js',
    'src/core/auth.js',
    'src/core/router.js',
    'src/components/modals/confirm.js',
    'src/components/modals/popup.js',
    'src/components/modals/alert.js',
    'src/components/headers/header1.js',
    'src/components/forms/address-form.js',
    'src/components/forms/contact-form.js',
    'src/components/forms/task-form.js',
    'src/components/forms/search-form.js',
    'src/components/tables/task-list.js',
    'src/components/tables/assigned-contact.js',
    'src/components/tables/assigned-address.js',
    'src/components/shared/nav-menu.js',
    'src/components/shared/error.js',
    'src/components/shared/loading.js',
    'src/routes/settings.js',
    'src/routes/home.js',
    'src/routes/canvasser.js',
    'src/routes/dashboard.js',
    'src/routes/unauthorized.js',
    'src/routes/login.js',
    'src/routes/404.js',
    'src/routes/inspection.js',
    'src/routes/complete-profile.js',
    'src/app-root.js',
    '.env',
    'src/app.js'
  ])
  // Prepend header with file name and path
  .pipe(insert.prepend(function (file) {
    return `\n//**End of code or start of new file** \n \n// File: ${file.relative}\n// Path: ${file.path}\n// Current Code:\n\n`;
  }))
  // Concatenate files
  .pipe(concat('aisnapshot.js'))
  // Append footer with file name and path
  .pipe(insert.append(function (file) {
    return `\n// End of ${file.relative} (${file.path}) code\n\n`;
  }))
  // Output the final concatenated file
  .pipe(gulp.dest('gulp/'));
});

// Default Gulp task (runs the scripts task)
gulp.task('default', gulp.series('scripts'));
