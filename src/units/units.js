// 补零
export const ToDou = (n) => {
    return n < 10 ? '0' + n : n
}

//getTime

export const Timer = () => {
    const oDate = new Date()
    return oDate.getFullYear() + '-' + ToDou(oDate.getMonth() + 1) + '-' + ToDou(oDate.getDate())
}