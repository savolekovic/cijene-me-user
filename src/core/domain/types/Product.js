/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {string} barcode
 * @property {string} created_at
 * @property {number} category_id
 */

/**
 * @typedef {Object} ProductFilters
 * @property {string} [search]
 * @property {number} [category_id]
 * @property {number} [min_price]
 * @property {number} [max_price]
 * @property {boolean} [has_entries]
 * @property {string} [barcode]
 * @property {string} [order_by]
 * @property {string} [order_direction]
 * @property {number} page
 * @property {number} per_page
 */ 