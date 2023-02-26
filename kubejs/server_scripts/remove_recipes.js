let removedRecipes = [
    'waystones:clear_sharestone',
    'waystones:mossy_waystone_convert',
    'waystones:mossy_waystone',
    'waystones:sandy_waystone',
    'waystones:portstone',
    'waystones:sharestone',
    'waystones:warp_dust',
    'waystones:warp_plate',
    'incubation:fried_egg_from_campfire_cooking',
    'incubation:fried_egg_from_smoking',
    'incubation:fried_egg',
    'environmental:rope',
]

for (let i = 1; i <= 16; i++) {
    removedRecipes.push(`computercraft:disk_${i}`)
}

Color.DYE.forEach(color => {
    removedRecipes.push(`waystones:${color}_sharestone`)
})
  
onEvent('recipes', event => {

    for (const recipeID of removedRecipes) event.remove({id: recipeID})

})
