const keptItems = [
    /ender_chest$/,
    /spyglass$/,
]

function randLocation() {
    return ( Math.random() - 0.5 ) / 7
}

onEvent('entity.death', event => {

    if (!event.entity.isPlayer()) return

    for (let i = 0; i < 46; i++) {
        let item = event.entity.inventory.get(i)
        if (item.isEmpty()) return

        let skipped = false
        for (let kept of keptItems) {
            if (kept.test(item.id)) skipped = true
        }
        let itemStack = Item.of(item.id).itemStack
        if (itemStack.maxDamage > 1) skipped = true
        //if (itemStack.maxStackSize == 1) skipped = true
        if (skipped) continue

        dropItem(item, event.entity)
        event.entity.inventory.set(i, 'minecraft:air')
    }

    for (let i = 0; i < 7; i++) {

        let orb = event.entity.level.createEntity('minecraft:experience_orb')
        orb.fullNBT = {Value: event.entity.xp * 0.11}
        orb.setPosition(event.entity.getX(), event.entity.getY() + 1, event.entity.getZ())
        orb.setMotion(randLocation(), randLocation(), randLocation())
        orb.spawn()

    }
    event.entity.xp = 0

    // easter eggs

    if (event.entity.name == 'Heapons') {
        const heapons_cube = Item.of('create_sa:heap_of_experience', `{display:{Name:'{"translate":"item.comfort.heapons_cube","italic":false}'}}`)
        dropItem(heapons_cube, event.entity)
    }

})

function dropItem(item, player) {
    let drop = player.level.createEntity('minecraft:item')
    drop.setItem(item)
    drop.setPosition(player.getX(), player.getY() + 1, player.getZ())
    drop.setMotion(randLocation(), randLocation(), randLocation())
    drop.spawn()
}

onEvent('server.load', event => {
    if (event.server.persistentData.firstLoad) return
    event.server.persistentData.firstLoad = true

    event.server.runCommand('gamerule keepInventory true')
})