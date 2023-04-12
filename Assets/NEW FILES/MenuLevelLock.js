#pragma strict

// This is where you plug in the GUITextures for the unlocked and the locked states for each level
/*var level1Unlocked : GUITexture;
var level1Locked : GUITexture;
var level2Unlocked : GUITexture;
var level2Locked : GUITexture;
var level3Unlocked : GUITexture;
var level3Locked : GUITexture;
*/
//These are the actual "buttons" that we use to click on to trigger an action to happen.
//In our case they cause a level to be loaded depending on the collider you click on.
//You will drag the collider button for each level into it's corresponding slot in the inspector.
/*var level1Collider : GameObject;
var level2Collider : GameObject;
var level3Collider : GameObject;
*/
// This is where we create a variable slot for playerPrefs to plug in the set number for each level once it's won or not won.
// playerPrefs will plug in "0" for a Not Won state and will plug in the level's number for the Won State.
var levelReached : int = 0;
//var levelReached2 : int = 0;
//var levelReached3 : int = 0;

// Let's grab the saved data for each level and grab that integer to use to load that level
levelReached = PlayerPrefs.GetInt("SavedLevel");
//levelReached2 = PlayerPrefs.GetInt("SavedLevel2");
//levelReached3 = PlayerPrefs.GetInt("SavedLevel3");

var BG 				: Texture;
var gamelevelsSkins : GUISkin;
var title 			:Texture;

var LevelLock 		:Texture;
var Levelreach1 	:Texture;
var Levelreach2 	:Texture;
var Levelreach3 	:Texture;



private var SW : float = Screen.width;
private var SH : float = Screen.height;


private var level1cleared 		 	 : boolean = false;
private var level2cleared 		 	 : boolean = false;
private var level3cleared 		 	 : boolean = false;
private var level4cleared 		 	 : boolean = false;
private var level5cleared 		 	 : boolean = false;


function Update () 
{	

    if(levelReached == 1)
     {
     	level1cleared = true;
      	level2cleared = true;
    }
	else if(levelReached == 2) //this is our case if the level you just played wasn't won yet.
	{

		level1cleared = true;
		level2cleared = true;
      	level3cleared = true;
	}
	
	else if(levelReached == 3) //this is our case if the level you just played wasn't won yet.
	{

		level1cleared = true;
		level2cleared = true;
      	level3cleared = true;
      	level4cleared = true;
	}
	else if(levelReached == 4) //this is our case if the level you just played wasn't won yet.
	{

		level1cleared = true;
		level2cleared = true;
      	level3cleared = true;
      	level4cleared = true;
      	level4cleared = true;
	}
	
	else //this is our case if the level you just played wasn't won yet.
	{

		level1cleared = true;

	}
    
}

function OnGUI () {
	GUI.skin = gamelevelsSkins;
	GUI.DrawTexture(Rect(SW*0, SH*0 , SW*1, SH*1),BG);
	GUI.DrawTexture(Rect(Screen.width*0.25,Screen.height*0.03,Screen.width*0.5,Screen.height*0.2),title);
	
	// for back button
	 if (GUI.Button (new Rect (SW*0.07, SH*0.03, SW*0.08, SH*0.14), "", gamelevelsSkins.customStyles [6])) {
		Application.LoadLevel("menu");   
      }
	
	//for level one
	if (level1cleared == true) {
	//if(level1Reached == 10){
    if (GUI.Button (new Rect (SW*0.07, SH*0.4, SW*0.17, SH*0.3), Levelreach1, gamelevelsSkins.customStyles [1])) {
    	Load(); // loader like ajax 
		
		PlayerPrefs.SetInt("Needkill", 10);
		PlayerPrefs.SetInt("levelselected", 1);
		PlayerPrefs.SetInt("levelTimer", 90);
		PlayerPrefs.Save();
		
		Application.LoadLevel("level0");

   
      }
    }
  else
  if(GUI.Button(new Rect(SW*0.07, SH*0.4, SW*0.17, SH*0.3),LevelLock, gamelevelsSkins.customStyles [0]));
  
  
  
  //for level two
  if (level2cleared == true) {
	//if(level1Reached == 10){
    if (GUI.Button (new Rect (SW*0.24, SH*0.4, SW*0.17, SH*0.3), Levelreach1, gamelevelsSkins.customStyles [2])) {
    	Load(); // loader like ajax
    	 
		PlayerPrefs.SetInt("Needkill", 20);
		PlayerPrefs.SetInt("levelselected", 2);
		PlayerPrefs.SetInt("levelTimer", 120);
		PlayerPrefs.Save();
		
		Application.LoadLevel("level0");

   
      }
    }
  else
  if(GUI.Button(new Rect(SW*0.24, SH*0.4, SW*0.17, SH*0.3),LevelLock, gamelevelsSkins.customStyles [0]));
  
  
   //for level three
  if (level3cleared == true) {
	//if(level1Reached == 10){
    if (GUI.Button (new Rect (SW*0.41, SH*0.4, SW*0.17, SH*0.3), Levelreach1, gamelevelsSkins.customStyles [3])) {
    	Load(); // loader like ajax 
    	
		PlayerPrefs.SetInt("Needkill", 30);
		PlayerPrefs.SetInt("levelselected", 3);
		PlayerPrefs.SetInt("levelTimer", 150);
		PlayerPrefs.Save();
		
		Application.LoadLevel("level0");

   
      }
    }
  else
  if(GUI.Button(new Rect(SW*0.41, SH*0.4, SW*0.17, SH*0.3),LevelLock, gamelevelsSkins.customStyles [0]));
  
  
  
  
  
     //for level four
  if (level4cleared == true) {
	//if(level1Reached == 10){
    if (GUI.Button (new Rect (SW*0.58, SH*0.4, SW*0.17, SH*0.3), Levelreach1, gamelevelsSkins.customStyles [3])) {
    	Load(); // loader like ajax 
    	
		PlayerPrefs.SetInt("Needkill", 35);
		PlayerPrefs.SetInt("levelselected", 4);
		PlayerPrefs.SetInt("levelTimer", 160);
		PlayerPrefs.Save();
		
		Application.LoadLevel("level0");

   
      }
    }
  else
  if(GUI.Button(new Rect(SW*0.58, SH*0.4, SW*0.17, SH*0.3),LevelLock, gamelevelsSkins.customStyles [0]));
  
  
  
  
     //for level five
  if (level5cleared == true) {
	//if(level1Reached == 10){
    if (GUI.Button (new Rect (SW*0.75, SH*0.4, SW*0.17, SH*0.3), Levelreach1, gamelevelsSkins.customStyles [3])) {
    	Load(); // loader like ajax 
    	
		PlayerPrefs.SetInt("Needkill",40);
		PlayerPrefs.SetInt("levelselected", 5);
		PlayerPrefs.SetInt("levelTimer", 180);
		PlayerPrefs.Save();
		
		Application.LoadLevel("level0");
      }
    }
  else
  if(GUI.Button(new Rect(SW*0.75, SH*0.4, SW*0.17, SH*0.3),LevelLock, gamelevelsSkins.customStyles [0]));
  
  
	}
	
function Load()
{
        #if UNITY_IPHONE
            Handheld.SetActivityIndicatorStyle(iOSActivityIndicatorStyle.WhiteLarge);
        #elif UNITY_ANDROID
            Handheld.SetActivityIndicatorStyle(AndroidActivityIndicatorStyle.Large);
        #endif
        Handheld.StartActivityIndicator();
        yield  WaitForSeconds(0);
        
}	
	
	