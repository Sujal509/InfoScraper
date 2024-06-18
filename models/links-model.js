const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    page: String,
    data: Object
});

const LinksModel = mongoose.model('allLinks', linkSchema);

const updateLink = async (page, data) => {
    let link = await getLink(page);
    if (link === null) {
        let model = new LinksModel({
            page,
            data
        });
        return await model.save();
    }
    link.data = data;
    return await link.save();
}

const getLink = async (page) => {
    let link = await LinksModel.findOne({ page });
    return link;
}

const getalllinks = async () => {
    const records = await LinksModel.find({});
    return records;
};

module.exports = {
    updateLink,
    getLink,
    getalllinks
}