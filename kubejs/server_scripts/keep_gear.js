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
        event.entity.tell(item)
        if (item.isEmpty()) continue

        let isKept = false
        for (let kept of keptItems) {
            if (kept.test(item.id)) isKept = true
        }
        let itemStack = Item.of(item.id).itemStack
        if (itemStack.maxDamage > 1) isKept = true
        //if (itemStack.maxStackSize == 1) isKept = true

        if (isKept) continue

        let drop = event.entity.level.createEntity('minecraft:item')
        drop.setItem(item)
        drop.setPosition(event.entity.getX(), event.entity.getY() + 1, event.entity.getZ())
        drop.setMotion(randLocation(), randLocation(), randLocation())
        drop.spawn()
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

})

onEvent('server.load', event => {
    if (event.server.persistentData.firstLoad) return
    event.server.persistentData.firstLoad = true

    event.server.runCommand('gamerule keepInventory true')
})