export const validateDeleteProduct = async (req, res, next) => {
    const { confirm } = req.body;

    if (!confirm) {
        return res.status(400).json({
            success: false,
            msg: 'Confirmación requerida'
        });
    }

    next();
};