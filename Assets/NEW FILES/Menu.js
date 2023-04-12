#pragma strict

public var musicOnText 		 : Texture;
public var musicOffText 		 : Texture;
public var texSoundOn			 : Texture;
public var texSoundOff			 : Texture;
public var texQuit			 	 : Texture;
//public var cross		 	 : Texture;
var BG 						   	 : Texture;
public var soundPop			 : Texture;	
public var closebuttondialog    : Texture;
var mySkin       				 : GUISkin;
public var textur						: GameObject;

private var SW : float = Screen.width;
private var SH : float = Screen.height;
private var soundSetting          : boolean=false;


public static var isQuit				 : boolean = false;
private var istexTryMe 		 	 : boolean = true;




var buttonClick					 : AudioClip;

var closeDialog					 : boolean = true;

var download : Texture;
var title :Texture;

private var rectTryMe 	: Rect = Rect(0, Screen.height - Screen.height * 0.256, Screen.height * 0.256, Screen.height * 0.256);

function Start () {
Time.timeScale = 1;
/////////////Admob////////////////
	
	/////////////////////////
	//set value for menulevellock
	PlayerPrefs.SetInt("SavedLevel", 0);
	PlayerPrefs.SetInt("bestScore", 0);
	PlayerPrefs.Save();

	if(PlayerPrefs.GetString ("MusicOn") == "False") {
		PlayerPrefs.SetString ("MusicOn","False");
		PlayerPrefs.Save();
	}
	else {
		PlayerPrefs.SetString ("MusicOn","True");
		PlayerPrefs.Save();
	}
	
	if(PlayerPrefs.GetString ("SoundOn") == "False") {
		PlayerPrefs.SetString ("SoundOn","False");
		PlayerPrefs.Save();
	}
	else {
		PlayerPrefs.SetString ("SoundOn","True");
		PlayerPrefs.Save();
	}
	LoadMyResources();
	
	
}
	function onModuleFailedEvent()
	{
		loadDisplayAd();
	}
	
	function loadDisplayAd()
	{
		// Use this function elsewhere in your App to display a Leadbolt interstitial Ad
		AdController.initAdWithSectionId ("429315103",AdController.TYPE_DISPLAY);
		AdController.loadAdToCache(); // Un-comment and place appropriately to cache Ad
		AdController.loadAd();
	}
function Update () {
//PlayerPrefs.DeleteAll();

 rigidbody.constraints = RigidbodyConstraints.None;
	if(Input.GetKeyDown(KeyCode.Escape)) {
		isQuit = !isQuit;
	}
	
	if (PlayerPrefs.GetString ("MusicOn") == "True") {
		//MenuAudio.gameObject.SetActive(true);
	AudioListener.volume = 1.0;
		//audio.enabled = true;
	}
	if (PlayerPrefs.GetString ("MusicOn") == "False") {
		//MenuAudio.gameObject.SetActive(false);
	AudioListener.volume = 0.0;
		//AudioListener.pause = true;
		//audio.enabled = false;
	}

}

function OnGUI () {
	GUI.skin = mySkin;
	GUI.DrawTexture(Rect(SW*0, SH*0 , SW*1, SH*1),BG);

	if(!isQuit) {

	/*
	
		if(istexTryMe)
	  		GUI.DrawTexture(Rect(0,0,Screen.height*0.256,Screen.height*0.256), texTryMe);
	  	if(rectTryMe.Contains(Input.mousePosition) && Input.GetMouseButton(0) && istexTryMe) {
	  		if(PlayerPrefs.GetString ("SoundOn") == "True") // latest change
	  			audio.PlayOneShot (buttonClick , 2);
	  			
			istexTryMe = false;	
			HZInterstitialAd.show ("default");
			//Share.leadBoltWall();
	  	}
	  	else
	  		istexTryMe = true;	
	  		
	  		*/
		//if(soundSetting)
		//{
		
			//if(closeDialog)
			//{
			
			//	GUI.DrawTexture(Rect(SW*0.20, SH*0.20,SW*0.6, SH*0.6),soundPop);
					if ( PlayerPrefs.GetString ("MusicOn") == "True" ) {
						if(GUI.Button(Rect(SW*0.72,SH*0.43,SW*0.20,SH*0.25), "", mySkin.customStyles[3])){
						
							PlayerPrefs.SetString ("MusicOn","False");
							
							PlayerPrefs.Save();
						}
					}
					else{
						if(GUI.Button(Rect(SW*0.72,SH*0.43,SW*0.20,SH*0.25),"",mySkin.customStyles[4])){
							audio.PlayOneShot (buttonClick , 2);	  	
							PlayerPrefs.SetString ("MusicOn","True");
							PlayerPrefs.Save();
						}
					
					}
				if ( PlayerPrefs.GetString ("SoundOn") == "True" ) {
					if(GUI.Button(Rect(SW*0.72,SH*0.6,SW*0.20,SH*0.25),"",mySkin.customStyles[5])){
						PlayerPrefs.SetString ("SoundOn","False");
						PlayerPrefs.Save();
					}
				}
				else {
					if(GUI.Button(Rect(SW*0.72,SH*0.6,SW*0.20,SH*0.25),"",mySkin.customStyles[6]))	{
						audio.PlayOneShot (buttonClick , 2);  	
						PlayerPrefs.SetString ("SoundOn","True");
						PlayerPrefs.Save();
					}
				}
				if(closeDialog)
				{
					if(GUI.Button(Rect(SW*0.70,SH*0.210,SW*0.04,SH*0.06),"",mySkin.customStyles[0])){
						closeDialog=false;
						soundSetting=false;
					}
				}
			//}
		//}
		//else{
			// Play button
			
			if(GUI.Button(Rect(SW*0.52, SH*0.40 , SW*0.25, SH*0.35),"", mySkin.customStyles[1])){
		
				Load(); // loader like ajax 
				
				audio.PlayOneShot(buttonClick,2f);
				//AudioSource.PlayClipAtPoint(buttonClick, Camera.main.audio.Play);
				//textur.SetActive(true);
				//Application.LoadLevel(1);
				Application.LoadLevel("Levelmenu");
				loadDisplayAd();
						

//				PluginManager.InitializeLeadBoldAdForUnity ("737524508");
				
				//if(PlayerPrefs.GetString ("SoundOn") == "True")
					//audio.PlayOneShot (buttonClick , 10);
					
					
					//
	
			//	Share.HideAllAds();
				
			}
			// Load Levels
			//if(GUI.Button(Rect(SW*0.1, SH*0.41 , SW*0.3, SH*0.11),"",mySkin.customStyles[6])){
			
		//	Application.LoadLevel(2);
			
			
			
			
		//	}
		
			// Setting button
		///	if(GUI.Button(Rect(SW*0.275,SH*0.6,SW*0.09,SH*0.11),"",mySkin.customStyles[2]))
		//	{
			//	soundSetting=true;
			//	closeDialog=true;
		//	}
			
			
			
			// More button
			if(GUI.Button(Rect(SW*0.72, SH*0.26 , SW*0.20, SH*0.25),"",mySkin.customStyles[2]))
			{
				//if(PlayerPrefs.GetString ("SoundOn") == "True") // latest change
					audio.PlayOneShot (buttonClick , 2f);
					
				//if (Application.platform != RuntimePlatform.WindowsEditor)
				//	Application.OpenURL("https://play.google.com/store/apps/developer?id=Xpert%20Games%20Developer&hl=en");
			
			}
			GUI.DrawTexture(Rect(Screen.width*0.36,Screen.height*0.03,Screen.width*0.55,Screen.height*0.2),title);
		
			//if (Time.time - Time.time < 0.5)
			//GUI.DrawTexture(Rect(Screen.width*0.7,Screen.height*0.03,Screen.width*0.3,Screen.height*0.2),download);
			
			
			// Share button
		//	if(GUI.Button(Rect(SW*0.11,SH*0.69,SW*0.09,SH*0.13),"",mySkin.customStyles[3]))
		//	{
		//		if(PlayerPrefs.GetString ("SoundOn") == "True") // latest change
					//audio.PlayOneShot (buttonClick , 2);	
		//		if (Application.platform != RuntimePlatform.WindowsEditor)
		//			Share.share();
		//	}

				
			
		//}
		
		
	}
		
	else {
		GUI.DrawTexture(Rect(SW * 0.25, SH * 0.3, SW * 0.5, SH * 0.421),texQuit);
		if(GUI.Button(Rect(SW * 0.27, SH * 0.618, SH * 0.125, SH * 0.065),"", mySkin.customStyles[0]))
			Application.Quit();
		if(GUI.Button(Rect(SW * 0.65, SH * 0.62, SH * 0.125, SH * 0.065),"", mySkin.customStyles[0]))
			isQuit = false;
			print("Yes button clicked");
		}
	
}

function LoadMyResources() {
	//musicOnText = Resources.Load ("music-on", Texture);	
	//musicOffText = Resources.Load ("music-off", Texture);
	//texSoundOn = Resources.Load ("Sound-on", Texture);	
	//texSoundOff = Resources.Load ("Sound-off", Texture);
	//texQuit = Resources.Load ("texQuit", Texture);
	//cross = Resources.Load ("cross", Texture);
	//soundPop = Resources.Load("pop up",Texture);
	//closebuttondialog= Resources.Load("close",Texture);
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