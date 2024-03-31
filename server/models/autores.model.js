const { default: mongoose } = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator");

const ProductoSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3, 'Debe tener al menos 3 caracteres']
    },
});

ProductoSchema.plugin(uniqueValidator);

const ProductoModel = mongoose.model("Producto", ProductoSchema);


module.exports = ProductoModel;