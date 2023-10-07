const UNKNOWN_ERROR = "Unknown error.";
const NUM_REQUESTS = "Number of requests: ";
const button = document.querySelector("#btn-search");

button.addEventListener("click", () => {
  const word_text_box = document.querySelector("#word");
  const definition_text_box = document.querySelector("#definition");
  const num_requests_p = document.querySelector("#num-requests");
  const message = document.querySelector("#message");

  // get the values of the text boxes
  const word = word_text_box.value;

  // create a new XMLHttpRequest object
  const xhttp = new XMLHttpRequest();

  xhttp.open(
    "GET",
    `https://nsinghsidhu12.com/COMP4537/labs/4/api/definitions/?word=${word}`,
    true
  );
  xhttp.send();

  xhttp.onreadystatechange = function () {
    // a good response
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);
      console.log(res)
      const definition = res.definition;
      const num_requests = res.request;

      definition_text_box.value = definition;
      num_requests_p.textContent = `${NUM_REQUESTS} ${num_requests}`;
      message.textContent = "";
    // a bad response
    } else if (this.readyState == 4 && this.status == 400) {
      const res = JSON.parse(this.responseText);
      const error = res.error;
      const num_requests = res.request;

      message.textContent = "Error: " + error;
      message.style.color = "red";
      definition_text_box.value = "";
      num_requests_p.textContent = `${NUM_REQUESTS} ${num_requests}`;
    } else {
      message.textContent = UNKNOWN_ERROR;
      message.style.color = "red";
      definition_text_box.value = "";
    }
  };
});
