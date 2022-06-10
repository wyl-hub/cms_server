const h = (tag, props, children) => {
    return {
        tag,
        props,
        children
    }
}

const mount = (vnode, container) => {
    // 创建真实元素并在vnode上保留el
    const el = vnode.el = document.createElement(vnode.tag)

    // 处理props
    if (vnode.props) {
        for (const key in vnode.props) {
            const value = vnode.props[key]
            // 边界判断
            if (key.startsWith('on')) {
                el.addEventListener(key.slice(2).toLowerCase(), value)
            } else {
                el.setAttribute(key, value)
            }
        }
    }

    // 处理children
    if (typeof vnode.children === 'string') el.textContent = vnode.children
    else {
        vnode.children.forEach(item => {
            mount(item, el)
        })
    }

    // 将el 挂载到container上
    container.insertBefore(el, null)
}


const patch = (n1, n2) => {
    if (n1.tag !== n2.tag) {
        const parentEl = n1.el.parentElement
        parentEl.removeChild(n1.el)
        mount(n2, parentEl)
    } else {
        const el = n2.el = n1.el

        // 处理props
        const oldProps = n1.props || {}
        const newProps = n2.props || {}
        // 设置最新的属性
        for (key in newProps) {
            const oldValue = oldProps[key]
            const newValue = newProps[key]
            if (oldValue !== newValue) {
                if (key.startsWith('on')) {
                    // el.addEventListener(key.slice(2).toLowerCase(), newValue)
                } else {
                    el.setAttribute(key, newValue)
                }
            }
        }
        // 删除不在新属性中的老属性
        for (key in oldProps) {
            const value = oldProps[key]
            if (!(key in newProps)) {
                if (key.startsWith('on')) {
                    el.removeEventListener(key.slice(2).toLowerCase(), value)
                } else {
                    el.removeAttribute(key)
                }
            }
        }

        // 处理children
        const oldChildren = n1.children || []
        const newChildren = n2.children || []

        if (typeof newChildren === 'string') {
            if (
                (typeof oldChildren === 'string' && oldChildren !== newChildren)
                || typeof oldChildren !== 'string'
            ) el.textContent = newChildren
        } else {
            if (typeof oldChildren === 'string') {
                el.textContent = ''
                newChildren.forEach(item => {
                    mount(item, el)
                })
            } else {
                // 简易版
                // 找出更短的数组遍历
                const minLength = Math.min(oldChildren.length, newChildren.length)
                for(let i = 0; i < minLength; ++i) {
                    patch(oldChildren[i], newChildren[i])
                }

                // 如果 newChildren 更长  需要将多的添加进去
                if (newChildren.length > oldChildren.length) {
                    newChildren.splice(minLength).forEach(item => mount(item, el))
                }
                // 如果 oldChildren 更长  需要将多的删除
                if (oldChildren.length > newChildren.length) {
                    oldChildren.splice(minLength).forEach(item => el.removeChild(item.el))
                }
            }
        }
    }
}