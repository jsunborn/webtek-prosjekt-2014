addEventListener('load', function() {
    var canvas = document.getElementById("the-canvas");

    if (canvas && canvas.getContext) {
        var ctx = canvas.getContext("2d");
        var headerTextX = 10;
        var headerTextY = 40;
        var subTextX = 10;
        var subTextY = 100;
        var color = 0;

        var headerText = "Special offer!";
        var subText = "Ticket to Ride - now only 365,-";

        var offerImage = new Image();
        var offerImageX = 365;
        var offerImageY = 20;

        offerImage.onload = function() {
            setInterval(function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

                ctx.font='bold 30px calibri';
                ctx.fillStyle = "#0000FF";
                ctx.fillText(headerText, headerTextX, headerTextY);

                ctx.font='bold 20px calibri';
                ctx.fillStyle = "#000099";
                ctx.fillText(subText, subTextX, subTextY);

                ctx.shadowBlur = 30;
                ctx.shadowColor = "hsl(" + color % 360 + ",100%,40%)";
                ctx.drawImage(offerImage, offerImageX, offerImageY, offerImage.width*0.32, offerImage.height*0.32);
                ctx.shadowBlur = 0;
                color += 2;

            }, 20); // Repeat every 20 ms
        }

        offerImage.src = '../images/tickettoride.jpg';

        canvas.addEventListener("click", function(){ // Redirect user on click
            window.location = "../products/tickettoride.html";
        });
        canvas.addEventListener("mouseover", function(){ // Change pointer on mouseover
            canvas.style.cursor = "pointer";
        });
    }
});
