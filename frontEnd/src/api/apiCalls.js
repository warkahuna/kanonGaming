import axios from "axios";
import { BackEndIp } from "./backendIp";

export class ApiCalls {
  static async getCountry(country, fullText) {
    return await axios
      .post(BackEndIp.serverIp + "countrys/getCounry", {
        country: country,
        fullText: fullText,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static async getAllCountry() {
    return await axios
      .get(BackEndIp.serverIp + "countrys/getAllCountrys")
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static async getSlotMachineResult() {
    return await axios
      .get(BackEndIp.serverIp + "game/getSlotMachineResult")
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static async getUser(username) {
    return await axios
      .post(BackEndIp.serverIp + "users/getUser", {
        username: username,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static async updateCoins(username, newCoins) {
    return await axios
      .post(BackEndIp.serverIp + "users/updateUserCoins", {
        username: username,
        newCoins: newCoins,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
