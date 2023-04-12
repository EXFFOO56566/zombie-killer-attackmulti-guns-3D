using UnityEngine;
using System.Collections;

public class GamePlay : MonoBehaviour {

	//public Texture blood;
	public Texture levelTexture; 
	public static int score ;
	public static int totalkill ;
	public static int gameovvr ;
//	private int bestScore = 0;
	public static bool  isPause = false;
	public static bool  isHideCrossOver = false;
	private float SW = Screen.width;
	private float SH = Screen.height;
	public static bool levelclearflg=false;

	public GameObject medical;
	public static bool addmedi = true;
	
	public static float playerHealth = 1000;
	////////////////////	Textures	/////////////////////////
	public GUISkin guiSkin;	

	public static float delayCount = 3.0f;


	public Texture clockBG;
	private Texture texScore;
	private Texture texBest;
	public Texture clockFG;
	private Texture texBG;
	public Texture gameOver;
	public Texture gamePause;
	public Texture levelCleared;
	public Texture shootTex;
	public Texture zoomTex;
	
	public bool isDeathAds = true;
	public static bool isReadarShow;

	//public hitSound AudioClip;
	
	
	public static bool isTextureFireZoom = false;
	float clockFGMaxWidth;
	public static float currentHealth;
	private  int healthscore ;

	//for health
	private float btnHealthX;
	private float btnHealthY; 
	private float btnHealthWidth;
	private float btnHealthHeight;
	private float newBarWidth = 0;

//	public static AndroidJavaClass pluginClassP;
//	public static AndroidJavaObject //;
	
//	public FPSController fpsController;
	//public FPSInputController fpsInputController;
	//public GunHanddle gunHandle;
	//private GunHanddle gunHanddle;
	public static bool isRedarShowing = false;
	public bool checkAdd = true;
	
	void onModuleFailedEvent()
	{
		loadDisplayAd();
	}
	
	void loadDisplayAd()
	{
		// Use this function elsewhere in your App to display a Leadbolt interstitial Ad
		AdController.initAdWithSectionId ("429315103",AdController.TYPE_DISPLAY);
		 AdController.loadAdToCache(); // Un-comment and place appropriately to cache Ad
		AdController.loadAd();
	}







	void Update(){
		 
		DrawLevelClearedGUI();
		currentHealth = PlayerPrefs.GetInt("hitPoints");
		healthscore = PlayerPrefs.GetInt ("hitPoints");
		//Debug.Log (currentHealth);


		//MedicPrefab.SetActive(false);
	
		/*if (PlayerPrefs.GetInt ("killenemy") == 2) {
					if (addmedi) {
					Instantiate (medical);
					addmedi = false;
						} 

				}*/
	}
	
	void Start() 
	{
		Time.timeScale = 1;
		Screen.lockCursor = true;
		//fpsController.enabled = true;
		//fpsInputController.enabled = true;
		//gunHandle.enabled = true;
	//	//.show ("default");
	      score = 0;
		/////////////Admob////////////////
		/*if (Application.platform != RuntimePlatform.WindowsEditor){
				Share.InitializeAdmob();
			
			//	Share.HideAllAds();
				Share.DisplayAdmob();
		}*/
		
		//loadResources ();
		playerHealth = 1000;
		//loadResources ();

		clockFGMaxWidth = clockFG.width;

		//currentHealth = 100;


		currentHealth = PlayerPrefs.GetInt("hitPoints");
		//Debug.Log (currentHealth);

		//for health
		btnHealthWidth = SH*0.372f; // new
		btnHealthHeight = SH*0.050f;
		btnHealthX = SH*0.190f;
		btnHealthY= SH*0.015f;


		
		//guiSkin.customStyles[0].fontSize = SH * 0.035f;
		//	guiSkin.customStyles[1].fontSize = SH * 0.055f;
		//	guiSkin.customStyles[2].fontSize = SW * 0.05f;
		
		
		
		if(PlayerPrefs.GetString ("SoundOn") == "False") {
			AudioListener.volume = 0.0f;
		}
		
		else {
			PlayerPrefs.SetString ("SoundOn","True");
			AudioListener.volume = 1.0f;
		}
		isPause = false;
		
		//gunHanddle = GetComponent<GunHanddle> (); 
	}
	
	void loadResources()
	{
	//	texPause 		= Resources.Load("Pause") as Texture;
		clockBG 		= Resources.Load("clockBG") as Texture;
		clockFG 		= Resources.Load("clockFG") as Texture;
		texBG 			= Resources.Load("texBG")  as Texture;
		//gamePause		= Resources.Load("game pause")  as Texture;
		//gameOver		= Resources.Load("game over") as Texture;
	//	zoomTex			= Resources.Load("texzoom") as Texture;
		
	}
	
	void ShowAdds(){
		
		//.show ("default");
		isDeathAds = false;
		
	}

	/*void ftn(){

		MarineTroopHitDownToRun.isAttacked =false;

		}
*/
	void OnGUI() {
		isRedarShowing = false;
		isReadarShow = false;
		GUI.skin = guiSkin;
		//GUI.DrawTexture (new Rect (new Rect (Screen.width*0.4f, 0, Screen.width*0.15f, Screen.height*0.12f)), levelTexture);
		guiSkin.customStyles[2].fontSize = Screen.width/40;
		guiSkin.customStyles[3].fontSize = Screen.width/10;

		//GUI.Button( Rect( Screen.width*0.4f, 0, Screen.width*0.15f, Screen.height*0.12f),GUIContent( enemytext, enemy));

		/*
		if (MarineTroopHitDownToRun.isAttacked) {
			GUI.DrawTexture (new Rect (new Rect (Screen.width*0f,  Screen.height*0, Screen.width*1f, Screen.height*1f)), blood);
			Invoke("ftn",1f);
				}
*/

		if(!isPause &&  currentHealth > 0 ){
			GUI.depth = 0;
			DrawGamePlayGUI();

		/*	if(Gun.isZoomClicked){
				GUI.DrawTexture (new Rect (new Rect (Screen.width - 200, Screen.height * 0.64f, 200, 200)), shootTex);
				GUI.Button (new Rect(Screen.width *0.85f,Screen.height * 0.47f,Screen.width *0.1f,Screen.height * 0.15f),zoomTex ,guiSkin.customStyles[1]);
				Gun.isZoomClicked = false;
				
			}
			if(!isTextureFireZoom){
				
				GUI.DrawTexture (new Rect (new Rect (Screen.width - 200, Screen.height * 0.64f, 200, 200)), shootTex);
				GUI.Button (new Rect(Screen.width *0.85f,Screen.height * 0.47f,Screen.width *0.1f,Screen.height * 0.15f),zoomTex ,guiSkin.customStyles[1]);
				
			}*/
		}
		
		if (isPause && playerHealth > 0) {
			DrawPauseDialog ();
			
		}//&& SPlayerProperties.playerHealth > 0) {

		//GUI.matrix = Matrix4x4.TRS(new Vector3(GUIsF.x,GUIsF.y,0),Quaternion.identity,GUIsF);
		
		guiSkin.customStyles[1].fontSize = Screen.width/30;

		totalkill = PlayerPrefs.GetInt("Needkill")-PlayerPrefs.GetInt("killenemy");
		
		GUI.Label(new Rect(SH * 0.037f, SH * 0.11f,SH * 0.200f, SH * 0.200f), "Score : " + PlayerPrefs.GetInt("currentScore"), guiSkin.customStyles[7]);
		GUI.Label(new Rect(SH * 0.037f, SH * 0.17f,SH * 0.200f, SH * 0.200f), "Best Score : " + PlayerPrefs.GetInt("bestScore"), guiSkin.customStyles[7]);
		GUI.Label(new Rect(SH * 0.037f, SH * 0.24f,SH * 0.200f, SH * 0.200f), "Enemy Kill : " + PlayerPrefs.GetInt("killenemy")+" / "+PlayerPrefs.GetInt("Needkill"), guiSkin.customStyles[7]);


		//GUI.Label(new Rect(SH * 0.85f, SH * 0.02f,SH * 0.200f, SH * 0.200f), "You need to Kill ", guiSkin.customStyles[8]);
		//GUI.Label(new Rect(SH * 1.10f, SH * 0.02f,SH * 0.200f, SH * 0.200f), ""+totalkill , guiSkin.customStyles[9]);
		//GUI.Label(new Rect(SH * 1.18f, SH * 0.02f,SH * 0.200f, SH * 0.200f), " Enemy to Unlock Next Level", guiSkin.customStyles[8]);


		//for health score
		//scale and position the GUI element to draw it at the screen's top left corner

		//draw GUI on the top left
		//GUI.Label(new Rect(20,20,258,89),""+healthscore , guiSkin.customStyles[9]);
		//GUI.Label(new Rect(20,20,258,89)," / 100 " , guiSkin.customStyles[8]);

		//for health score
		//GUI.Label(new Rect(SW * 0.26f, SH * 0.02f,SH * 0.200f, SH * 0.200f), ""+healthscore , guiSkin.customStyles[9]);
		//GUI.Label(new Rect(SW * 0.28f, SH * 0.02f,SH * 0.200f, SH * 0.200f), " / 100 " , guiSkin.customStyles[8]);


		

		//GUI.Button (new Rect (10,10, 100, 50), enem);
		//GUI.DrawTexture (new Rect (new Rect (Screen.width*0.4f, 0, Screen.width*0.15f, Screen.height*0.12f)), levelTexture);

		//if(score==100 || score==250 ||score==500 || score==800){
		//	playerHealth = 999; 
		//}
		//for player
		if (playerHealth > 0 && currentHealth >=0) {
			if( playerHealth == 1000 ) { 
				newBarWidth = (currentHealth/100) * btnHealthWidth/1.23f;
			}
			else { 
				currentHealth = playerHealth; 
				newBarWidth  = (currentHealth/1000) * btnHealthWidth/1.23f;
			}
		}

	
		gameovvr = PlayerPrefs.GetInt ("gameover");

		if(gameovvr > 0) {

		//if(playerHealth <= 0) {
		//	Time.timeScale = 0.0f; this code jammm every thing in game
			///.show ("default");
			if(checkAdd){
			loadDisplayAd();
				checkAdd = false;
			}
			if(isDeathAds) {
//					ChartBoostAndroid.init( "52ec754f2d42da3b2de00c26", "d6c9747764a0ce2edf61f349f0d8a8e50d2ad4ed" );
///						ChartBoostAndroid.onStart();
			//			ChartBoostAndroid.showInterstitial( null );
				
				
			//		//.show ("default");
				//isDeathAds = false;
			//	Invoke("ShowAdds",1f);
			}
			#if UNITY_EDITOR || UNITY_WEBPLAYER || UNITY_STANDALONE_WIN || UNITY_STANDALONE_OSX
			//fpsController.enabled = false;
			//fpsInputController.enabled = false;
			//gunHandle.enabled = false;
			#endif
			
//			print ("Player Health Down");
			
		/*	if(score > PlayerPrefs.GetInt("bestScore")) {
				bestScore = score;
				
				PlayerPrefs.SetInt("bestScore", bestScore);
				PlayerPrefs.Save();
			}
		*/	
			//GUI.DrawTexture(new Rect(0,0,SW,SH),texBG);
			GUI.DrawTexture(new Rect(SW * 0.25f, SH * 0.03f, SW * 0.52f, SH * 0.55f),gameOver);
			isRedarShowing = true;
			
			//if(GUI.Button(new Rect(SW*0.32f, SH*0.44f , SH*0.3f, SH*0.12f),"",guiSkin.customStyles[5])) {
			if (GUI.Button (new Rect (SW * 0.27f, SH * 0.52f, SH * 0.57f, SH * 0.27f), "", guiSkin.customStyles [5])) {
				Load();
				isPause = false;
				Application.LoadLevel (Application.loadedLevel);//latest change
			}
			
			//if(GUI.Button(new Rect(SW*0.53f, SH*0.44f , SH*0.3f, SH*0.12f),"",guiSkin.customStyles[6])) {
			if (GUI.Button (new Rect (SW * 0.48f, SH * 0.52f, SH * 0.57f, SH * 0.27f), "", guiSkin.customStyles [6])) {
				
				Load();
				Time.timeScale = 1f;
				Application.LoadLevel(0);

				////.Call("hideInMobi");
			}
		}

		//playerHealth healthbar
		//GUI.DrawTexture(new Rect (SH*0.115f, (SH*0.065f) + (SH*0.065f) * 0.3f, newBarWidth, btnHealthHeight - btnHealthHeight*1.6f), clockFG);
		//GUI.DrawTexture(new Rect (SH*0.072f, (SH*0.065f) + (SH*0.065f) * 0.3f, newBarWidth, btnHealthHeight - btnHealthHeight*1.6f), clockFG);
		//GUI.DrawTexture(new Rect (SH*0.162f, (SH*0.065f) + (SH*0.065f) * 0.3f, newBarWidth, btnHealthHeight - btnHealthHeight*1.6f), clockFG);
		//GUI.Button(new Rect(Screen.width*0.01f,Screen.height*0.01f,Screen.width*0.1f,Screen.height*0.1f),"Check");


		//GUI.DrawTexture(new Rect (SH*0.162f, (SH*0.065f) + (SH*0.065f) * 0.3f, newBarWidth, btnHealthHeight - btnHealthHeight*1.6f), clockFG);
		GUI.DrawTexture(new Rect (btnHealthX, btnHealthY,btnHealthWidth, btnHealthHeight), clockBG);

		//GUI.DrawTexture(new Rect (btnHealthX-0.5f, btnHealthY,btnHealthWidth, btnHealthHeight), clockBG);
		GUI.DrawTexture(new Rect (btnHealthX, btnHealthY, newBarWidth, btnHealthHeight), clockFG);



		totalkill = PlayerPrefs.GetInt("Needkill")-PlayerPrefs.GetInt("killenemy");
		if (totalkill < 1) {
			GUI.DrawTexture(new Rect(SW * 0.25f, SH * 0.03f, SW * 0.52f, SH * 0.55f),levelCleared);
		}
		//enemy healthbar
		//GUI.DrawTexture(new Rect (SH*0.162f, (SH*0.105f) + (SH*0.105f) * 0.3f, newBarWidthEnemy, btnEnemyHeight - btnEnemyHeight*1.6f), clockFG);
		//GUI.DrawTexture(new Rect (btnEnemyX, btnEnemyY, btnEnemyWidth, btnEnemyHeight), clockBG);

		//////////////////Health Bar////////////f///////////
		/// 
	}
	void DrawPauseDialog()
	{

		isPause = true;
		isHideCrossOver =false;
		isReadarShow = true;
		guiSkin.horizontalSlider.fixedWidth = btnHealthWidth;
		guiSkin.horizontalSlider.fixedHeight = btnHealthHeight;
		guiSkin.horizontalSliderThumb.fixedWidth = btnHealthWidth * 0.10f;
		guiSkin.horizontalSliderThumb.fixedHeight = btnHealthHeight;
		
		GUI.DrawTexture (new Rect (SW * 0.24f, SH * 0.05f, SW * 0.5f, SH * 0.55f), gamePause);
		if (isPause) {
		//	Time.timeScale = 0;
		}
		////////////////////////////Pause Menu Buttons end////////////////////////////////////
		
		// Reusme the game 
		if (GUI.Button (new Rect (SW * 0.20f, SH * 0.52f, SH * 0.57f, SH * 0.27f), "", guiSkin.customStyles [4])) {
			AudioListener.volume = 1.0f;
			//Share.DisplayAdmob();
			isPause = false;
			Time.timeScale =1;
			Screen.lockCursor = true;
			//fpsController.enabled = true;
			//fpsInputController.enabled = true;
			//gunHandle.enabled = true;
			isHideCrossOver =false;
			
		}// Reusme the game 
		
		
		
		// Restart the game 
		if (GUI.Button (new Rect (SW * 0.38f, SH * 0.52f, SH * 0.57f, SH * 0.27f), "", guiSkin.customStyles [5])) {
			AudioListener.volume = 1.0f;
			Time.timeScale =1;
			Screen.lockCursor = true;
			//if (Application.platform != RuntimePlatform.WindowsEditor);pause

			//Share.HideAllAds();
			Load ();
			isPause = false;
//			print ("Restart");
			isHideCrossOver =false;
			
			Application.LoadLevel (Application.loadedLevel);//latest change
			loadDisplayAd();
			
			////.Call("hideInMobi");
			
			
		}// Restart the game 
		
		// load game menue 
		if (GUI.Button (new Rect (SW * 0.56f, SH * 0.52f, SH * 0.57f, SH * 0.27f), "", guiSkin.customStyles [6])) {
			Load();
			isPause = true;
			Time.timeScale =1;
			Screen.lockCursor = true;
			isHideCrossOver =false;
			Application.LoadLevel(0);
			loadDisplayAd();

		}
		
		
	}


	void  DrawGamePlayGUI ()
	{
		if (GUI.Button (new Rect (SW * 0.02f, SH * 0.01f, SW * 0.04f, SH * 0.06f), "",guiSkin.customStyles[3]) || Input.GetKeyDown (KeyCode.Escape)) {
			
			isPause = true;
			Time.timeScale =0;
			///PluginManager.InitializeLeadBoldAdForUnity ("135814973"); // interstitial and wall change according to the ID's
			//fpsController.enabled = false;
			//fpsInputController.enabled = false;
			//gunHandle.enabled = false;
			isHideCrossOver = true;
			loadDisplayAd();
			//.show ("default");
			return;
			
		}		  	
	}
	
	void  DrawLevelClearedGUI()
	{
		//var enemies = GameObject.FindWithTag("Enemy");
		totalkill = PlayerPrefs.GetInt("Needkill")-PlayerPrefs.GetInt("killenemy");

		if (totalkill < 1) {

		delayCount -= Time.deltaTime;
		if (delayCount<0) 
		{  

			levelclearflg=true;
			//GUI.DrawTexture(new Rect(SW * 0.25f, SH * 0.01f, SW * 0.5f, SH * 0.55f),gameOver);
			Time.timeScale =1;
			//Application.LoadLevel("stagLevel2");
			var levelVal = PlayerPrefs.GetInt("SavedLevel");

			//Debug.Log(levelVal);
			levelVal = levelVal+1;
			//Debug.Log("After/"+levelVal);
			if(levelVal<5){
			PlayerPrefs.SetInt("SavedLevel", levelVal);
			PlayerPrefs.Save();
			}
		
			loadDisplayAd();
			Application.LoadLevel("Levelmenu");
		}

		}


	}
	
	
	IEnumerator  Load ()
	{
		#if UNITY_IPHONE
		Handheld.SetActivityIndicatorStyle(iOSActivityIndicatorStyle.WhiteLarge);
		#elif UNITY_ANDROID
		Handheld.SetActivityIndicatorStyle(AndroidActivityIndicatorStyle.Large);
		#endif
		//Handheld.StartActivityIndicator();
		yield return new WaitForSeconds(0);      
	}	
	

}
