let title = 1;
let co = ['0', '3', '6', '9', 'c', 'e', 'f'];
let mx;
let my;
let country;
let peo;
let myPieChart;
let fillColor;
let arr;
let total;
let ratio;
let wdth;
let pageType;
let trnum;
let trs;
let dataTh = ["發病日", "通報日", "性別", "年齡層", "居住縣市", "感染國家", "血清型"];
let menustute = 0;
let scrollmo = 0;

function randd(a) {
    return Math.floor(Math.random() * a);
}

particlesJS.load('particles-js', './json/particlesjs-config.json', function () {});

$(document).on("readystatechange", function () {
    if (document.readyState == "complete") {
        setTimeout(function () {
            $("#loading").fadeOut(1000, function () {
                $("#content").fadeIn(1000);
                $("#footer").fadeIn(1000);
                new WOW().init();
                wdth = $(window).width();
                if (wdth < 769) {
                    $(".navbar-toggler").fadeIn(1500, function () {
                        $(".navbar-toggler").css('pointer-events', 'auto');
                    });
                    $("#page").removeClass("mb-4");
                    $("#page").addClass("mb-4");
                    $("#footer").addClass("mb-3");
                    $("#title").css("font-size", '2rem');
                    settdcolor()
                }
            });
        }, 5000);

    }
})
wdth = $(window).width();
if (wdth > 768) {
    pageType = "simple_numbers";
} else {
    pageType = "simple";
}

$('html').on('click', function () {
    settdcolor();
});


let showtable = $("#showtable").DataTable({
    "language": {
        "url": "./json/datatables-chinese-traditional.json"
    },
    "pagingType": `${pageType}`,
    "order": [
        [0, "desc"]
    ],
});

$.ajax({
    url: "./php/opendata.php",
    type: "GET",
    dataType: "json",
    success: function (r) {
        for (let i = 0; i < r.length; i++) {
            let rowdata = [r[i].發病日, r[i].通報日, r[i].性別, r[i].年齡層, r[i].居住縣市, r[i].感染國家, r[i].血清型, ];
            showtable.row.add(rowdata).draw().node();
        }
        $(".dataTables_info").addClass("text-light");
        $("th").css("background", "#580000");
    }
})


$(function () {
    $(window).scroll(function () {
        scrollmo = $(this).scrollTop();
        if ($(this).scrollTop() == 0 && menustute == 0) {
            $(".navbar").css("background-color", "");
        } else {
            $(".navbar").css("background-color", "rgb(122, 5, 5)");
        }
    });
});

$(".linkIcon").on("mouseover",function(e){
    $('.linkText').stop(500);
    $('.linkText').fadeIn();
})
$(".linkIcon").on("mouseout",function(e){
    $('.linkText').stop(500);
    $('.linkText').fadeOut();
})




$('.navbar-toggler').on("click", function () {
    switch (menustute) {
        case 0:
            menustute = 1;
            if (scrollmo == 0) {
                $(".navbar").css("background-color", "rgb(122, 5, 5)");
            }
            break;
        case 1:
            menustute = 0;
            if (scrollmo == 0) {
                $(".navbar").css("background-color", "");
            }
            break;
    }



})


function settdcolor() {
    trnum = $('tbody tr').length;
    for (let i = 0; i < trnum; i++) {
        trs = $('tbody tr').eq(i);
        for (let j = 0; j < 7; j++) {
            trs.find('td').eq(j).attr('data-th', `${dataTh[j]}\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 `)
        }
    }
    $('.page-item').on('click',function(){
        if($(this).is('.disabled')==false && $(this).is('.active')==false){
                $([document.documentElement, document.body]).animate({
                    scrollTop: $('.hr-white').offset().top-40
                }, 0);
        }

    })
}





