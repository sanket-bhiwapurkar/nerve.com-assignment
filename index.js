const state = {
  activeTab: getViews(getStrategyArray())[0],
  activeDate: getDateArray()[0],
  showEmpty: false,
};

navTab();
datePicker();
strategies();

function navTab() {
  const viewTabList = document.querySelector(".view-tab-list");
  const views = getViews(getStrategyArray());
  views.forEach((view) => {
    const viewTabItem = createViewTabItem(view);
    viewTabList.append(viewTabItem);
  });
}

function createViewTabItem(view) {
  const newListItem = document.createElement("li");
  const newa = document.createElement("a");
  newa.classList.add("view-tab-item");
  newa.textContent = view;
  newa.id = view;
  if (newa.id === state.activeTab) {
    newa.classList.add("active");
  }
  newa.addEventListener("click", function (e) {
    const previousTab = document.getElementById(state.activeTab);
    previousTab.classList.remove("active");
    e.target.classList.add("active");
    state.activeTab = newa.id;
    strategies();
  });
  newListItem.appendChild(newa);
  return newListItem;
}

function datePicker() {
  const selected = document.querySelector(".select .selected");
  const optionList = document.querySelector(".select .option-list");
  const dateArray = getDateArray();
  dateArray.forEach((date, id) => {
    const dateOption = createDateOption(date, id, selected, optionList);
    optionList.appendChild(dateOption);
  });
  selected.addEventListener("click", function () {
    optionList.classList.toggle("show");
    selected.classList.toggle("expanded");
  });
  selected.textContent = state.activeDate;
}

function createDateOption(date, id, selected, optionList) {
  const newLi = document.createElement("li");
  newLi.classList.add("option");
  newLi.textContent = date;
  const idString = `option-${id}`;
  newLi.id = idString;
  newLi.addEventListener("click", function () {
    state.activeDate = date;
    selected.textContent = state.activeDate;
    strategies();
    optionList.classList.remove("show");
    selected.classList.remove("expanded");
  });
  return newLi;
}

function strategies() {
  const strategiesData = filterStrategies();
  const strategyList = document.querySelector(".strategy-list");
  strategyList.innerHTML = "";
  if (Object.keys(strategiesData).length === 0) {
    state.showEmpty = true;
    renderNoView(state.showEmpty);
    return;
  }
  for (let strategy in strategiesData) {
    const strategyCard = createStrategyCard(strategiesData[strategy]);
    strategyList.appendChild(strategyCard);
  }
  state.showEmpty = false;
  renderNoView(state.showEmpty);
}

function createStrategyCard(strategy) {
  const newLi = document.createElement("li");
  newLi.classList.add("strategy-card");
  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = strategy[0];
  const count = document.createElement("p");
  count.classList.add("count");
  count.textContent = `${strategy[1]} Strategy`;
  newLi.appendChild(name);
  newLi.appendChild(count);
  return newLi;
}

function renderNoView(show) {
  const emptyView = document.querySelector(".empty-view");
  show ? emptyView.classList.add("show") : emptyView.classList.remove("show");
  const emptyViewDate = document.querySelector(".empty-view .date");
  emptyViewDate.textContent = state.activeDate;
}

function getViews(strategyArray) {
  let views = [];
  strategyArray.forEach((strategy) => {
    views.push(strategy.View);
  });
  return views;
}

function filterStrategies() {
  const viewData = getStrategyArray().filter(
    (each) => each.View === state.activeTab
  )[0];
  const strategiesData = {};
  viewData.Value[state.activeDate]?.forEach((each) => {
    if (strategiesData[each]) {
      strategiesData[each][1]++;
    } else {
      strategiesData[each] = [each, 1];
    }
  });
  return strategiesData;
}

function getDateArray() {
  return [
    "24-Apr-2024",
    "02-May-2024",
    "09-May-2024",
    "31-May-2024",
    "21-Jun-2024",
  ];
}
function getStrategyArray() {
  return [
    {
      View: "Bullish",
      Value: {
        "24-Apr-2024": [
          "Bull Call Spread",
          "Bull Put Spread",
          "Bull Put Spread",
          "Long Call",
          "Bull Put Spread",
          "Bull Call Spread",
          "Strategy1",
          "Bull Call Spread",
          "Strategy1",
          "Strategy1",
          "SpreadStrategy",
          "Bull Call Spread",
        ],
        "02-May-2024": [
          "Bull Call Spread",
          "Bull Call Spread",
          "Bull Put Spread",
          "Long Call",
          "Long Call",
          "Long Call",
          "Bull Put Spread",
          "Bull Call Spread",
          "Strategy1",
          "Bull Call Spread",
          "Strategy2",
          "Strategy1",
          "Strategy2",
          "Bull Call Spread",
        ],
        "09-May-2024": [
          "Strategy Put",
          "Strategy Call",
          "Strategy Call",
          "Strategy Call",
          "Strategy Put",
        ],
      },
    },
    {
      View: "Bearish",
      Value: {
        "24-Apr-2024": [
          "Bear Call Spread",
          "Bear Call Spread",
          "Bear Call Spread",
          "Long Put",
          "Long Put",
          "Long Put",
          "Bear Call Spread",
        ],
        "31-May-2024": [
          "Long Put",
          "Long Put",
          "Long Put",
          "Long Put",
          "Long Put",
        ],
        "21-Jun-2024": [
          "Strategy3",
          "Strategy3",
          "Bear Put Spread",
          "Strategy3",
          "Long Put",
          "Long Put",
        ],
      },
    },
    {
      View: "RangeBound",
      Value: {
        "24-Apr-2024": [
          "Short Straddle",
          "Short Strangle",
          "Short Strangle",
          "Iron Butterfly",
          "Short Strangle",
          "Short Straddle",
          "Strategy1",
          "Short Straddle",
          "Strategy1",
          "Strategy1",
          "SpreadStrategy",
          "Short Straddle",
        ],
        "02-May-2024": [
          "Short Straddle",
          "Short Straddle",
          "Short Strangle",
          "Iron Butterfly",
          "Iron Butterfly",
          "Iron Butterfly",
          "Short Strangle",
          "Short Straddle",
          "Strategy1",
          "Short Straddle",
          "Strategy2",
          "Strategy1",
          "Strategy2",
          "Short Straddle",
        ],
        "21-Jun-2024": [
          "Iron Condor",
          "Iron Butterfly",
          "Iron Butterfly",
          "Iron Butterfly",
          "Iron Condor",
        ],
      },
    },
    {
      View: "Volatile",
      Value: {
        "02-May-2024": [
          "Long Straddle",
          "Long Strangle",
          "Long Strangle",
          "Long Strangle",
          "Long Straddle",
          "Strategy1",
          "Long Straddle",
          "Strategy1",
          "Strategy1",
          "Spread-Strategy",
          "Long Straddle",
        ],
        "09-May-2024": [
          "Long Straddle",
          "Long Straddle",
          "Long Strangle",
          "Long Strangle",
          "Long Straddle",
          "Strategy1",
          "Long Straddle",
          "Strategy2",
          "Strategy1",
          "Strategy2",
          "Long Straddle",
        ],
        "31-May-2024": [
          "Long Straddle",
          "Long Strangle",
          "Long Strangle",
          "Long Strangle",
          "Long Straddle",
        ],
      },
    },
  ];
}
