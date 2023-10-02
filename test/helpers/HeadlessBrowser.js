import puppeteer from "puppeteer"
import fs from "fs"

const instanceConfig = {
    isGlobalDebugMode: process.env.isGlobalDebugMode === "true", //Defined in vitest config
    bundlePath: process.env.bundlePath, //Defined in vitest config
}

const getHeadlessBrowserInstance = async (product = "chrome", isDebugMode = instanceConfig.isGlobalDebugMode) => {
    const browser = await puppeteer.launch({
        product: product,
        headless: isDebugMode ? false : "new",
        slowMo: isDebugMode ? 150 : 0,
        args: ["--window-size=1920,1080"]
    })
    const page = await browser.newPage()
    isDebugMode && page.on("console", message => console.log("BROWSER LOG:", message.text()))
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: false,
        isLandscape: false
    })

    const loadBundle = async () => {
        const bundle = fs.readFileSync(instanceConfig.bundlePath, "utf8")
        const content = `<script>${bundle}</script>`
        await page.setContent(content, {waitUntil: "domcontentloaded"})
    }

    const loadComponentPage = async (componentName) => {
        const bundle = fs.readFileSync(instanceConfig.bundlePath, "utf8")
        const content = `<script>${bundle} kiwicomponents.init()</script><${componentName}></${componentName}>`
        await page.setContent(content)
        await page.waitForSelector(componentName)
    }

    const getInnerHTML = async (selector) => {
        return await page.$eval(selector, el => el.innerHTML)
    }

    const getSelectionLength = async (selector) => {
        return await page.$$eval(selector, el => el.length)
    }

    const setResolution = async (width, height) => {
        await page.setViewport({
            width: width,
            height: height
        })
    }

    const setMobileResolution = async () => {
        await setResolution(1024, 760)
    }

    const setDesktopResolution = async () => {
        await setResolution(1920, 1080)
    }

    const execute = async (fn, args = []) => {
        return await page.evaluate(fn, ...args)
    }

    const screenshot = async () => {
        return page.screenshot()
    }

    const emulateDevice = async (device) => {
        //https://github.com/puppeteer/puppeteer/blob/main/packages/puppeteer-core/src/common/Device.ts
        return page.emulate(puppeteer.devices[device])
    } 

    const close = async () => {
        await page.close()
        await browser.close()
    }

    return {
        browser,
        page,
        loadBundle,
        loadComponentPage,
        getInnerHTML,
        getSelectionLength,
        setResolution,
        setMobileResolution,
        setDesktopResolution,
        execute,
        screenshot,
        emulateDevice,
        close
    }
}

export default getHeadlessBrowserInstance