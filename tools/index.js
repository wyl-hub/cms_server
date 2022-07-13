const path = require('path')
const fs = require('fs')
const args = process.argv


const homeDir = require('os').homedir();
const desktopDir = `${homeDir}\\Desktop`;


/**
 * 使用方式 
 * node index.js 项目在本地路径  新建组件路劲(eg: /main/test/test)
 */
// process.argv  第3个开始 是用户传入参数


// 此脚本 针对 wyl vue3-ts-cms
// 如果上传命令 直接在项目中使用  但是 本地文件 需要传入项目路径

const projectPath = path.join(desktopDir, args[2])
const viewPathList = args[3].split('/')
viewPathList.shift()



// 创建组件
function work() {
    // 组件开始路径及模板
    const startPath = path.join(projectPath, '/src/views')
    const content = fs.readFileSync(path.resolve(__dirname, './templateV3.txt'), { encoding: 'utf-8' })

    // 路由开始路径及模板
    const routerStartPath = path.join(projectPath, '/src/router')
    const routerContent = fs.readFileSync(path.resolve(__dirname, './templateRouter.txt'), { encoding: 'utf-8' })
    if (viewPathList.length > 1) {
        create(startPath, content)
        create(routerStartPath, routerContent, 'router')
    }
}

function create(startPath, content, type = '') {
    let currentPath = ''
    viewPathList.forEach((item, index) => {
        if (index === 0) currentPath = path.resolve(startPath, item)
        else currentPath = path.resolve(currentPath, item)
        // 不是最后一个 代表当前路径代表一个文件夹
        if (index !== viewPathList.length - 1) {
            if (!fs.existsSync(currentPath)) fs.mkdirSync(currentPath)
        } else {
            if (type === 'router') {
                const arr = args[3].split('/')
                arr.pop()
                let newContent = content.replace('routerPath', arr.join('/'))
                newContent = newContent.replace('ComponentPath', args[3].slice(1))
                fs.writeFileSync(currentPath + '.ts', newContent, { encoding: 'utf-8' })
            } else {
                const newContent = content.replace('component', `Hello ${item}`)
                fs.writeFileSync(currentPath + '.vue', newContent, { encoding: 'utf-8' })
            }
        }
    })
}

work()