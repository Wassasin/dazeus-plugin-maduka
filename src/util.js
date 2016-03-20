export function printProduct(product) {
  return util.format('%s  (%s; € %s, %s) ', product.name, product.unit, numeral(product.price).format('0,00'), result.id);
}
