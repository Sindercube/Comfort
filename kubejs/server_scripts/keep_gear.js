const keptItems = [
    /_sword$/,
    /_shovel$/,
    /_axe$/,
    /_pickaxe$/,
    /_hoe$/,
    /_helmet$/,
    /_chestplate$/,
    /_leggings$/,
    /_boots$/,
    /shield/,
    /bow/,
    /compass/g,
    /clock/,
    /spyglass/,
    /shears/,
    /_rod$/,
    /_stick$/,
    /trident/,
    /ender_chest/
]

function randLocation() {
    return ( Math.random() - 0.5 ) / 7
}

onEvent('entity.death', event => {

    if (!event.entity.isPlayer()) return

    for (let i = 0; i < 46; i++) {
        let item = event.entity.inventory.get(i)
        if (item.isEmpty()) continue

        let isKept = false
        for (let kept of keptItems) {
            if (kept.test(item.id)) isKept = true
        }
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