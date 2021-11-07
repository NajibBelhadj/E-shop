const { Product } = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');
        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {

        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype]
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
})
const uploadOption = multer({ storage: storage })



router.get(`/`, async (req, res) => {
    let filtre = {};
    if (req.query.categories) {
        filtre = { category: req.query.categories.split(',') }
    }
    const productList = await Product.find(filtre).populate('category');
    if (!productList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(productList);
});

router.get(`/:id`, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id');
    }
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
        res.status(500).json({
            success: false
        })
    }
    res.send(product);
});

router.post(`/`, uploadOption.single('image'), async (req, res) => {
    const category = await Category.findById(req.body.category)
    if (!category) {
        return res.status(400).send({ message: "Invalide Category" })
    }
    const file = req.file
    if (!file) {
        return res.status(400).send({ message: "No image in the request" })
    }
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}${fileName}`,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })

    product = await product.save();

    if (!product) {
        return res.status(500).send({ message: "the product cannot be created" })
    }

    return res.status(200).send(product)
});


router.put('/:id', uploadOption.single('image'), async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id');
    }
    const category = await Category.findById(req.body.category)
    if (!category) {
        return res.status(400).send({ message: "Invalide Category" })
    }
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send('Invalid Product');


    const file = req.file;
    let imagePath;

    if (file) {
        const fileName = req.file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagePath = `${basePath}${fileName}`
    } else {
        imagePath = product.image;
    }

    const updatedproduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: imagePath,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true }
    )
    if (!updatedproduct) {
        return res.status(404).send('the product cannot be updated')
    }
    res.send(updatedproduct);
})


router.delete('/:id', (req, res) => {

    Product.findByIdAndRemove(req.params.id).then(product => {
        if (product) {
            return res.status(200).json({ success: true, message: "the product is deleted" })
        } else {
            return res.status(404).json({ success: false, message: "product not found" })
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err })
    })
})

router.get('/get/count', async (req, res) => {
    const productCount = await Product.countDocuments()
    if (!productCount) {
        res.status(500).json({
            success: false
        })
    }
    res.send({
        productCount: productCount
    });
})

router.get('/get/featured/:count', async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const productfeature = await Product.find({
        isFeatured: true
    }).limit(+count)
    if (!productfeature) {
        res.status(500).json({
            success: false
        })
    }
    res.send(productfeature);
})



router.put('/gallery-images/:id', uploadOption.array('images', 10), async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id');
    }
    const files = req.files
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    if (files) {
        files.map(file => {

            imagesPaths.push(`${basePath}${file.filename}`);
        })
    }

    let product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            images: imagesPaths
        },
        { new: true }
    )
    if (!product) {
        return res.status(404).send('the product cannot be updated')
    }

    res.send(product);
})


module.exports = router;