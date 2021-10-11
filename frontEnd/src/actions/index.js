export const countrysActions = (data) => {
  switch (data.type) {
    case "getAllCountrys":
      return {
        type: "getAllCountrys",
        payload: data.payload,
      };
    case "countryData":
      return {
        type: "countryData",
        payload: data.payload,
      };
    case "getListCountrys":
      return {
        type: "getListCountrys",
        payload: data.payload,
      };
    case "filterData":
      return {
        type: "filterData",
        payload: data.payload,
      };
    case "filterInput":
      return {
        type: "filterInput",
        payload: data.payload,
      };
    case "updatedInput":
      return {
        type: "updatedInput",
        payload: data.payload,
      };
    case "isCountryListShowing":
      return {
        type: "isCountryListShowing",
      };
    case "isLoading":
      return {
        type: "isLoading",
      };
    case "errorMessage":
      return {
        type: "errorMessage",
        payload: data.payload,
      };

    default:
      break;
  }
};

export const slotMachineActions = (data) => {
  switch (data.type) {
    case "game":
      return {
        type: "game",
      };
    case "reels":
      return {
        type: "reels",
      };
    case "reel1":
      return {
        type: "reel1",
      };
    case "reel2":
      return {
        type: "reel2",
      };
    case "reel3":
      return {
        type: "reel3",
      };
    case "updateCurrentReel":
      return {
        type: "updateCurrentReel",
        payload: data.payload,
      };
    case "user":
      return {
        type: "user",
        payload: data.payload,
      };
    case "userInput":
      return {
        type: "userInput",
        payload: data.payload,
      };
    case "coins":
      return {
        type: "coins",
        payload: data.payload,
      };
    case "setCoins":
      return {
        type: "setCoins",
        payload: data.payload,
      };
    case "coinsWon":
      return {
        type: "coinsWon",
        payload: data.payload,
      };
    case "played":
      return {
        type: "played",
      };
    case "isLoading":
      return {
        type: "isLoading",
      };
    default:
      break;
  }
};

export const dataBaseActions = (data) => {
  switch (data.type) {
    case "isSchema":
      return {
        type: "isSchema",
        payload: data.payload,
      };
    case "isMethode1":
      return {
        type: "isMethode1",
        payload: data.payload,
      };
    case "isMethode2":
      return {
        type: "isMethode2",
        payload: data.payload,
      };
    case "query":
      return {
        type: "query",
        payload: data.payload,
      };

    default:
      break;
  }
};
