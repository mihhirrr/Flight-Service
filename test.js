/* To verify if the FK constraint have been created of not, use below query:

SELECT CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_NAME = 'seats' AND COLUMN_NAME = 'airplaneId';

*/

const decrement = '0';
console.log(parseInt(decrement))