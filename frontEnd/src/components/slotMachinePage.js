import "../styles/slotMachineStyle.css";
import "../styles/popupStyle.css";
import "../styles/buttonsStyle.css";
import Loader from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { slotMachineActions } from "../actions";
import { ApiCalls } from "../api/apiCalls";

function SlotMachine() {
  //get the state from the countryReducer
  const slotMachineData = useSelector((state) => state.slotMachineReducer);
  var counter = 0; //used to display the moving effect of fruits in slot machine
  const dispatch = useDispatch();

  const startPlaying = () => {
    //check whether the user run out of coins
    if (slotMachineData.coins > 0) {
      //set a repeating call to the play function every 100Ms
      //to display a moving effect of fruits on the slot machine
      var idInterval = setInterval(() => {
        play();
      }, 100);
      //after 1 second the calculateReward function will be called
      //and takes the id of the intervall as parameters to stop it
      setTimeout(() => {
        calculateReward(idInterval);
      }, 1000);
    } else {
      //update played of the slotMachineData state to know whether the slot was played or not
      dispatch(slotMachineActions({ type: "played" }));
    }
  };

  const calculateReward = (idInterval) => {
    //call the function to send a request to the server
    //to get the result of the slot machine and number of coins won
    ApiCalls.getSlotMachineResult()
      .then((result) => {
        //update updateCurrentReel of the slotMachineData with the results from the api call
        dispatch(
          slotMachineActions({
            type: "updateCurrentReel",
            payload: result.data.result,
          })
        );
        //update updateCurrentReel of the slotMachineData with the number of coins won from the api call
        dispatch(
          slotMachineActions({
            type: "coins",
            payload: result.data.rewardCoins,
          })
        );
        //update played of the slotMachineData state to know whether the slot was played or not
        dispatch(slotMachineActions({ type: "played" }));
        //update coinsWon of the slotMachineData with the number of coins won from the api call
        dispatch(
          slotMachineActions({
            type: "coinsWon",
            payload: result.data.rewardCoins,
          })
        );
        //stop the repeated calles triggered in the function startPlaying
        clearInterval(idInterval);
        //call function to update the database with the new result from the api
        updateCoinsInDataBase(result.data.rewardCoins);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCoinsInDataBase = (rewardCoins) => {
    //check whether the user probided a user name
    //or decided to play as guest to avoid unnecessary api calls
    if (slotMachineData.user !== "tester") {
      //call the api to update the database while providing the username and amount of coins
      ApiCalls.updateCoins(
        slotMachineData.user,
        slotMachineData.coins + rewardCoins
      )
        .then((result) => {
          if (result.result === "updated") {
            console.log("updated user coins successfully");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //used for diplaying the moving fruits effects on the slot machine
  const play = () => {
    //making sure the counter still the same size as the reels
    if (counter < slotMachineData.reels.reel1.length - 1) {
      var temp = []; //temporary data to store the current values to be shown on the slot machine
      //get the value from the first reel using the counter value
      temp.push(slotMachineData.reels.reel1[counter]);
      //get the value from the second reel using the counter value
      temp.push(slotMachineData.reels.reel2[counter]);
      //get the value from the third reel using the counter value
      temp.push(slotMachineData.reels.reel3[counter]);
      //update updateCurrentReel of the slotMachineData state with teh temporary table data
      dispatch(
        slotMachineActions({ type: "updateCurrentReel", payload: temp })
      );
      //making sure temporary table returns to empty after updating
      //the updateCurrentReel of the slotMachineData state
      temp = [];
      counter++; //increment the counter to get the next values from each reel to be displayed
    } else {
      counter = 0;
      temp = [];
    }
  };

  const handleChange = (e) => {
    //update the userInput of the slotMachineData state when user is writing with the current value
    dispatch(
      slotMachineActions({
        type: "userInput",
        payload: e.target.value,
      })
    );
  };

  //get the provider username and search for it on the dataBase
  //with the getUser api call and update the display
  const confirmUser = () => {
    //update isLoading of the slotMachineData state to decide whether to show loader or not
    dispatch(
      slotMachineActions({
        type: "isLoading",
      })
    );
    //send an api call to get the user information from database
    //providing the username inputed by the user as parameter
    ApiCalls.getUser(slotMachineData.userInput)
      .then((result) => {
        //update user of the slotMachineData state with the result of the api
        dispatch(
          slotMachineActions({
            type: "user",
            payload: result.data.username,
          })
        );
        //update setCoins of the slotMachineData state with the result of the api
        dispatch(
          slotMachineActions({
            type: "setCoins",
            payload: result.data.points,
          })
        );
        //update isLoading of the slotMachineData state to decide whether to show loader or not
        dispatch(
          slotMachineActions({
            type: "isLoading",
          })
        );
      })
      .catch((error) => {
        console.log(error);
        //update isLoading of the slotMachineData state to decide whether to show loader or not
        dispatch(
          slotMachineActions({
            type: "isLoading",
          })
        );
      });
  };

  return (
    <div className="App">
      <h3>Slot Machine</h3>
      {slotMachineData.user === "tester" ? (
        <div>
          <h4>
            continue playing as guest tester or provide your username for
            progress to be saved
          </h4>
          <input
            type="text"
            name="name"
            placeholder="Iheb"
            onChange={(e) => handleChange(e)}
          />
          <button
            className="normal-button"
            onClick={() => {
              confirmUser();
            }}
          >
            Confirm
          </button>
        </div>
      ) : (
        ""
      )}
      {slotMachineData.isLoading ? (
        <Loader type="Puff" color="#d45d45" height={50} width={50} />
      ) : (
        <div>
          <h4>User : {slotMachineData.user}</h4>
          <h4>available coins : {slotMachineData.coins}</h4>
        </div>
      )}

      <button
        className="game-button"
        onClick={() => {
          startPlaying();
        }}
      >
        <i className="fa fa-gamepad"></i>
        Play
      </button>

      <table className="gameContainer">
        <thead></thead>
        <tbody>
          <tr>
            <td>{slotMachineData.currentReel[0]}</td>
            <td>{slotMachineData.currentReel[1]}</td>
            <td>{slotMachineData.currentReel[2]}</td>
          </tr>
        </tbody>
      </table>
      {slotMachineData.played ? (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => dispatch(slotMachineActions({ type: "played" }))}
            >
              &times;
            </span>
            {slotMachineData.coins > 0 ? (
              slotMachineData.coinsWon !== -1 ? (
                <p>you won {slotMachineData.coinsWon} coins </p>
              ) : (
                <p>you lost 1 coin </p>
              )
            ) : (
              <p>you are out of coins </p>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default SlotMachine;
