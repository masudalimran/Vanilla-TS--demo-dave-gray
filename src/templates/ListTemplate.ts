import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;

  static instance: ListTemplate = new ListTemplate();

  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }

  clear(): void {
    this.ul.innerHTML = ``;
  }

  render(fullList: FullList): void {
    this.clear();

    fullList.list.forEach((item) => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className =
        "mt-2 px-2 rounded flex justify-center border-b border-indigo-500";

      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.className = "mx-2";
      check.id = item.id;
      check.tabIndex = 0;
      check.checked = item.checked;
      li.append(check);

      check.addEventListener("change", () => {
        item.checked = !item.checked;
        fullList.save();
      });
      const div = document.createElement("div") as HTMLDivElement;
      div.className = "w-full";

      const label = document.createElement("label") as HTMLLabelElement;
      label.className = "mx-2";
      label.htmlFor = item.id;
      label.textContent = item.item;
      div.append(label);
      li.append(div);

      const button = document.createElement("button") as HTMLButtonElement;
      button.className = "px-10 bg-red-700 rounded text-white";
      button.textContent = "X";
      li.append(button);

      button.addEventListener("click", () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });

      this.ul.append(li);
    });
  }
}
