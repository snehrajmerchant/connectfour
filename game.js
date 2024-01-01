alert("Welcome");

var player1 = "A";
var player1Color = "rgb(0, 0, 255)";

var player2 = "B";
var player2Color = "rgb(255, 0, 0)";

var game_on = true;
var table = $("table tr");

function reportWin(rowNum, colNum) {
  console.log(`Won starting at this row: ${rowNum},col: ${colNum}`);
}

function changeColor(rowIndex, colIndex, color) {
  return table
    .eq(rowIndex)
    .find("td")
    .eq(colIndex)
    .find("button")
    .css("background-color", color);
}

function reportColor(rowIndex, colIndex) {
  return table
    .eq(rowIndex)
    .find("td")
    .eq(colIndex)
    .find("button")
    .css("background-color");
}

function checkBottom(colIndex) {
  var colorReport = reportColor(5, colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = reportColor(row, colIndex);
    if (colorReport === "rgb(128, 128, 128)") {
      return row;
    }
  }
}

function colorMatchCheck(one, two, three, four) {
  return (
    one === two &&
    one === three &&
    one === four &&
    one !== "rgb(128, 128, 128)" &&
    one !== undefined
  );
}

//horizontal win
function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (
        colorMatchCheck(
          reportColor(row, col),
          reportColor(row, col + 1),
          reportColor(row, col + 2),
          reportColor(row, col + 3)
        )
      ) {
        console.log("HorizontalWin");
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

//vertical win
function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (
        colorMatchCheck(
          reportColor(row, col),
          reportColor(row + 1, col),
          reportColor(row + 2, col),
          reportColor(row + 3, col)
        )
      ) {
        console.log("VerticalWin");
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

//diagonal win
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (
        colorMatchCheck(
          reportColor(row, col),
          reportColor(row + 1, col + 1),
          reportColor(row + 2, col + 2),
          reportColor(row + 3, col + 3)
        )
      ) {
        console.log("DiagonalWin");
        reportWin(row, col);
        return true;
      } else if (
        colorMatchCheck(
          reportColor(row, col),
          reportColor(row - 1, col + 1),
          reportColor(row - 2, col + 2),
          reportColor(row - 3, col + 3)
        )
      ) {
        console.log("DiagonalWin");
        reportWin(row, col);
        return true;
      }
    }
  }
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

var pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

$("h3").text(player1 + " it's your turn, pick a column");

$(".board button").on("click", async function () {
  var col = $(this).closest("td").index();

  var bottomAvail = checkBottom(col);
  for (var i = 0; i <= bottomAvail; i++) {
    if (i > 0) changeColor(i - 1, col, "rgb(128, 128, 128)");
    changeColor(i, col, currentColor);
    await pause(500);
  }

  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    $("h1").text(currentName + " Won!");
    $("h3").fadeOut("fast");
    $("h2").fadeOut("fast");
    $("button").prop("disabled", true);
  }

  currentPlayer = currentPlayer * -1;

  if (currentPlayer === 1) {
    currentName = player1;
    $("h3").text(currentName + " it's your turn");
    //$("h3").color(player1Color);
    currentColor = player1Color;
  } else {
    currentName = player2;
    $("h3").text(currentName + " it's your turn");
    currentColor = player2Color;
    //$("h3").color(player2Color);
  }
});
