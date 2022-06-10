class Dep {
    constructor() {
        this.subscriber = new Set()
    }

    depend() {
        if (activeEffect) this.subscriber.add(activeEffect)
    }

    notify() {
        this.subscriber.forEach(item => {
            item()
        })
    }
}
const targetMap = new WeakMap()
function getDep(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }

    let deps = depsMap.get(key)
    if (!deps) {
        deps = new Dep()
        depsMap.set(key, deps)
    }

    return deps
}


function reactive(raw) {
    return new Proxy(raw, {
        get(target, key) {
            const dep = getDep(target, key)
            dep.depend()
            return target[key]
        },
        set(target, key, newValue) {
            const dep = getDep(target, key)
            target[key] = newValue
            dep.notify()
        }
    })
}


let activeEffect = null
function watchEffect(fn) {
    activeEffect = fn
    fn()
    activeEffect = null
}



// const info = reactive({ counter: 2, name: 'wyl' })
// const foo = reactive({ height: 174 })

// watchEffect(function() {
//     console.log(info.name)
// })

// watchEffect(function() {
//     console.log('name: ', info.name, 'asc: ', info.counter)
// })

// watchEffect(function() {
//     console.log(foo.height)
// })

// info.name = 'aaa'
// foo.height = 180
// info.counter++