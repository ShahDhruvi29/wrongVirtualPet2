//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock,fedTime,lastFed;
var bg;
var feedDog,addFood;
var foodObj,fedTime,value,FeedTime;
function preload()
{
  //load images 
  doggyImg=loadImage("Dog.png")
  happyDoggyImg=loadImage("happydog.png")
  milkimg=loadImage("Milk.png")
}
function setup() {
  database=firebase.database();
  createCanvas(500,500);
  dog=createSprite(450,300,150,150);
  dog.addImage(doggyImg);
  dog.scale=0.15;
  foodObj=new Foody();
  feedDog = createButton("Feed your dog");
  feedDog.position(650,100);
  feedDog.mousePressed(feedDoggy);

  addFood=createButton("Add Food");
  addFood.position(770,100);
  addFood.mousePressed(addFoods);
  
  nameBox = createInput('').attribute('placeholder','Your pet name');
  nameBox.position(450,100)

}
function draw() {  
  background("hotpink")
  
 value = nameBox.value();
 foodObj.display();
 fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed=data.val();
 })
 fill(255,255,254);
 textSize(15);
 if(lastFed>=12){
   text("Last Fed : "+ lastFed%12 + " PM", 350,30);
  }else if(lastFed==0){
    text("Last Fed : 1 PM",350,30);
  }else{
    text("Last Fed : "+ lastFed + " AM", 350,30);
  }
  drawSprites();
}

function feedDoggy()
{
 dog.addImage(happyDoggyImg)
 foodObj.updateFoodStock(foodObj.getFoodStock()-1)
 database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime:hour()
 })
}
function addFoods()
{
  foodS++
  database.ref('/').update({
    Food:foodS
  });
}