const puppeteer = require('puppeteer');

async function scraper(url) {
    const maxRetries = 3;
    let retryCount = 0;

    const performScraping = async () => {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        try {
            await page.goto(url, { waitUntil: 'networkidle0' });
        } catch (error) {
            if (retryCount < maxRetries) {
                retryCount++;
                await browser.close();
                return await performScraping();
            } else {
                await browser.close();
                return null;
            }
        }
        const links = await page.evaluate(() => {
            let anchors = Array.from(document.querySelectorAll('a'));
            let aboutLinks = new Set();
            let contactLinks = new Set();
            anchors.forEach(anchor => {
                let text = anchor.textContent;
                let rePattern1 = new RegExp('about', 'gi');
                let rePattern2 = new RegExp('contact', 'gi');
                if (rePattern1.test(text)) {
                    aboutLinks.add(anchor.href);
                } else if (rePattern2.test(text)) {
                    contactLinks.add(anchor.href);
                }
            });
            aboutLinks.forEach(el => {
                if (!el.includes('http')) {
                    aboutLinks.delete(el);
                    contactLinks.delete(el);
                }
            });
            return { aboutLinks: Array.from(aboutLinks), contactLinks: Array.from(contactLinks) };
        });

        await browser.close();
        return links;
    };
    return await performScraping();
}

module.exports = {
    scraper
}