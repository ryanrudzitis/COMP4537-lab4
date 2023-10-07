const SUCCESS = "Word added successfully";
const UNKNOWN_ERROR = "Unknown error";
const NUM_REQUESTS = "Number of requests: ";

const button = document.querySelector("#btn-search");
button.addEventListener("click", () => {
  const word_text_box = document.querySelector("#word");
  const definition_text_box = document.querySelector("#definition");
  const num_requests_p = document.querySelector("#num-requests");
  const message_p = document.querySelector("#message");

  // get the values of the text boxes
  const word = word_text_box.value.toLowerCase();
  const definition = definition_text_box.value;

  // create a new XMLHttpRequest object
  const xhttp = new XMLHttpRequest();
  const params = `?word=${word}&definition=${definition}`;

  xhttp.open(
    "POST",
    "https://nsinghsidhu12.com/COMP4537/labs/4/api/definitions/",
    true
  );
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send(params);

  xhttp.onreadystatechange = function () {
    // good response
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);
      const num_requests = res.request;

      message_p.textContent = SUCCESS;
      message_p.style.color = "green";
      num_requests_p.textContent = `${NUM_REQUESTS} ${num_requests}`;
    // bad response
    } else if (this.readyState == 4 && this.status == 400) {
      const res = JSON.parse(this.responseText);
      const error = res.error;
      const num_requests = res.request;

      message_p.textContent = "Error: " + error;
      message_p.style.color = "red";
      num_requests_p.textContent = `${NUM_REQUESTS} ${num_requests}`;
    } else {
      message_p.textContent = UNKNOWN_ERROR;
      message_p.style.color = "red";
    }
  };
});
