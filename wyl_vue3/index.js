function createApp(rootComponent) {
    return {
        mount(selector) {
            const container = document.querySelector(selector)
            let isMount = false
            let oldVnode = null

            watchEffect(function() {
                if (!isMount) {
                    oldVnode = rootComponent.render()
                    mount(oldVnode, container)
                    isMount = true
                } else {
                    newVnode = rootComponent.render()
                    patch(oldVnode, newVnode)
                    oldVnode = newVnode
                }
            })
        }
    }
}