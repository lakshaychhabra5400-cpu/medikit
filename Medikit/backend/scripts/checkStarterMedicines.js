import { starterMedicines } from '../data/starterMedicines.js'

if (starterMedicines.length !== 3 || starterMedicines.some(({ name, price }) => !name || typeof price !== 'number')) {
  throw new Error('Starter medicine data must contain three valid medicines.')
}
console.log(`${starterMedicines.length} starter medicines are valid.`)
