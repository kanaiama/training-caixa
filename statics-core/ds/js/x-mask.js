var xMask = {
  apply: function (event, maskName) {
    var input = event.target;
    var key = event.key;
    if (!(key.toUpperCase() === "BACKSPACE")) {
      event.preventDefault();
    }

    if (/^.$/.test(key)) {
      input.value = masks[maskName](
        event.type === "keydown" ? input.value : input.value.slice(0, -1),
        key
      );
    }
  },
};

var masks = {
  moeda: function (parse, concat) {
    var number = (parse + concat)
      .replace(/\D/g, "")
      .padStart(3, "0")
      .replace(/(^\d+)(\d{2}$)/, "$1.$2");
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRA",
    })
      .format(number)
      .replace("BRA", "R$");
  },

  data: function (parse, concat) {
    var parse = Array.from(parse.replace(/\D/g, "")).reduce(
      (acc, prev, index) =>
        acc + prev + (index === 1 || index === 3 ? "/" : ""),
      ""
    );
    var string = parse + concat;
    var length = string.length;

    if (length > 10 || /\D/.test(concat)) {
      return parse;
    }

    switch (length) {
      case 1:
        return concat <= 3 ? string : "";
      case 2:
        return (parse === "0" && concat > 0) ||
          parse === "1" ||
          parse === "2" ||
          (parse === "3" && concat <= 1)
          ? string + "/"
          : parse;
      case 4:
        return concat <= 1 ? string : parse;
      case 5:
        return (parse[3] === "0" && concat > 0) ||
          (parse[3] === "1" && concat <= 2)
          ? string + "/"
          : parse;
    }
    return string;
  },
};
