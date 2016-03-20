import util from 'util';
import numeral from 'numeral';

export function printProduct(product) {
  if (product.quantity) {
    return util.format(
      '%sx %s (%s; %s)',
      product.quantity,
      product.name,
      product.unit,
      numeral(product.price).format('$0.00')
    );
  } else {
    return util.format(
      '%s (%s; %s)',
      product.name,
      product.unit,
      numeral(product.price).format('$0.00')
    );
  }
}
