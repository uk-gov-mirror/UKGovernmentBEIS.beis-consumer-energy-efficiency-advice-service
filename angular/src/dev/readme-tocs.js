#!/usr/bin/env node

// Process all README.md files with markdown-toc

var exec = require('child_process').exec;
var toc = require('markdown-toc');
var fs = require('fs');
var concat = require('concat-stream');

exec('git ls-files', {maxBuffer: 1024 * 1024}, function(error, stdout) {
    if (error) {
        console.error("error: " + error);
        process.exit(1);
    }

    stdout.toString().split(/\r?\n/).forEach(function(fileName) {
        if (/.*\.md$/i.test(fileName)) {
            // c.f. https://github.com/jonschlinkert/markdown-toc/blob/master/cli.js
            var input = fs.createReadStream(fileName);
            input.pipe(concat(function (input) {
                var newMarkdown = toc.insert(input.toString());
                fs.writeFileSync(fileName, newMarkdown);
            }));
        }
    });
});
