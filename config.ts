import { Config } from 'protractor';
import * as reporter from 'cucumber-html-reporter';

export const config: Config = {
    directConnect: true,
    SELENIUM_PROMISE_MANAGER: false,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: [
        '../features/*.feature'
    ],
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['--start-maximized']
        }
    },
    // multiCapabilities: [{
    //     'browserName': 'chrome',
    //     'chromeOptions': {
    //         'args': ['--start-maximized']
    //     }
    // }, {
    //     'browserName': 'firefox'
    // }]
    cucumberOpts: {
        tags: '~@skip',
        format: 'json:./report.json',
        require: [
            './setups/*.js',
            './test_suites/*.js'
        ]
    },
    onComplete: () => {
        const options = {
            theme: 'bootstrap',
            jsonFile: './report.json',
            output: './report.html',
            reportSuiteAsScenarios: true,
            launchReport: true,
            metadata: {
                "App Version":"1.0.0",
                "Test Environment": "STAGING",
                "Browser": "Chrome 75.0.3770.80",
                "Platform": "Windows 10",
                "Parallel": "Scenarios",
                "Executed": "Remote"
            }
        };
        reporter.generate(options);
    }
}