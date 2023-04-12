/**
*  Script written by OMA [www.armedunity.com]
**/

@script ExecuteInEditMode()

var hitPoints : int;
//var painSound : AudioClip;
var die : AudioClip;
var deadReplacement : Transform;
var mySkin : GUISkin;
var explShake : GameObject;
private var radar : GameObject;
private var maxHitPoints : int;
var damageTexture : Texture;
private var time : float = 0.0;
private var alpha : float;
private var callFunction : boolean = false;
var gameover : int = 0;


function Start(){
	maxHitPoints = hitPoints;
	alpha = 0;
	
	//save player point as a session
	PlayerPrefs.SetInt("hitPoints", hitPoints);
	PlayerPrefs.SetInt("gameover", gameover);
	PlayerPrefs.Save();
}

function Update(){
    if (time > 0){ 
        time -= Time.deltaTime;
    }
    alpha = time;
}

function PlayerDamage (damage : int) {
	if (hitPoints < 0.0)
		return;

		// Apply damage
		hitPoints -= damage;
		//audio.PlayOneShot(painSound, 1.0 / audio.volume);
		time = 2.0;		
	
	//save player point as a session
	PlayerPrefs.SetInt("hitPoints", hitPoints);
	PlayerPrefs.Save();

	// Are we dead?
	if (hitPoints <= 0.0)
		Die();
}

//Picking up MedicKit
function Medic (medic : int){
	
	hitPoints += medic;
	
	if(hitPoints > maxHitPoints)
	hitPoints = maxHitPoints;
	//save player point as a session
	PlayerPrefs.SetInt("hitPoints", hitPoints);
	PlayerPrefs.Save();
}

function Die () {
	if(callFunction)
	return;
	callFunction = true;
	
	if (die && deadReplacement)
		AudioSource.PlayClipAtPoint(die, transform.position);

	// Disable all script behaviours (Essentially deactivating player control)
	var coms : Component[] = GetComponentsInChildren(MonoBehaviour);
	for (var b in coms) {
		var p : MonoBehaviour = b as MonoBehaviour;
		if (p)
			p.enabled = false;
	}
	// Disable all renderers
	var gos = GetComponentsInChildren(Renderer);
	for( var go : Renderer in gos){
		go.enabled = false;

    }
	if(radar != null){
		radar = gameObject.FindWithTag("Radar");
		radar.gameObject.SetActiveRecursively(false);
	}
	Instantiate(deadReplacement, transform.position, transform.rotation);
	
	gameover = 1;
	hitPoints = 0;
	
	//save player point as a session
	PlayerPrefs.SetInt("hitPoints", hitPoints);
	
	//save player point as a session
	PlayerPrefs.SetInt("gameover", gameover);
	PlayerPrefs.Save();
	
    yield WaitForSeconds(4.5);
	//LevelLoadFade.FadeAndLoadLevel(Application.loadedLevel, Color.black, 2.0);
	//Application.LoadLevel (Application.loadedLevel);//latest change
	
}


function OnGUI () {
    GUI.skin = mySkin;
	var style0 = mySkin.customStyles[0];
	var style1 = mySkin.customStyles[1];
	var style2 = mySkin.customStyles[2];
	//GUI.Label (Rect(70, Screen.height - 580,60,60)," HP: ",style2);
	//GUI.Label (Rect(287, Screen.height - 573,60,60),"" +hitPoints, style2);
	//GUI.Label (Rect(305, Screen.height - 573,60,60),"" +" / 100", style1);
	
	
	GUI.color = Color(1.0, 1.0, 1.0, alpha); //Color (r,g,b,a)
	GUI.DrawTexture(new Rect(0,0,Screen.width, Screen.height), damageTexture);
	//Application.LoadLevel (Application.loadedLevel);//latest change
}

function Exploasion(){
	explShake.animation.Play("exploasion");
}