container = document.getElementById("strip_container");
stripes = document.getElementsByClassName("stripe")
numStripes = 78;
quote_container = document.getElementById("quote-text");
quote_author = document.getElementById("quote-author");
background = true;
main_pane = document.getElementById("main-pane");
quotes = [
    { quote: '"Just one small positive thought in the morning can change your whole day."', author: "- Dalai Lama" },
    { quote: '"Opportunities don\'t happen, you create them."', author: "- Chris Grosser" },
    { quote: '"Do the best you can. No one can do more than that."', author: "- John Wooden" },
    { quote: '"Do what you can, with what you have, where you are."', author: "- Theodore Roosevelt" },
    { quote: '"Inspiration does exist, but it must find you working."', author: "- Pablo Picasso" },
];

document.addEventListener("DOMContentLoaded", function() {
    const rand = Math.floor(Math.random() * quotes.length);
    const rand_quote = quotes[rand];
    quote_container.innerHTML = rand_quote["quote"];
    quote_author.innerHTML = rand_quote["author"];
    for(i=0; i<numStripes; i++) {
        stripe = document.createElement("div");
        stripe.classList.add("stripe");
        stripe.setAttribute("id", i);
        container.append(stripe)
    }
    $("body").fadeIn(1500);
})

function ChangeStripeColor(idArea) {

    var bw_grad = "linear-gradient(150deg, rgba(0,0,0,1) 0%, rgba(83,83,83,1) 26%, rgba(176,176,176,1) 81%, rgba(255, 255, 255, 0.808) 100%)";
    var blue_grad = "linear-gradient(150deg, rgba(0,0,0,1) 0%, rgba(9,9,121,1) 30%, rgba(0,212,255,1) 57%, rgba(255,255,255,1) 100%)";
    var yellow_grad = "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(121,118,9,1) 30%, rgba(232,255,0,1) 71%, rgba(255,255,255,1) 100%)";

    var bck_repeat = "repeat-x, repeat-x, repeat-y, repeat-y"
    var bck_size = "16px 4px, 16px 4px, 4px 16px, 4px 16px"
    var bck_pos = "0px 0px, 212px 116px, 0px 116px, 216px 0px"

    const stripe_css = document.getElementsByClassName("stripe");

    $("#strip_container").fadeOut(1000);
    setTimeout(function() {
        
        if(idArea.id=="index") {
            for(s=0;s<stripe_css.length;s++) {
                stripe_css[s].style.background = bw_grad;
                stripe_css[s].style.backgroundRepeat = bck_repeat;
                stripe_css[s].style.backgroundSize = bck_size;
                stripe_css[s].style.backgroundPosition = bck_pos;
            }
        } else if (idArea.id=="about") {
            for(s=0;s<numStripes;s++) {
                stripe_css[s].style.background = blue_grad;
                stripe_css[s].style.backgroundRepeat = bck_repeat;
                stripe_css[s].style.backgroundSize = bck_size;
                stripe_css[s].style.backgroundPosition = bck_pos;
            }
        } else if (idArea.id=="projects") {
            for(s=0;s<numStripes;s++) {
                stripe_css[s].style.background = yellow_grad;
                stripe_css[s].style.backgroundRepeat = bck_repeat;
                stripe_css[s].style.backgroundSize = bck_size;
                stripe_css[s].style.backgroundPosition = bck_pos;
            }
        }
        
    }, 1000)

    if(background==true) {
        $("#strip_container").fadeIn();
    }

}

function ChangeArea(idArea, anchor) {
    var activeArea;
    var areas = document.getElementsByClassName("area");
    var anchors = document.getElementsByTagName("a")
    for(a=0; a<anchors.length; a++) {
        anchors[a].style.textDecoration = "";
    }
    for(a=0; a<areas.length; a++) {
        if(areas[a].style.display == "inline") {
            activeArea = areas[a];
            break;
        }
    }
    if(idArea.id != "index") {
        var menu_anchors = document.getElementsByClassName("menu");
        var selectedAnchor = document.getElementById(anchor.id);
        selectedAnchor.style.textDecoration = "underline";
    }
    if(activeArea != idArea) {
        $(activeArea).fadeOut(1000);
        $(idArea).fadeIn(1000);
        activeArea.style.display = "none";
        idArea.style.display = "inline";
        ChangeStripeColor(idArea);
    }
}

function TurnOnOffBackground() {
    if($("#strip_container").is(':hidden')) {
        background = true;
        $("#strip_container").fadeIn();
        document.getElementById("onoff_background").innerHTML = "Background OFF";
    } else {
        background = false;
        $("#strip_container").fadeOut();
        document.getElementById("onoff_background").innerHTML = "Background ON";
    }
}

// function ChangeLanguage(lang) {
//     if(lang == 'pt') {
//         document.getElementById("aboutAnchor").innerHTML = "sobre";
//         document.getElementById("projectsAnchor").innerHTML = "projetos";
//     } else if (lang == 'en') {
//         document.getElementById("aboutAnchor").innerHTML = "about";
//         document.getElementById("projectsAnchor").innerHTML = "projects";
//     }
// }


// Se utilizador nao interagir durante x segundos, começa a dar fadeout de maneira a deixar apenas fundo animado
// Caso detete movimento durante painel esteja a desvanescer, reaparecer logo
function DetectUserInteraction() {
    if(background==true) {
        setTimeout(function() {
            $("#main-pane").fadeOut(5000, function() {
                ['mouseover','keydown', 'onscroll'].forEach( evt => 
                    document.addEventListener(evt, function() {
                        $("#main-pane").fadeIn(1000);
                    })
                );
            });
        }, 5000)
    }
}