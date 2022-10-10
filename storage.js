const CACHE_KEY = 'game_history'

function checkStorage() {
  return typeof(Storage) !== 'undefined'
}

function putHistory(data) {
  if(checkStorage()) {
    let historyData = null
    if (localStorage.getItem(CACHE_KEY) === null) {
      historyData = []
    } else {
      historyData = JSON.parse(localStorage.getItem(CACHE_KEY))
    }

    historyData.unshift(data)
    if (historyData.length > 10) {
      historyData.pop()
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(historyData))
  }
}

function showHistory() {
  if (checkStorage()) {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || []
  } else {
    return []
  }
}

function renderHistory() {
  const historyData = showHistory()
  let historyList = document.querySelector('#resultList')
  historyList.innerHTML = ""

  for (let history of historyData) {
    let row = document.createElement('tr')
    row.innerHTML = "<td>" + history.yourMove + "</td>";
    row.innerHTML += "<td>" + history.enemyMove + "</td>";
    row.innerHTML += "<td>" + history.result + "</td>";
    historyList.appendChild(row)
  }
}

renderHistory()