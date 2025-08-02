import Product from "./product.model.js";
import ShoppingCart from "./shoppingCart.model.js";
import Invoice from "./invoice.model.js";
import User from "../users/user.model.js";
import { response } from "express";

export const createProduct = async (req, res = response) => {
    try {
        const { nameProduct, descriptionProduct, pricePoints } = req.body;

        const newProduct = new Product({
            nameProduct,
            descriptionProduct,
            pricePoints
        });

        await newProduct.save();

        res.status(201).json({
            msg: "Product created successfully",
            product: newProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Server error"
        });
    }
};

export const getProduct = async (req, res = response) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { status: true };

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            success: true,
            total,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al obtener productos",
            error
        });
    }
};

export const updateProduct = async (req, res = response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const product = await Product.findByIdAndUpdate(id, updates, { new: true });

        res.status(200).json({
            success: true,
            msg: "Product updated successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar productos",
            error
        });
    }
};

export const deleteProduct = async (req, res = response) => {
    try {
        const { id } = req.params;

        await Product.findByIdAndUpdate(id, { status: false });

        res.status(200).json({
            success: true,
            msg: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al eliminar productos",
            error
        });
    }
};

export const shoppingCartUser = async (req, res = response) => {
    const userId = req.usuario._id;
    const { id } = req.params; 
    const { amountProduct } = req.body;

    try {
        const product = await Product.findById(id);
        if (!product || !product.status) {
            return res.status(404).json({ msg: 'Product not found or inactive' });
        }


        let cart = await ShoppingCart.findOne({ keeperUser: userId });

        if (!cart) {
            cart = new ShoppingCart({
                keeperUser: userId,
                keeperProduct: []
            });
        }

        const existingProduct = cart.keeperProduct.find(p => p.product.toString() === id);

        if (existingProduct) {
            existingProduct.amountProduct += amountProduct;
        } else {
            cart.keeperProduct.push({
                product: id,
                amountProduct
            });
        }

        await cart.save();

        res.status(200).json({
            msg: 'Product added to cart successfully',
            cart
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error adding product to cart',
            error
        });
    }
};

export const confirmPurchase = async (req, res = response) => {
    const userId = req.usuario._id;

    try {
        const cart = await ShoppingCart.findOne({ keeperUser: userId }).populate('keeperProduct.product');

        if (!cart || cart.keeperProduct.length === 0) {
            return res.status(404).json({ msg: 'Cart not found or is empty' });
        }

        let total = 0;
        for (const item of cart.keeperProduct) {
            total += item.product.pricePoints * item.amountProduct;
        }

        const user = await User.findById(userId);

        if (user.points < total) {
            return res.status(400).json({
                msg: `Insufficient points. You have ${user.points} but need ${total}`
            });
        }

        user.points -= total;
        await user.save();

        const invoice = new Invoice({
            invoice: {
                keeperProduct: cart.keeperProduct.map(item => ({
                    product: {
                        _id: item.product._id,
                        nameProduct: item.product.nameProduct,
                        descriptionProduct: item.product.descriptionProduct,
                        pricePoints: item.product.pricePoints
                    },
                    amountProduct: item.amountProduct
                })),
                keeperUser: userId,
                createdAt: cart.createdAt,
                updatedAt: cart.updatedAt
            },
            total
        });

        await invoice.save();

        cart.keeperProduct = [];
        await cart.save();

        res.status(200).json({
            msg: 'Purchase confirmed, invoice created and points deducted',
            invoice
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error confirming purchase',
            error
        });
    }
};


const createProductDefault = async ( nameProduct, descriptionProduct, pricePoints ) => {
    try {
        if (nameProduct === "PlayStation Plus 1 mes") {
            const existingProduct = await Product.findOne({ nameProduct: "PlayStation Plus 1 mes" });
            if (existingProduct) {
                return null;
            };
        }else if (nameProduct === "PlayStation Plus 6 meses") {
            const existingProduct2 = await Product.findOne({ nameProduct: "PlayStation Plus 6 meses" });
            if (existingProduct2) {
                return null;
            };
        }else if (nameProduct === "PlayStation Plus 1 año") {
            const existingProduct3 = await Product.findOne({ nameProduct: "PlayStation Plus 1 año" });
            if (existingProduct3) {
                return null;
            };
        }else if (nameProduct === "Pase de batalla Fortnite") {
            const existingProduct4 = await Product.findOne({ nameProduct: "Pase de batalla Fortnite" });
            if (existingProduct4) {
                return null;
            };
        }else if (nameProduct === "Brawl pass plus") {
            const existingProduct5 = await Product.findOne({ nameProduct: "Brawl pass plus" });
            if (existingProduct5) {
                return null;
            };
        }else if (nameProduct === "Brawl pass") {
            const existingProduct6 = await Product.findOne({ nameProduct: "Brawl pass" });
            if (existingProduct6){
                return null;
            };
        }else if (nameProduct === "Tarjeta de ragalo Fortnite") {
            const existingProduct7 = await Product.findOne({ nameProduct: "Tarjeta de ragalo Fortnite" });
            if (existingProduct7) {
                return null;
            };
        }else if (nameProduct === "Tarjeta de regalo PlayStation") {
            const existingProduct8 = await Product.findOne({ nameProduct: "Tarjeta de regalo PlayStation" });
            if (existingProduct8) {
                return null;
            };
        }else if (nameProduct === "Recarga de internet Claro") {
            const existingProduct9 = await Product.findOne({ nameProduct: "Recarga de internet Claro" });
            if (existingProduct9) {
                return null;
            };
        }else if (nameProduct === "Recarga de internet Tigo") {
            const existingProduct10 = await Product.findOne({ nameProduct: "Recarga de internet Tigo" });
            if (existingProduct10) {
                return null;
            };
        };
    const newProduct = new Product({ 
        nameProduct, 
        descriptionProduct,
        pricePoints
        });

        await newProduct.save();
        console.log("Product created successfully:", newProduct);
        return newProduct;
        
    } catch (error) {
        console.error("Error creating product:", error);
        return null;
    }
}

createProductDefault("PlayStation Plus 1 mes", "PlayStation Plus de un mes", 20000);
createProductDefault("PlayStation Plus 6 meses", "PlayStation Plus de seis meseses", 65000);
createProductDefault("PlayStation Plus 1 año", "PlayStation Plus de un año completo", 100000);
createProductDefault("Pase de batalla Fortnite", "Pase de batalla de fortnite, ¡Reúne a tu propio equipo de superhéroes al obtener PE en cualquier experiencia de Fortnite!", 20000);
createProductDefault("Brawl pass plus", "Pase de batalla de BrawlStars plus, obtenga muhcos beneficion unicos", 20000);
createProductDefault("Brawl pass", "Pase de batalla de BrawlStars, obtenga muhcos beneficion unicos", 15000);
createProductDefault("Tarjeta de ragalo Fortnite", "Tarjeta de regalo de Fortnite, que podras canjear por pavos", 30000);
createProductDefault("Tarjeta de regalo PlayStation", "Tarjeta de regalo de PlayStation que podras canjear por juegos en la plataforma de PlayStation", 30000);
createProductDefault("Recarga de internet Claro", "Recarga de internet claro de una semana con 5GB de internet", 10000);
createProductDefault("Recarga de internet Tigo", "Recarga de internet tigo de una semana con 5GB de internet", 10000);

