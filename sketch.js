/*
この下の多次元配列girdArrは３×３マスを表す変配列。
XY座標の概念で扱うなら、girdArr[y][x]。
yxの順番でindexを扱わないとといけない。
白色マス（空白）＝０　赤色マス＝１　青色マス　＝　-１
*/
let gridArr = [
  [0,0,0],
  [0,0,0],
  [0,0,0]
];
let judgmentValue = false;
let turnColor;//この変数は赤青ターンを表すターン判別変数(赤＝１ 青＝-１)
let turnCount = 0;
function setup() {
　alert("概要：1VS1で赤色と青色に分かれ色を塗りあう。そして先に自分の色を横、縦、斜めどれかの並びで３列に塗りつぶした方が勝ち。\n\n操作方法：丸みあるマス目をクリックして色を塗る。\n先手は赤色")
  createCanvas(600, 600);
  turnColor = 1;
}

function draw() {
  background(220);
  markDrawing(); //全てのマス目にgridArr配列色を塗る関数
}

function mousePressed() {
  let gridMouse = {
    x : floor(mouseX / 200 ),
    y : floor(mouseY / 200 )
  }

  if(gridMouse.x <=2 && gridMouse.y <=2 && 
     gridArr[gridMouse.y][gridMouse.x] == 0) {
     gridArr[gridMouse.y][gridMouse.x] =turnColor;
     turnColor *= -1;
     turnCount += 1;
  }
  judgmentFunGroup("Red",1);//赤色のマス目が3つ並んでないかの判定関数
  judgmentFunGroup("Blue",-1);//青色のマス目が3つ並んでないかの判定関数
  if(turnCount == 9&&judgmentValue==false) {
      drawFun();
     } 
}

function gameOverFun(color) {
  alert(color + " is winner");  
  noLoop();
}

function drawFun() {
  alert("red&blue is loser");  
  noLoop();
}
function judgmentFun(playerColorName, playerColorNum, x1, y1, x2, y2, x3, y3) {
  if(gridArr[y1][x1] == playerColorNum &&
     gridArr[y2][x2] == playerColorNum&& 
     gridArr[y3][x3] == playerColorNum){
     judgmentValue = true;
    gameOverFun(playerColorName);
  }
}

function judgmentFunGroup(_playerColorName, playerColorNum) {
  for(let y=0; y<=2; y++){
    judgmentFun(_playerColorName, playerColorNum, 0, y, 1, y, 2, y);
  }
  for(let x=0; x<=2; x++){
    judgmentFun(_playerColorName, playerColorNum, x, 0, x, 1, x, 2);
  }
  judgmentFun(_playerColorName, playerColorNum, 0, 0, 1, 1, 2, 2);
  judgmentFun(_playerColorName, playerColorNum, 0, 2, 1, 1, 2, 0);
}

function markDrawing() {
  //縦横全マスをＲＥＣＴ関数で描画する
  for(let h = 0; h < gridArr.length; h++ ) {//マス列の長さ分だけ繰り返す
    for(let w = 0; w < gridArr.length; w++ ) {//マス行の長さ分色を塗る

      if( gridArr[h][w] == 1 ) { fill(255,100,100); }//赤色マスの描画
      else if(gridArr[h][w] == 0) { fill(255); }//白色空白マスの描画
      else if(gridArr[h][w] == -1){ fill(100,100,255); }//青色マスの描画
        rect(w*200,h*200,width/gridArr.length,height/gridArr.length,70,70,70,70)
    }
  }
}
