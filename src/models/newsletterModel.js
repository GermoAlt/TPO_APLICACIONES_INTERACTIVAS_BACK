const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const NewsletterSchema = new mongoose.Schema({
    email: String
})

NewsletterSchema.plugin(mongoosePaginate)

const Newsletter = mongoose.model('Newsletter', NewsletterSchema)

module.exports = Newsletter;