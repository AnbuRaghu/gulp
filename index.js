const donation = [24, 56, 78, 98, 67]
donation.reduce(function (prevVal, currentVal) {
  console.log('previous:', prevVal)
  console.log('current:', currentVal)
  return prevVal + currentVal
})

const shoppingCard = [
  {
    id: 1,
    item: 'organic milk',
    cost: 45,
  },
  {
    id: 2,
    item: 'Sugar',
    cost: 50,
  },
  {
    id: 3,
    item: 'rice',
    cost: 100,
  },
]
let total=shoppingCard.reduce((accumalator,current)=>{
    console.log("...",accumalator)
return accumalator+current.cost
//for object we have to use 0
},0)
console.log("return",total)
// chaining method
let items = [
    {
      id: 1,
      item: 'organic milk',
      cost: 75,
    },
    {
      id: 2,
      item: 'Sugar',
      cost: 100,
    },
    {
      id: 3,
      item: 'rice',
      cost: 80,
    },
  ]
  //sort it using lowest price
  let sortedItems=items.sort(function(a,b){
      return a.cost-b.cost;//ascending

  })
  console.log(sortedItems)
  //sort it by title ascending
  let sortByTitle=sortedItems.sort(function(a,b){
      if(a.item <b.item)return -1
      if(a.item >b.item)return 1
      return 1
  })
  //filter items less than50
  let filtered=sortByTitle.filter(function(val){
      return val.cost<=75;
  })
  console.log(filtered)
  //map it like this:organic milk 75
  let final=filtered.map((val)=>{
      return val.item + " - "+ val.cost
  })
  console.log(final)