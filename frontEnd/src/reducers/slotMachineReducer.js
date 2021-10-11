const initialState = {
  reels: {
    reel1: ["🍒", "🍋", "🍎", "🍋", "🍌", "🍌", "🍋", "🍋"],
    reel2: ["🍋", "🍎", "🍋", "🍋", "🍒", "🍎", "🍌", "🍋"],
    reel3: ["🍋", "🍎", "🍋", "🍎", "🍒", "🍋", "🍌", "🍋"],
  },
  currentReel: ["🍒", "🍋", "🍋"],
  user: "tester",
  userInput: "",
  coins: 20,
  coinsWon: 0,
  played: false,
  isLoading: false,
};

const slotMachineReducer = (state = initialState, action) => {
  switch (action.type) {
    case "game":
      return state;
    case "reels":
      return state.reels;
    case "reel1":
      return state.reels.reel1;
    case "reel2":
      return state.reels.reel2;
    case "reel3":
      return state.reels.reel3;
    case "updateCurrentReel":
      return (state = {
        ...state,
        currentReel: action.payload,
      });
    case "userInput":
      return (state = {
        ...state,
        userInput: action.payload,
      });
    case "user":
      return (state = {
        ...state,
        user: action.payload,
      });
    case "coins":
      return (state = {
        ...state,
        coins: state.coins + action.payload,
      });
    case "setCoins":
      return (state = {
        ...state,
        coins: action.payload,
      });
    case "played":
      return (state = {
        ...state,
        played: !state.played,
      });
    case "coinsWon":
      return (state = {
        ...state,
        coinsWon: action.payload,
      });
    case "isLoading":
      return (state = {
        ...state,
        isLoading: !state.isLoading,
      });

    default:
      return state;
  }
};

export default slotMachineReducer;
