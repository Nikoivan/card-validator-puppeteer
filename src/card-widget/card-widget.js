import "./card-widget.css";
import moonAlgorithm from "./moon-algoritm";
import checkPaySys from "./check-pay-sys";

export default class CardWidget {
  constructor(title, cardCollection) {
    this.element = document.querySelector(`.${title}`);

    this.cardCollection = new cardCollection();

    this.onBtnClick = this.onBtnClick.bind(this);
    this.closePopUp = this.closePopUp.bind(this);
    this.deactivated = this.deactivated.bind(this);
    this.checkActivited = this.checkActivited.bind(this);
    this.deactivated = this.deactivated.bind(this);
  }

  get markup() {
    const { visa, masterCard, amex, discover, jcb, diner, mir } =
      this.cardCollection.collection;

    return `<div class="card-widget">
    <ul class="card-list">
        <li class="card-item"><img src="${visa}" data-sys="visa" alt="card-visa" class="image"></li>
        <li class="card-item"><img src="${masterCard}" data-sys="master-card" alt="card-mastercard" class="image"></li>
        <li class="card-item"><img src="${amex}" data-sys="amex" alt="card-americanexpress" class="image"></li>
        <li class="card-item"><img src="${discover}" data-sys="discover" alt="card-discoverer" class="image"></li>
        <li class="card-item"><img src="${jcb}" data-sys="jcb" alt="card-jcb" class="image"></li>
        <li class="card-item"><img src="${diner}" data-sys="diner" alt="card-diners" class="image"></li>   
        <li class="card-item"><img src="${mir}" data-sys="mir" alt="card-diners" class="image"></li>             
    </ul>
    <div class="activator"></div>
    <form class="form">
        <input class="input" placeholder="Credit card number">
        <button class="btn">Click to Validate</button>
    </form>
</div>  `;
  }

  bindToDOM() {
    this.element.innerHTML = this.markup;

    this.cardList = this.element.querySelector(".card-list");
    this.connectCardList();
    this.deactivatedCards = [];
    this.form = this.element.querySelector(".form");
    this.input = this.form.querySelector(".input");
    this.btn = this.form.querySelector(".btn");

    this.form.addEventListener("submit", this.onBtnClick);
    this.form.addEventListener("input", this.checkActivited);
  }

  onBtnClick(e) {
    e.preventDefault();

    const value = this.input.value.trim();

    if (!this.validate(value)) {
      this.showError("Ошибка");
      return;
    }
    if (moonAlgorithm(value)) {
      const paySys = checkPaySys(value);
      this.activeCard(paySys);
    }
  }

  connectCardList() {
    this.controlCardList = [];
    [...this.cardList.children].forEach((el) => {
      const sysItem = {
        image: el.querySelector(".image"),
        paySys: el.querySelector(".image").dataset.sys,
      };
      this.controlCardList.push(sysItem);
    });
  }

  checkActivited() {
    if (this.deactivatedCards.length === 0) {
      return;
    }
    const value = this.input.value.trim();
    if (!this.validate(value) || !moonAlgorithm(value)) {
      this.deactivated();
    }
  }

  deactivated() {
    this.deactivatedCards.forEach((el) =>
      el.image.classList.remove("deactive")
    );
    this.deactivatedCards = [];
  }

  activeCard(paySys) {
    this.actitivitedCard = this.controlCardList.find(
      (el) => el.paySys === paySys
    );
    this.controlCardList.forEach((el) => {
      if (el.paySys !== paySys) {
        el.image.classList.add("deactive");
        this.deactivatedCards.push(el);
      }
    });
  }

  showError(arg) {
    if (!this.popUp) {
      const popUp = this.createPopUp(arg);
      this.popUp = popUp;
      this.element.append(this.popUp);
    } else {
      this.popUp.classList.remove("disable");
    }
  }

  createPopUp(arg) {
    const popUpWrapper = document.createElement("div");
    popUpWrapper.classList.add("popup-wrapper");

    const closeImg = document.createElement("span");
    closeImg.classList.add("close");
    closeImg.textContent = `X`;
    closeImg.addEventListener("click", this.closePopUp);

    const popUpContainer = document.createElement("div");
    popUpContainer.classList.add("popup");

    const message = document.createElement("span");
    message.textContent = arg;

    popUpContainer.append(closeImg);
    popUpContainer.append(message);
    popUpWrapper.append(popUpContainer);

    return popUpWrapper;
  }

  closePopUp() {
    this.popUp.classList.add("disable");
  }

  validate(value) {
    return /^\d{14,16}$/.test(value);
  }
}
