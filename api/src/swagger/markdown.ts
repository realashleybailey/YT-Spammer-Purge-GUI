/*
 * Written by Ashley Bailey <admin@ashleybailey.me>
 * Description: Software Written By Ashley Bailey
 *
 * Created on Sun Mar 27 2022
 */

/* eslint-disable no-console */
import { exec } from 'child_process';
import path from 'path';

// Create Markdown file
const swaggerJson = path.join(__dirname, './swagger.json');
const swaggerMarkdown = path.join(__dirname, '../../README.md');
const config = path.join(__dirname, '../configs/markdown-config.json');
const command = `node ./node_modules/widdershins/widdershins.js '${swaggerJson}' -o '${swaggerMarkdown}' --environment '${config}'`;
exec(command, (err, stdout, stderr) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(stdout);
    console.log(stderr);
});
