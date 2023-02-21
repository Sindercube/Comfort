let hiddenItems = [
    'waystones:mossy_waystone',
    'waystones:sandy_waystone',
    'waystones:portstone',
    'waystones:sharestone',
    'waystones:warp_dust',
    'waystones:warp_plate',
    'incubation:fried_egg',
    'farmersdelght:rope'
]

Color.DYE.forEach(color => {
    hiddenItems.push(`waystones:${color}_sharestone`)
})

onEvent('jei.hide.items', event => {
    for (let item of hiddenItems) event.hide(item)
})
