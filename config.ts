import { Config } from "protractor";
import * as reporter from "cucumber-html-reporter";

export const config: Config = {
    directConnect: true,
    // SELENIUM_PROMISE_MANAGER: false,
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
    cucumberOpts: {
        format: 'json:./report.json',
        require: [
            './setups/*.js',
            './test_suites/*.js'
        ]
    },

    onComplete: () => {
        var options = {
            theme: 'bootstrap',
            jsonFile: './report.json',
            output: './report.html',
            reportSuiteAsScenarios: true,
            launchReport: true,
            metadata: {
                "App Version":"0.3.2",
                "Test Environment": "STAGING",
                "Browser": "Chrome  54.0.2840.98",
                "Platform": "Windows 10",
                "Parallel": "Scenarios",
                "Executed": "Remote"
            }
        };
        reporter.generate(options);
    }
}