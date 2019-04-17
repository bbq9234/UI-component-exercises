const $range = document.querySelector(".range");
const $track = document.querySelector(".range-track");
const $fill = document.querySelector(".range-track.fill");
const $handle = document.querySelector(".range-handle");
const $gradient = document.querySelector(".gradient");
const $gradientAngle = document.querySelector(".gradient-angle");

// .range-track element information
const { left, right, width } = $track.getBoundingClientRect();

/**
 * mousedown, mousemove event handler
 * 1. horizontally move .range-handle element based on x-axis position of viewport mouse pointer
 * 2. change background-image of .gradient element
 *
 * @param {MousEvent} e - event object
 */
function rangeHandler(e) {
  // x-axis position of viewport mouse pointer
  const { clientX } = e;

  // x-axis position of viewport mouse pointer can not get out of .range-track element range
  if (clientX < left || clientX > right) return;

  // relative position of mouse pointer from .range-track element
  // size is 0 to width of .range-track element
  const posX = e.clientX - left;

  console.log(`[mousemove] posX: ${posX}(clientX: ${clientX} - left: ${left})`);

  // horizontally move .range-handle element for posX
  $handle.style.transform = `translate3d(${posX}px, 0, 0)`;

  // convert posX to % based on width of .range-track element
  const ratio = (posX / width) * 100;

  // change width of .fill element
  $fill.style.width = ratio + "%";

  // convert ratio to deg (100% -> 360)
  const angle = Math.round((360 * ratio) / 100);
  // set gradient angle
  $gradientAngle.textContent = angle;
  // change gradient Background
  $gradient.style.backgroundImage = `linear-gradient(${angle}deg, #f1a829, #f14429)`;
}

// to catch event only invoked from left and right area of .range-track element, add event handler to .range element.
// margin area don't invoke event
$range.addEventListener("mousedown", e => {
  e.preventDefault();

  rangeHandler(e);

  // mousemove event occurs when mousedown event occurred
  $range.addEventListener("mousemove", rangeHandler);
});

// delete mousemove event when mouseup event occurs
// to handle mouseup event occurred out of $range, add event handler to document's mouseup event
document.addEventListener("mouseup", () => {
  $range.removeEventListener("mousemove", rangeHandler);
});
