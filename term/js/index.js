let title = 1;
let co = ['6', '8', 'a', 'c'];
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
let fristmove;
let menustute=0;
let scrollmo=0;

function randd(a) {
    return Math.floor(Math.random() * a);
}

particlesJS.load('particles-js', './json/particlesjs-config.json');


$(function () {
    $(window).scroll(function () {
        clearTimeout(fristmove);
        scrollmo=$(this).scrollTop();
        if ($(this).scrollTop() == 0 && menustute==0) {
            $(".navbar").css("background-color", "");
        }else{
            $(".navbar").css("background-color", "rgb(122, 5, 5)");
        }
    });
});


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

$(document).on("readystatechange", function () {
    if (document.readyState == "complete") {
        setTimeout(function(){
            $("#loading").fadeOut(1000, function () {
                $("#content").fadeIn(1000);
                $("#footer").fadeIn(1000);
                new WOW().init();
                wdth = $(window).width();
                if (wdth < 769) {
                        $(".navbar-toggler").fadeIn(1500,function(){
                            $(".navbar-toggler").css('pointer-events','auto');
                        });
                    $(".tablebox").css("height",'400px');
                    $('#twm').attr("height","375px")
                    $("#btns").removeClass("mb-5");
                    $("#page").removeClass("mb-4");
                    $("#kanban").removeClass("my-2");
                    $("#title").css("font-size", '2rem');
                    $("#footer").addClass("mb-5");
                    fristmove=setTimeout(movewindow, 2500);
                }else{
                }
            });
        },3000);
    }
})


$.ajax({
    url: "./php/opendata.php",
    type: "GET",
    dataType: "json",
    success: function (r) {
        getChart()
    }
})
$("#btns").on("click", ".btn", function () {
    clearTimeout(fristmove);
    title = $(this).attr("data-type");
    myPieChart.destroy();
    getChart();
    movewindow();
})

$(document).mousemove(function (e) {
    mx = e.pageX;
    my = e.pageY;
})

$("#twm path").on("mouseover", function () {
    $(this).attr("stroke", "white");
    $(this).attr("stroke-width", "3");
    fillColor = $(this).attr("fill");
    switch (fillColor) {
        case '#FFFBD2':
            $("#type1").attr("stroke", "white");
            $("#type1").attr("stroke-width", "2");
            break;
        case '#F9D075':
            $("#type2").attr("stroke", "white");
            $("#type2").attr("stroke-width", "2");
            break;
        case '#FF7D50':
            $("#type3").attr("stroke", "white");
            $("#type3").attr("stroke-width", "2");
            break;
        case '#E81F1F':
            $("#type4").attr("stroke", "white");
            $("#type4").attr("stroke-width", "2");
            break;
        case '#840000':
            $("#type5").attr("stroke", "white");
            $("#type5").attr("stroke-width", "2");
            break;
    }
    $("#tool").css("display", "block");
    $("#tool").css("top", `${my+20}px`);
    $("#tool").css("left", `${mx+20}px`);
    country = $(this).parent("g").attr("id");
    // console.log(country);
    peo = arr[1][arr[0].indexOf(country)];
    total = sumData(arr[1]);
    ratio = Math.floor(((peo / total) * 100) * 10) / 10;
    if(peo==undefined){
        $("#tool").html(`${country}<br>0%<br>0人`);
    }else{
        $("#tool").html(`${country}<br>${ratio}%<br>${peo}人`);
    }
})
$("path").on("mouseout", function (e) {
    $(this).attr("stroke", "white");
    $(this).attr("stroke-width", "1");
    $("#tool").css("display", "none");
    $("text").attr("stroke", "none");
})

$(".linkIcon").on("mouseover",function(e){
    $('.linkText').stop();
    $('.linkText').fadeIn(300);
})
$(".linkIcon").on("mouseout",function(e){
    $('.linkText').stop();
    $('.linkText').fadeOut(300);
})

function sumData(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += (arr[i]) * 1;
    }
    return sum;
}

function movewindow(){
    $('html').animate({
        scrollTop: ($('#subTitle').offset().top)
    }, 1000);
}


function getChart() {
    $.ajax({
        url: "./php/pie.php",
        type: "post",
        data: {
            'title': title,
        },
        dataType: "json",
        success: function (r) {

            let colorList = [];
            for (let i = 0; i < 25; i++) {
                let color = `#${co[randd(4)]}00`
                colorList.push(color);
            }
            arr = r;
            ctx = $(`#chart`);

            // console.log(arr);
            if (arr[3] == 3) {
                slbtn("block", "none");
                for (let i = 0; i < arr[0].length; i++) {
                    $(`#${arr[0][i]}`).find("path").attr("fill", `${arr[4][i]}`);
                }
            } else if (arr[3] == 1) {
                slbtn("none", "block");
                myPieChart = new Chart(ctx, {
                    type: "bar",

                    data: {
                        datasets: [{
                            data: arr[1],
                            backgroundColor: colorList,
                            borderWidth: 0,
                            borderColor: 'rgba(255, 255, 255, 1)'
                        }],
                        labels: arr[0],

                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        title: {
                            text: arr[2],
                            display: true,
                            position: 'bottom',
                            fontSize: 30,
                            fontColor: '#eee',
                            fontFamily: "'微軟正黑體'",
                        },
                        legend: {
                            display: false,
                        },
                        tooltips: {
                            titleFontFamily: ['微軟正黑體'],
                            callbacks: {
                                title: function (tooltipItem, data) {
                                    return data['labels'][tooltipItem[0]['index']];
                                },
                                label: function (tooltipItem, data) {
                                    let dataset = data.datasets[tooltipItem
                                        .datasetIndex];
                                    let total = SumData(dataset.data);
                                    let now = dataset.data[tooltipItem.index];
                                    let r = Math.floor(((now / total) *
                                        100) * 10) / 10;
                                    return r + "%";

                                },
                                afterLabel: function (tooltipItems, data) {
                                    return tooltipItems.yLabel + '人';
                                }
                            }
                        },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                },
                                ticks: {
                                    fontColor: 'eee',
                                    fontSize: 14,
                                }
                            }],
                            yAxes: [{
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                },
                                ticks: {
                                    display: false,
                                }
                            }]
                        }
                    }
                });

            } else if (arr[3] == 4) {
                slbtn("none", "block");
                myPieChart = new Chart(ctx, {
                    type: "pie",

                    data: {
                        datasets: [{
                            data: arr[1],
                            backgroundColor: colorList,
                            borderWidth: 0,
                            borderColor: 'rgba(255, 255, 255, 1)'
                        }],
                        labels: arr[0]
                    },
                    options: {
                        maintainAspectRatio: false,
                        /* 圖表標題*/
                        title: {
                            text: arr[2],
                            display: true,
                            position: 'bottom',
                            fontSize: 30,
                            fontColor: '#eee',
                            fontFamily: "'微軟正黑體'"
                        },
                        legend: {
                            display: true,
                            labels: {
                                fontColor: '#eee',
                                fontFamily: '微軟正黑體',
                                fontSize: 16,
                            },
                            position: 'bottom',
                        },
                        tooltips: {
                            titleFontFamily: ['微軟正黑體'],
                            callbacks: {
                                title: function (tooltipItem, data) {
                                    return data['labels'][tooltipItem[0]['index']];
                                },
                                label: function (tooltipItem, data) {
                                    let dataset = data.datasets[tooltipItem
                                        .datasetIndex];
                                    let total = SumData(dataset.data);
                                    let now = dataset.data[tooltipItem.index];
                                    let r = Math.floor(((now / total) *
                                        100) * 10) / 10;
                                    return r + "%";
                                },
                                afterLabel: function (tooltipItem, data) {
                                    let dataset = data.datasets[tooltipItem
                                        .datasetIndex];
                                    let now = dataset.data[tooltipItem.index];
                                    return now + '人';
                                }
                            }
                        }
                    }
                })
            } else {
                slbtn("none", "block");
                myPieChart = new Chart(ctx, {
                    type: "pie",

                    data: {
                        datasets: [{
                            data: arr[1],
                            backgroundColor: colorList,
                            borderWidth: 0,
                            borderColor: 'rgba(255, 255, 255, 1)'
                        }],
                        labels: arr[0]
                    },
                    options: {
                        maintainAspectRatio: false,
                        /* 圖表標題*/
                        title: {
                            text: arr[2],
                            display: true,
                            position: 'bottom',
                            fontSize: 30,
                            fontColor: '#eee',
                            fontFamily: "'微軟正黑體'"
                        },
                        legend: {
                            display: true,
                            labels: {
                                fontColor: '#eee',
                                fontFamily: '微軟正黑體',
                                fontSize: 16,
                            },
                            position: 'right',
                        },
                        tooltips: {
                            titleFontFamily: ['微軟正黑體'],
                            callbacks: {
                                title: function (tooltipItem, data) {
                                    return data['labels'][tooltipItem[0]['index']];
                                },
                                label: function (tooltipItem, data) {
                                    let dataset = data.datasets[tooltipItem
                                        .datasetIndex];
                                    let total = SumData(dataset.data);
                                    let now = dataset.data[tooltipItem.index];
                                    let r = Math.floor(((now / total) *
                                        100) * 10) / 10;
                                    return r + "%";
                                },
                                afterLabel: function (tooltipItem, data) {
                                    let dataset = data.datasets[tooltipItem
                                        .datasetIndex];
                                    let now = dataset.data[tooltipItem.index];
                                    return now + '人';
                                }
                            }
                        }
                    }
                })
            }
        },
        error: function () {
            console.log("no");
        }
    })
}

function slbtn(tw, chart) {
    $("#twmap").css("display", tw);
    $("#chart").css("display", chart);
}

function SumData(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        let num = Number(arr[i]);
        sum += num;
    };
    return sum;
}