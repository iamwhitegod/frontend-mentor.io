import axios from "axios";

export default class IPaddress {
  constructor(query) {
    this.query = query;
  }

  async getIpAddress() {
    try {
      const results = await axios(
        `https://geo.ipify.org/api/v1?apiKey=at_IDRgiq72BInxrEa0x3FZme0KrGNXs&ipAddress=${this.query}`
      );

      this.result = results.data;
      console.log(this.result);
    } catch (err) {
      console.log(err);
    }
  }
}
