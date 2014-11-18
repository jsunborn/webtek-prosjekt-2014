addEventListener('load', function() {
    var canvas = document.getElementById("the-canvas");

    if (canvas && canvas.getContext) {
        var ctx = canvas.getContext("2d");
        var headerTextX = -20;
        var headerTextY = 140;
        var subTextX = -20;
        var subTextY = 180;
        var color = 0;

        var headerText = "Special offer!";
        var subText = "Ticket to Ride - now only 365,-";

        var offerImage = new Image();
        var offerImageX = 450;
        var offerImageY = 20;

        offerImage.onload = function() {
            
            ctx.rotate(-(Math.PI * 7/100));

            ctx.font='bold 50px Amaranth';
            ctx.fillStyle = "#0000FF";
            ctx.fillText(headerText, headerTextX, headerTextY);

            ctx.font='bold 30px Voltaire';
            ctx.fillStyle = "#000099";
            ctx.fillText(subText, subTextX, subTextY);

            ctx.rotate((Math.PI * 7/100));

            setInterval(function() {
                ctx.clearRect(380, 0, canvas.width, canvas.height); // Clear canvas

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
