var isValid = function(s) {
    if (s.length % 2 !== 0) return false
    const leftArr = []
    for (let i = 0; i < s.length; ++i) {
        if (s[i] === '(' || s[i] === '[' || s[i] === '{') leftArr.push(s[i])
        else {
            const corr = leftArr[leftArr.length - 1]
            console.log(s[i])
            console.log(corr)
            if (!corr) return false
            if (corr === '(' && s[i] !== ')') return false
            if (corr === '[' && s[i] !== ']') return false
            if (corr === '{' && s[i] !== '}') return false
            leftArr.pop()
        }
    }
    if (leftArr.length > 0) return false
    return true
};

console.log(isValid('))'))