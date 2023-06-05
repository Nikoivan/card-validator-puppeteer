import visaUrl from "../img/card-visa.gif";
import masterCardUrl from "../img/card-mastercard.gif";
import amexUrl from "../img/card-amex.gif";
import discoverUrl from "../img/card-discover.gif";
import jcbUrl from "../img/card-jcb.gif";
import dinerUrl from "../img/card-diners.gif";
import mirUrl from "../img/mir-logo_norm.png";

export default class CardCollection {
  constructor() {
    this.visa = visaUrl;
    this.masterCard = masterCardUrl;
    this.amex = amexUrl;
    this.discover = discoverUrl;
    this.jcb = jcbUrl;
    this.diner = dinerUrl;
    this.mir = mirUrl;
  }

  get collection() {
    return {
      visa: this.visa,
      masterCard: this.masterCard,
      amex: this.amex,
      discover: this.discover,
      jcb: this.jcb,
      diner: this.diner,
      mir: this.mir,
    };
  }
}
