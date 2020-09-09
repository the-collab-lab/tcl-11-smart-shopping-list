let testArray = [
    {
        estimatePurchase: 3,
        name: "bob"
    },
    {
        estimatePurchase: 2,
        name: "bread"
    },
    {
        estimatePurchase: 1,
        name: "egg"
    },
    {
        estimatePurchase: 4,
        name: "bobathan"
    },

]


let sortByPurchase = testArray.slice(0)

sortByPurchase.sort((a,b) => {
    return a.estimatePurchase - b.estimatePurchase
})

console.log(`sorted array : ${sortByPurchase}`)