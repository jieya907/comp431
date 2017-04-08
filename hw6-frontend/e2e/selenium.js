const webdriver = require('selenium-webdriver')

const url = 'http://localhost:8080/'

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build()

exports.driver = driver
exports.By = webdriver.By
exports.findId = id => driver.findElement(webdriver.By.id(id))
exports.findName = name => driver.findElement(webdriver.By.name(name))
exports.findCSS = css => driver.findElement(webdriver.By.css(css))
exports.findClass = className => driver.findElements(webdriver.By.className(className))
exports.go = _ => driver.navigate().to(url)
exports.sleep = millis => driver.sleep(millis)
