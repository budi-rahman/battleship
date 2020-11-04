let shoots = process.argv.splice(2)

function play(arrShoot){
  let fleetData = [
    { name: 'Aircraft carrier', symbol: 'A', size: 5, position: [] },
    { name: 'Battleship', symbol: 'B', size: 4, position: [] },
    { name: 'Cruiser', symbol: 'C', size: 3, position: [] },
    { name: 'Destroyer', symbol: 'D', size: 2, position: [] }
  ]
  fleetData.forEach((e) =>{
    createPosition(e.size, e.position)
    while(e.position.length !== e.size){
      e.position = []
      createPosition(e.size, e.position)
    }
  })
  console.log('--- Keadaan lautan sebelum dijatuhkan bom ---\n');
  console.log(createHeader(createBoard(fleetData)).join('\n'));
  let board = createBoard(fleetData)
  let indexShoot = changeIndex(arrShoot)
  for(let i = 0; i < indexShoot.length; i++){
    switch(board[indexShoot[i][0]][indexShoot[i][1]]){
      case '   ': board[indexShoot[i][0]][indexShoot[i][1]] = ' / '; break
      case ' A ':
      case ' B ':
      case ' C ':
      case ' D ': board[indexShoot[i][0]][indexShoot[i][1]] = ' X '
    }
  }
  console.log('\n--- Keadaan lautan setelah dijatuhkan bom ---\n');
  console.log(createHeader(board).join('\n'));
  console.log(countHit(arrShoot, fleetData));
}

function changeIndex(arr){
  let arrIndex = []
  let temp = ['A','B','C','D','E','F','G','H','I','J']
  let index = [1,2,3,4,5,6,7,8,9,10]
  for(let i = 0; i < temp.length; i++){
    for(let j = 0; j < index.length; j++){
      for(let k = 0; k < arr.length; k++){
        if(`${temp[i]+index[j]}` === arr[k]){
          arrIndex.push([j, i + 1])
        }
      }
    }
  }
  return arrIndex
}

let objPosition = {}
function createPosition(size, position){
  let randomValue = Math.ceil(Math.random() * size)
  let randomIndex = Math.ceil(Math.random() * 5)
  let index = ['A','B','C','D','E','F','G','H','I','J']
  let temp = randomValue
  for(let j = 0; j < size; j++){
    let tempPost = ''
    if(randomValue % 2 === 0){
      tempPost = `${index[randomIndex] + temp}`
      temp++
    }else{
      tempPost = `${index[randomIndex + j] + randomValue}`
    }
    if(!objPosition[tempPost]){
      objPosition[tempPost] = 1
      position.push(tempPost)
    }
  }
  return position
}

function createBoard(data){
  let boardArr = []
  for(let i = 0; i < 10; i++){
    let arrRow = []
    i !== 9 ? arrRow.push(` ${i + 1} `) : arrRow.push(` ${i + 1}`) 
    let index = ['A','B','C','D','E','F','G','H','I','J']
    let temp = [1,2,3,4,5,6,7,8,9,10]
    for(let j = 0; j < 10; j++){
      let flag = false
      let tempIndex = `${index[j]+temp[i]}`
      data.forEach((e)=>{
        if(checkPosition(e.position, tempIndex)){
          arrRow.push(` ${e.symbol} `)
          flag = true
        }
      })
      if(!flag){
        arrRow.push('   ')
      }
    }
    boardArr.push(arrRow)
  }
  return boardArr
}
function checkPosition(arr, index){
  for(let i = 0; i < arr.length; i++){
    if(index === arr[i]) return true
  }
  return false
}
function createHeader(arr){
  let template = '   |---|---|---|---|---|---|---|---|---|---|'
  let header = '     A   B   C   D   E   F   G   H   I   J '
  let border = '   +---------------------------------------+'
  let newArr = []
  for(let i = 0; i < arr.length; i++){
    newArr.push(arr[i].join('|') + '|')
    if( i !== 9){
      newArr.push(template)
    } else{
      newArr.push(border)
    }
  }
  newArr.unshift(header, border)
  return newArr
}

function countHit(arrShoot, data){
  let count = 0
  let ships = []
  for(let i = 0; i < data.length; i++){
    for(let j = 0; j < data[i].position.length; j++){
      let flag = false
      for(let k = 0; k < arrShoot.length; k++){
        if(data[i].position[j] == arrShoot[k]){
          count++
          flag = true
          ships.push(data[i].name)
          break
        }
      }
      if(flag) break
    }
  }
  if(ships.length === data.length) return `You Win`
  if(!ships.length){
    console.log('No ships were hit');
  }else{
    console.log(`The ship that was hit is ${ships.join(', ')}`);
  }
  return `Hit anda terkena ${count}`
}

play(shoots)