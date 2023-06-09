#pragma strict

var play : Texture;
var pause : Texture;
var unpause : Texture;
var playmode = false;

function Start(){
	Time.timeScale = 0;
	Screen.lockCursor = false;
}

function DidLockCursor () {
    Debug.Log("Locking cursor");

    // Disable the button
    //guiTexture.enabled = false;
}

// Called when the cursor is being unlocked
// or by a script calling Screen.lockCursor = false;
function DidUnlockCursor () {
    Debug.Log("Unlocking cursor");
	Time.timeScale = 0;
    // Show the button again
   // guiTexture.enabled = true;
}

private var wasLocked = false;

function Update () {
    // In standalone player we have to provide our own key
    // input for unlocking the cursor
    if (Input.GetKeyDown ("escape"))
        Screen.lockCursor = false;
       
    // Did we lose cursor locking?
    // eg. because the user pressed escape
    // or because he switched to another application
    // or because some script set Screen.lockCursor = false;
    if (!Screen.lockCursor && wasLocked) {
        wasLocked = false;
        DidUnlockCursor();
    }
    // Did we gain cursor locking?
    else if (Screen.lockCursor && !wasLocked) {
        wasLocked = true;
        DidLockCursor ();
    }
}

function OnGUI(){

	if(playmode == true){
	if(Screen.lockCursor == false){
		if(GUI.Button(Rect(Screen.width -120, 20, 100, 30), unpause)){
			Screen.lockCursor = true;
			Time.timeScale = 1;
		}	
	}
	else
		{
			if(GUI.Button(Rect(Screen.width -120, 20, 100, 30), pause)){
				Screen.lockCursor = false;
				Time.timeScale = 0;
			}
		}
	}
	else
	if(GUI.Button(Rect(Screen.width -120, 200, 100, 30), play)){
   	Time.timeScale = 1;
	Screen.lockCursor = true;
	playmode = true;
	}
	
}