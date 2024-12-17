const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

// List of files to be concatenated and bundled
const files = [
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
];

// Function to prepend file name and path to the file content
const prependFileContent = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');

    // If it's a JSON file, convert it to a valid JavaScript object assignment
    if (filePath.endsWith('.json')) {
        const jsonObject = JSON.parse(content);
        return `// File: ${path.basename(filePath)}\n// Path: ${filePath}\nconst ${path.basename(filePath, '.json')} = ${JSON.stringify(jsonObject)};\n`;
    }

    console.log(`Prepending content for: ${filePath}`); // Debug message
    return `// File: ${path.basename(filePath)}\n// Path: ${filePath}\n// Current Code:\n\n` + content;
};

// Function to bundle the files using esbuild
const bundleFiles = async () => {
    console.log('Starting file preparation...'); // Debug message

    // Prepare the files by adding comments before each one
    const preparedFiles = files.map((filePath) => {
        return {
            path: filePath,
            content: prependFileContent(filePath),
        };
    });

    // Create a temporary bundle with the commented content
    const tempBundlePath = 'gulp/temp-bundle.js';
    const tempBundleContent = preparedFiles.map((file) => file.content).join('\n');
    console.log('Writing content to temporary bundle...'); // Debug message

    // Write the content into a temporary file
    fs.writeFileSync(tempBundlePath, tempBundleContent);

    console.log('Running esbuild...'); // Debug message

    // Run esbuild to bundle all the files, including JSON files as variables
    await esbuild.build({
        entryPoints: [tempBundlePath],
        bundle: true,
        outfile: 'gulp/aisnapshot.js',
        sourcemap: true,  // Optional: If you want a sourcemap
    });

    console.log('Appending end comment...'); // Debug message
    // Append the end comment to the bundled file
    const endComment = '\n// End of aisnapshot.js code\n\n';
    fs.appendFileSync('gulp/aisnapshot.js', endComment);

    console.log('Cleaning up temporary file...'); // Debug message
    // Clean up the temporary bundle file
    fs.unlinkSync(tempBundlePath);

    console.log('Build completed successfully!'); // Debug message
};

// Run the process
bundleFiles()
    .catch((err) => {
        console.error('Error during build:', err);
    });
