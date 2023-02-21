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
]

Color.DYE.forEach(color => {
    removedRecipes.push(`waystones:${color}_sharestone`)
})
  
onEvent('recipes', event => {

    for (const recipeID of removedRecipes) event.remove({id: recipeID})

})
