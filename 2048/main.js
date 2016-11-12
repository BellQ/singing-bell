/**
 * Created by JYL on 2014/6/8.
 */
var board = new Array();
var hasConflicted = new Array();
var score = 0;


$(function () {
 //   newgame();
});

function newgame() {
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    $(".gameover").remove();
    $("#newgamebutton").removeAttr("href");
    setTimeout(function(){
        generateOneNumber();
        generateOneNumber();
    },500)

}
//重新开始游戏
function restartgame() {
    updateScore(0);
    newgame();
}

function init() {
    $("#grid-container").animate({"opacity":1},500);
    for (var i = 0; i < 4; i++) {
        var temp1=20 + i * 120;
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css("top",450-Math.random()*500);
            gridCell.css("left",500-Math.random()*1000);
            var temp=20 + j * 120;
            gridCell.animate({
                "top":temp1,
                "left":temp
            },500,function(){
                $("#newgamebutton").attr("href","javascript:newgame();");
            });
         //   gridCell.css("top", getPosTop(i, j));
          //  gridCell.css("left", getPosLeft(i, j));
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
    score = 0;
}

function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
            var numberCell = $("#number-cell-" + i + "-" + j);

            if (board[i][j] == 0) {
                numberCell.css("width", "0px");
                numberCell.css("height", "0px");
                numberCell.css("top", getPosTop(i, j) + 50);
                numberCell.css("left", getPosLeft(i, j) + 50);
            } else {
                numberCell.css("width", "100px");
                numberCell.css("height", "100px");
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(getNumberName(board[i][j]));
            }

            hasConflicted[i][j] = false;
        }
    }

    $(".number-cell").css("line-height", "100px");
    $(".number-cell").css("font-size", "40px");
}

function generateOneNumber() {
    if (nospace(board)) {
        return false;
    }
    //随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    while (true) {
        if (board[randx][randy] == 0) {
            break;
        }
        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));
    }

    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;
	

    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    ShowNumberWithAnimation(randx, randy, randNumber);

    return true;
}