const express = require('express');
const router = express.Router();
const newsletterController = require('../../controllers/newsletterController');

// This routes will be appended to "http://localhost:3600/categories"

router.get('/',newsletterController.getNewsletters);
router.post('/',newsletterController.subscribeToNewsletter);

module.exports = router;