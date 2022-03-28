/*
 * Written by Ashley Bailey <admin@ashleybailey.me>
 * Description: Software Written By Ashley Bailey
 *
 * Created on Sun Mar 27 2022
 */

import chalk from 'chalk';
import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

const morganHandler = (req: Request, res: Response, next: NextFunction) => {
    const colorInStatus = (status: string) => {
        // convert status to a number
        const statusInt = parseInt(status, 10);

        // color the status
        /* eslint-disable multiline-ternary */
        const colorStatus = statusInt >= 500 ? chalk.red(status) // red
            : statusInt >= 400 ? chalk.yellow(status) // yellow
                : statusInt >= 300 ? chalk.cyan(status) // cyan
                    : statusInt >= 200 ? chalk.green(status) // green
                        : chalk.white(status); // white

        // return the status with the color
        return colorStatus;
    };

    const colorInMethod = (method: string) => {
        // color the method
        /* eslint-disable multiline-ternary */
        const colorMethod = method === 'GET' ? chalk.green(method) // green
            : method === 'POST' ? chalk.blue(method) // blue
                : method === 'PUT' ? chalk.magenta(method) // magenta
                    : method === 'DELETE' ? chalk.red(method) // red
                        : chalk.white(method); // white

        // return the method with the color
        return colorMethod;
    };

    const colorInTime = (time: string) => {
        // convert time to a number
        const timeInt = parseInt(time, 10);

        // color the time in milliseconds
        /* eslint-disable multiline-ternary */
        const colorTime = timeInt >= 5 ? chalk.red(time) // red
            : timeInt >= 4 ? chalk.yellow(time) // yellow
                : timeInt >= 3 ? chalk.cyan(time) // cyan
                    : timeInt >= 2 ? chalk.green(time) // green
                        : chalk.white(time); // white

        // return the time with the color
        return colorTime;
    };

    const handler = morgan((tokens, req, res) => {
        const name = chalk.blue.bold('[API]:');
        const method = chalk.bold(colorInMethod(tokens.method(req, res)));
        const url = chalk.bold(tokens.url(req, res));
        const status = chalk.bold(colorInStatus(tokens.status(req, res)));
        const contentLength = chalk.bold(tokens.res(req, res, 'content-length'));
        const responseTime = chalk.bold(colorInTime(tokens['response-time'](req, res)) + ' ms');

        return `${name} ${method} ${url} ${status} ${contentLength} - ${responseTime}`;
    });

    handler(req, res, next);
};

export default morganHandler;
