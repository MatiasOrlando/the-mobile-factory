const ProductsService = require("../services/products");
const mappedArray = require("../config/dataFetch");

const listAllProducts = async (req, res) => {
  const { page } = req.query;
  try {
    const arrayProducts = await ProductsService.fetchAllProducts(page);
    if (arrayProducts.data.length < 12) {
      const productsDb = await ProductsService.productCreation(
        arrayProducts.data
      );
      res.send(productsDb);
    } else {
      const newArr = mappedArray(arrayProducts.data);
      const productsDb = await ProductsService.productCreation(newArr);
      res.status(200).send(productsDb);
    }
  } catch (error) {
    res.status(404).send(`DATA NOT AVAILABLE : ${error}`);
  }
};

const listSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const selectedProduct = await ProductsService.getSingleProduct(id);
    selectedProduct && res.status(200).send(selectedProduct);
  } catch (error) {
    res.status(204).send(`Product not found in Database : ${error} `);
  }
};

const listQueryProducts = async (req, res) => {
  // /products/search?q=${searchTerm} Deben mandarme por query la palabra de busqueda.
  //   const { searchTerm } = req.query;
  const searchTerm = "Iphone";
  try {
    const arrayProducts = await ProductsService.getQueryProducts(searchTerm);
    const newArr = mappedArray(arrayProducts.data);
    const productsDb = await ProductsService.productCreation(newArr);
    res.status(200).send(productsDb);
  } catch (error) {
    res.status(404).send(`DATA NOT AVAILABLE : ${error}`);
  }
};

module.exports = { listAllProducts, listSingleProduct, listQueryProducts };
