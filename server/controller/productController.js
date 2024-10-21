const Product = require("../models/productModel")
const cloudinary = require('../lib/cloudinary')

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({ success: true, message: products })
    } catch (error) {
        console.log(error)
        res.status(200).json({ success: true, message: 'Server error' })
    }
}
exports.getFeaturedProduct = async (req, res) => {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).lean();

        if (!featuredProducts.length) {
            return res.status(404).json({ success: false, message: 'No products found' });
        }

        res.status(200).json({ success: true, product: featuredProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
exports.getExclusiveProduct = async (req, res) => {
    try {
        const exclusiveProduct = await Product.find({ isExclusive: true }).lean();

        if (!exclusiveProduct.length) {
            return res.status(404).json({ success: false, message: 'No products found' });
        }

        res.status(200).json({ success: true, product: exclusiveProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
exports.createProduct = async (req, res) => {
    try {
        const { title, description, image, price, category } = req.body
        let cloudinaryResponse = null

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: 'products' })
        }

        const product = await Product.create({
            title,
            description,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : '',
            price,
            category
        })
        res.status(200).json({ success: true, product: product });

    } catch (error) {

    }
}
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne(req.params.id)
        if (!product) {
            return res.status(400).json({ success: true, message: 'Product not found' });
        }
        if (product.image) {
            const publicId = produce.image.split('/').pop().split('.')[0]
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`)
                console.log('image deleted from cloudinary')
            } catch (error) {
                console.log('error from cloudinary', error)
            }
        }

        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true, message: 'Product deleted' });

    } catch (error) {
        return res.status(400).json({ success: false, message: 'Server error' });
    }
}
exports.getRecommandedProduct = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: { size: 3 }
            },
            {
                $projects: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    image: 1,
                    price: 1
                }
            }
        ])

        res.status(200).json({ success: true, product: products })
    } catch (error) {
        res.status(400).json({ success: false, message: 'Server error' })
    }
}
exports.getByCategory = async (req, res) => {
    try {
        const { category } = req.params
        const products = await Product.find({ category })
        res.status(200).json({ success: true, product: products })
    } catch (error) {
        res.status(400).json({ success: false, message: 'Server error' })
    }
}
exports.toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params)
        if (product) {
            product.isFeatured = !produce.isFeatured
            const updatedProduct = await Product.save()
            res.status(200).json({ success: true, product: updatedProduct })
        }
        else {
            res.status(400).json({ success: false, message: 'Product not found' })
        }

    } catch (error) {
        res.status(400).json({ success: false, message: 'Server error' })

    }
}
