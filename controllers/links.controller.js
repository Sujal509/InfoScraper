const LinkService1 = require('../services/module1.service');
const LinkService2 = require('../services/module2.service');
const LinkService3 = require('../services/module3.service');
const { getLink, updateLink, getalllinks } = require('../models/links-model');

const module1 = async (req, res) => {
    const { url, state } = req.query;
    if (!url) {
        return res.status(400).json({ 'message': 'URL is required' });
    }
    if (state == 'false') {
        try {
            const links = await getLink(url);
            if (links === null) {
                const data = await LinkService1.scraper(url);
                if (!data) {
                    return res.status(400).json({ 'error': 'Error with puppeteer or the link provided' });
                }
                await updateLink(url, data);
                return res.json(data);
            }
            return res.json(links.data);
        } catch (err) {
            return res.status(500).json({ 'error': 'Something went wrong with the Server' });
        }
    }

    try {
        const links = await LinkService1.scraper(url);
        if (!links) {
            return res.status(400).json({ 'error': 'Error with puppeteer or the link provided' });
        }
        await updateLink(url, links);
        return res.json(links);
    } catch (err) {
        return res.status(500).json({ 'error': 'Something went wrong with the Server' });
    }
}

const module2 = async (req, res) => {
    const { url, state } = req.query;
    if (!url) {
        return res.status(400).json({ 'message': 'URL is required' });
    }
    if (state == 'false') {
        try {
            const links = await getLink(url);
            if (links === null) {
                const data = await LinkService2.scraper(url);
                if (!data) {
                    return res.status(400).json({ 'error': 'Error with puppeteer or the link provided' });
                }
                await updateLink(url, data);
                return res.json(data);
            }
            return res.json(links.data);
        } catch (err) {
            return res.status(500).json({ 'error': 'Something went wrong with the Server' });
        }
    }

    try {
        const links = await LinkService2.scraper(url);
        if (!links) {
            return res.status(400).json({ 'error': 'Error with puppeteer or the link provided' });
        }
        await updateLink(url, links);
        return res.json(links);
    } catch (err) {
        return res.status(500).json({ 'error': 'Something went wrong with the Server' });
    }
}

const module3 = async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ 'message': 'URL is required' });
    }
    
    try {
        const data = await LinkService3.scraper(url);
        return res.json(JSON.parse(data));
    } catch (err) {
        return res.status(500).json({ 'error': 'Something went wrong with the Server' });
    };

};

const databaseui = async (req, res) => {
    try {
        const data = await getalllinks();
        return res.json(data);
    }
    catch (err) {
        return res.status(500).json({ 'error': 'Something went wrong with the Server' });
    }
};

module.exports = {
    module1,
    module2,
    module3,
    databaseui
}
