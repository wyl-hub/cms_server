## app.mount() 首次挂载
# createApp runtime-core createAppApi
    createApp().mount()
    createApp -> runtime-dom 中 createApp = renderer.createApp
# renderer
    ensureRenderer (runtime-dom) => createRenderer (runtime-core) -> baseCreateRenderer

# app.mount
    createVNode(rootComponent as ConcreteComponent, rootProps)
    * 这个vnode是组件的虚拟节点 表示组件的信息

    render(vnode, rootContainer, isSVG)
# render -> patch
    首次执行 直接会 patch(container._vnode || null, vnode, container, null, null, null, isSVG)
# processComponent -> mountComponent
# mountComponent
    创建组件实例   createComponentInstance
    组件实例初始化 setupComponent
    建立更新机制   setupRenderEffect
# setupComponent
    执行setup  如果setup返回的是一个函数  instance.render = setupResult
    编译render
    applyOptions

# setupRenderEffect
    const subTree = renderComponentRoot()   
    * 这个是组件中的渲染模板的虚拟dom