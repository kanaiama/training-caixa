var xProgressBar = {
  start: function (progressBar, length) {
    this.updateStep(progressBar, length, 1);
  },

  updateStep: function (progressBar, length, index) {
    var statusElement = progressBar.querySelector("[status]");
    var bar = progressBar.querySelector("[bar]");
    this.setStatusText(statusElement, length, index);
    this.setBarBackground(bar, ((index - 1) / length) * 100);
  },

  setStatusText: function (statusElement, length, index) {
    statusElement.innerText = (index - 1) + "/" + length;
  },

  setBarBackground: function (bar, percent) {
    bar.style.background =
      "linear-gradient(90deg, var(--color-primary) " +
      percent +
      "%, var(--color-primary-bg) " +
      percent +
      "%)";
  },
};
