/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function(kind, internalTemp, doneness) {
  // Write function HERE
  if (kind === 'beef' && doneness === 'rare' && internalTemp >= 125) {
    // console.log(`Beef is cooked rare!`)
    return true
  } else if (kind === 'beef' && doneness === 'medium' && internalTemp >= 135){
    // console.log(`Beef is cooked at medium temperature!`)
    return true
  } else if (kind === 'beef' && doneness === 'well' && internalTemp >= 155) {
    // console.log(`Beef is cooked well done!`)
    return true
  } else if  (kind === 'chicken' && internalTemp >= 165) {
    // console.log(`Chicken is cooked above 165!`)
    return true
  }
  return false
}



// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true

