// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */

const { devices } = require('@playwright/test');
export const timeout = 5000;
const config = {
    retries: 2,
    workers:1,
    reporter: [
        ['list', { printSteps: true }],
        ['html', { open: 'never' }],
        ['junit', { outputFile: 'results.xml' }]
    ],
    projects: [
        {
            name: 'Google Chrome',
            use: {
                channel: 'chrome',
                ignoreDefaultArgs: ['--mute-audio'],
                },

        },
    ],
    use: {
        acceptDownloads:true,
        headless: true,
        ignoreHTTPSErrors: true,
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
};

module.exports = config;