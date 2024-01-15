const panels = document.getElementsByName("panel");
const stripeContainer = document.getElementById("background");
const stripes = document.getElementsByClassName("stripe");
const numStripes = 78;

var background = true;

quote_container = document.getElementById("quote-text");
quote_author = document.getElementById("quote-author");

quotes = [
    { quote: '"Just one small positive thought in the morning can change your whole day."', author: "- Dalai Lama" },
    { quote: '"Opportunities don\'t happen, you create them."', author: "- Chris Grosser" },
    { quote: '"Do the best you can. No one can do more than that."', author: "- John Wooden" },
    { quote: '"Do what you can, with what you have, where you are."', author: "- Theodore Roosevelt" },
    { quote: '"Inspiration does exist, but it must find you working."', author: "- Pablo Picasso" },
];

function CreateBackground() {
    for(i=0; i<numStripes; i++) {
        var stripe = document.createElement("div");
        stripe.classList.add("stripe");
        stripe.setAttribute("id", i);
        stripeContainer.append(stripe);
    }
}

function ChangePanel(id) {
    Array.prototype.forEach.call((panels), function(panel) {
        panel.style.display = "none";
    })
    document.getElementById(id).style.display = "";
}

function BackgroundOnOff() {
    if(background == true) {
        background = false;
        stripeContainer.style.display = "none";
        document.getElementById("backgroundbtn").innerHTML = "Background ON";
    } else {
        background = true;
        stripeContainer.style.display = "";
        document.getElementById("backgroundbtn").innerHTML = "Background OFF";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const rand = Math.floor(Math.random() * quotes.length);
    const rand_quote = quotes[rand];
    quote_container.innerHTML = rand_quote["quote"];
    quote_author.innerHTML = rand_quote["author"];
    // CreateBackground();
    Array.prototype.forEach.call((panels), function(panel) {
        panel.style.display = "none";
    })
    document.getElementById('index').style.display = "";
})

