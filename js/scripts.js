onload = async (event) =>  {
    setClock();

    let rawJsonOffers = await getServerFile("/data/offers.json");
    var jsonOffers = JSON.parse(rawJsonOffers);
    list = jsonOffers.offers;


    var promo1Index = Math.floor(Math.random() * 5);
    $(".promo1").css("background-image", "url(" + promo1list[promo1Index] + ")");

    $(".promo1").click(function(){
        window.open("https://wayaway.tp.st/Kci0juZg");
    });

    $(".promo2").click(promoClick);

    $(".tik-tok-link").click(function(){
        window.open("");
    });

    $(".youtube-link").click(function(){
        window.open("");
    });

    $(".terms-service").click(async function(){
        if(!termsDownloaded){
            let terms = await getServerFile("/data/terms.md");
            $(".terms-service-text").html(terms);
            termsDownloaded = true;
        }

        $("#pageOne").fadeOut(function(){
            $("#termsServicePage").fadeIn();
        })
        
    });

    $(".back-button").click(function(){
        $("#termsServicePage").fadeOut(function(){
            $("#pageOne").fadeIn();
        })
    })

    

    
    phoneSizeChanged();

    $(window).resize(function(){
        phoneSizeChanged();
    })

    $("#logoImage").attr("src", "/images/Icon.png");
}

var termsDownloaded = false;

var indexes = [];
var list = [];

var promo1list = ["https://images.pexels.com/photos/1840142/pexels-photo-1840142.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1366870/pexels-photo-1366870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/878477/pexels-photo-878477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/2700532/pexels-photo-2700532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1831265/pexels-photo-1831265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"];

var fixedPhoneWidth = 1259;
var fixedPhoneHeight = 3079;

var fixedPhoneScreenWidth = 1081;
var fixedPhoneScreenHeight = 2335;
var fixedPhoneScreenLeft = 91;
var fixedPhoneScreenTop = 155;

var fixedClockLeft = 160;
var fixedClockTop = 184;
var fixedClockHeight = 28;

var fixedNavbarSize = 281;
var fixedNavbarBorderSize = 3;

var fixedPhoneNavbarHeight = 84;

var fixedLogoSize = 138;
var fixedLogoMargin = 31;
var fixedLogoTextSize = 114;

var fixedContentSidePadding = 59;

var fixedSubHeadingTextSize = 80;
var fixedSubHeadingTopMargin = 45;
var fixedSubHeadingBottomMargin = 74;

var fixedPromoBottomMargin = 57;
var fixedPromoHeadingTextSize = 143;
var fixedPromoSubHeadingTextSize = 88;
var fixedPromoCornerRadius = 51;

var fixedSocialLinksBottom = 37;
var fixedSocialLinkSize = 136;

var fixedTermsServiceTextSize = 60;
var fixedTermsServiceBottom = 94;

var fixedTermsServiceTextFontSize = 80;

var fixedBackButtonSize = 150;
var fixedBackButtonIconSize = 60;
var fixedBackButtonCornerRadius = fixedBackButtonSize / 2;
var fixedButtonMargin = 45;

var ratio = 1.0;

async function getServerFile(path){
    let res = await fetch(path);
    let data = await res.text();
    return data;
}

function promoClick(){
    if(indexes.length < list.length){
        $(".promo2").off('click');
        $("#promoContainer1").addClass("spinner");

        var index = 0; 
        while(true){
            index = Math.floor(Math.random() * list.length);
            if(!indexes.includes(index)){
                indexes.push(index);
                setTimeout(function() {
                    if(list.length - indexes.length != 0)
                        $(".promo-subheading").text("Remaining: " + (list.length - indexes.length))
                    else
                        $(".promo-subheading").text("Try again next time");

                    setTimeout(function(){
                        $("#promoContainer1").removeClass("spinner");
                        $(".promo2").click(promoClick);
                        window.open(list[index]);
                    }, 350);
                }, 2000);   
                
                break;
            }
        }
          
    }
}

function ratioed(size){
    return (ratio * size) + 'px';
}

function positionElement(element, left, top, width, height){
    element.css("margin-left", ratioed(left));
    element.css("margin-top", ratioed(top));
    element.css("width", ratioed(width));
    element.css("height", ratioed(height));
}

function phoneSizeChanged(){
    var templateDiv = $("#phoneTemplate");
    ratio = templateDiv.width() / fixedPhoneWidth;
    var clock = $("#clock");
    clock.css("margin-left", ratioed(fixedClockLeft));
    clock.css("margin-top", ratioed(fixedClockTop));
    clock.css("line-height", ratioed(fixedClockHeight));
    clock.css("font-size", (ratio * fixedClockHeight) + 'pt');
    
    positionElement($("#phoneScreen"), fixedPhoneScreenLeft, fixedPhoneScreenTop, fixedPhoneScreenWidth, fixedPhoneScreenHeight);
    var screenWidth = $("#phoneScreen").width();

    $("#navbar").css("height", ratioed(fixedNavbarSize));
    $("#navbarContent").css("padding-top", ratioed(fixedPhoneNavbarHeight));
    $("#navigationBottomBorder").css("height", ratioed(fixedNavbarBorderSize));
    $("#logoImage").css("height", ratioed(fixedLogoSize));
    $("#logoImage").css("margin", ratioed(fixedLogoMargin));
    $("#logoText").css("line-height", ratioed(fixedLogoTextSize))
    $("#logoText").css("font-size", ratioed(fixedLogoTextSize))

    $("#contentContainer").css("top", ratioed(fixedPhoneNavbarHeight));
    $(".page").css("padding-top", ratioed(fixedNavbarSize - fixedPhoneNavbarHeight));
    $(".page").css("padding-left", ratioed(fixedContentSidePadding));
    $(".page").css("padding-right", ratioed(fixedContentSidePadding));
    $(".page").css("margin-bottom", ratioed(fixedContentSidePadding));

    $("#subHeading").css("font-size", ratioed(fixedSubHeadingTextSize));
    $("#subHeading").css("line-height", ratioed(fixedSubHeadingTextSize));
    $("#subHeading").css("margin", ratioed(fixedSubHeadingTopMargin) + " 0px " + ratioed(fixedSubHeadingBottomMargin) + " 0px");

    $(".promo").css("margin-bottom", ratioed(fixedPromoBottomMargin));
    $(".promo").css("border-radius", ratioed(fixedPromoCornerRadius));
    $(".promo-heading").css("font-size", ratioed(fixedPromoHeadingTextSize));
    $(".promo-container").css("border-radius", ratioed(fixedPromoCornerRadius));
    $(".promo-subheading").css("font-size",  ratioed(fixedPromoSubHeadingTextSize));

    $(".footer-content").css("padding-bottom", ratioed(fixedTermsServiceBottom));
    $(".social-contacts").css("padding-bottom", ratioed(fixedSocialLinksBottom));
    $(".social-link").css("width", ratioed(fixedSocialLinkSize));
    $(".social-link").css("height", ratioed(fixedSocialLinkSize));
    $(".tik-tok-link").css("margin-right", ratioed(fixedSocialLinkSize));
    $(".terms-service").css("font-size", ratioed(fixedTermsServiceTextSize));

    $(".terms-service-text").css("font-size", ratioed(fixedTermsServiceTextFontSize));
    $(".terms-service-text").css("margin", ratioed(fixedSubHeadingTopMargin) + " 0px " + ratioed(fixedSubHeadingBottomMargin + fixedBackButtonSize + fixedButtonMargin) + " 0px");

    $(".back-button").css("width", ratioed(fixedBackButtonSize));
    $(".back-button").css("height", ratioed(fixedBackButtonSize));
    $(".back-button").css("background-size", ratioed(fixedBackButtonIconSize));
    $(".back-button").css("border-radius", ratioed(fixedBackButtonCornerRadius));
    $(".back-button").css("top", ratioed(fixedPhoneScreenTop + fixedPhoneScreenHeight - (fixedBackButtonSize + fixedButtonMargin)));
}

function setClock(){
    var dateTime = new Date();
    var hour = dateTime.getHours();
    var min = dateTime.getMinutes();

    hour = (hour < 10) ? "0" + hour : hour;
    min = (min < 10) ? "0" + min : min;

    $("#clock").text(hour + ":" + min);

    setTimeout(setClock, 60000);
}