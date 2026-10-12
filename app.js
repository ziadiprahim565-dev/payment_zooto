(function () {
  "use strict";

  const content = window.SITE_CONTENT || {};
  const $ = (id) => document.getElementById(id);

  const introView = $("introView");
  const messageView = $("messageView");
  const form = $("codeForm");
  const codeInput = $("accessCode");
  const feedback = $("feedback");
  const inputCount = $("inputCount");
  const accessCard = document.querySelector(".access-card");

  // وضع النصوص القادمة من content.js في أماكنها.
  const textMap = {
    introTitle: "introTitle",
    introMessage: "introMessage",
    buttonText: "buttonText",
    successEyebrow: "successEyebrow",
    messageTitle: "messageTitle",
    privateMessage: "privateMessage",
    letterLabel: "letterLabel",
    signatureText: "signatureText",
    footerText: "footerText"
  };

  Object.keys(textMap).forEach((key) => {
    const element = $(textMap[key]);
    if (element && typeof content[key] === "string") {
      element.textContent = content[key];
    }
  });

  function showFeedback(message, type) {
    feedback.textContent = message || "";
    feedback.classList.toggle("success", type === "success");
  }

  function updateCount() {
    inputCount.textContent = codeInput.value.length + " / 6";
  }

  // السماح بالأرقام فقط، بحد أقصى 6 أرقام.
  codeInput.addEventListener("input", function () {
    const cleaned = this.value.replace(/\D/g, "").slice(0, 6);
    if (this.value !== cleaned) this.value = cleaned;
    updateCount();
    if (feedback.textContent) showFeedback("");
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const enteredCode = codeInput.value.trim();
    const expectedCode = String(content.accessCode || "114457");

    if (enteredCode.length !== 6) {
      showFeedback(content.emptyMessage || "من فضلك أدخل 6 أرقام أولًا.");
      accessCard.classList.remove("shake");
      void accessCard.offsetWidth;
      accessCard.classList.add("shake");
      codeInput.focus();
      return;
    }

    if (enteredCode !== expectedCode) {
      showFeedback(content.errorMessage || "الرمز غير صحيح. حاول مرة أخرى.");
      accessCard.classList.remove("shake");
      void accessCard.offsetWidth;
      accessCard.classList.add("shake");
      codeInput.select();
      return;
    }

    showFeedback("");
    introView.hidden = true;
    messageView.hidden = false;
    messageView.classList.remove("view-active");
    void messageView.offsetWidth;
    messageView.classList.add("view-active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  $("backButton").addEventListener("click", function () {
    messageView.hidden = true;
    introView.hidden = false;
    codeInput.value = "";
    updateCount();
    showFeedback("");
    window.scrollTo({ top: 0, behavior: "smooth" });
    codeInput.focus();
  });

  updateCount();
})();
