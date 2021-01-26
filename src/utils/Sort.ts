import { SavedItems } from "../containers/Interfaces/Interfaces";

const Sort = {
  storage: function (saved: Array<SavedItems>, type: string): void {
    for (const item of saved) {
      if (item.type === type) {
        localStorage.removeItem(item.name);
        localStorage.setItem(
          item.name,
          JSON.stringify({
            index: item.index,
            image: item.image,
            info: item.info,
            type: type,
          })
        );
      }
    }
  },
};

export default Sort;
