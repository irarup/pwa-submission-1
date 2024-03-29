const year = new Date().getFullYear();
const countdown = new Date("Dec 15, 2019 15:37:25").getTime();;

// countdown

  let timer = setInterval(function() {
    // get today's date
    const today = new Date().getTime();

    // get the difference
    const diff = countdown - today;

    // math
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // display
    const timer = document.getElementById("timer");
      if (timer != null)
          document.getElementById("timer").innerHTML =
              "<div class=\"days\"> \
                <div class=\"numbers\">" + days + "</div>days</div> \
                <div class=\"hours\"> \
                <div class=\"numbers\">" + hours + "</div>hours</div> \
                <div class=\"minutes\"> \
                <div class=\"numbers\">" + minutes + "</div>minutes</div> \
                <div class=\"seconds\"> \
                <div class=\"numbers\">" + seconds + "</div>seconds</div> \
                </div>";
  }, 1000);