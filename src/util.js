import util from 'util';
import numeral from 'numeral';

export function printProduct(product) {
  return util.format(
    '%s (%s; %s)',
    product.name,
    product.unit,
    numeral(product.price).format('$ 0.00'),
    product.id
  );
}
