using UnityEngine;
using System.Collections;

public class TimerClass : MonoBehaviour {

	//public FPSController fpsController;

//	public SplineInterpolator SplineInterpolator1;
	public GUISkin guiSkin;
	public  bool isGameOver1; 
	public GameObject gunView;
	//public FPSController fpsController;
//	public FPSInputController fpsInputController;
//	public GunHanddle gunHandle;
//	public PatrolBehavior patrolling;
	public GUISkin G_OverSkin;
	public GUIStyle style;
	public  float myTimer ;

	public bool isGameOver =false;
	public string textTime;
	private int minutes;
	private int seconds;
	private int fraction;
	private bool isInMyTimer =false;
	public int deathCheck;


		// Use this for initialization
	void Start () {
	
		//style.normal.textColor = Color.green;
		//style.font = myFont;
	//	patrolling.enabled = true;
		isGameOver1 = false;
		style.richText = true;
		minutes=0;
		seconds=0;
		fraction=0;
		myTimer=0f;

		myTimer = PlayerPrefs.GetInt("levelTimer");
		Debug.Log (myTimer);
	}
	
	// Update is called once per frame
	void Update () {
		//if(GamePlay.deathcount  != deathCheck)  // when level will clear the timer will be stop to down 

		if(GamePlay.totalkill >= 1 && GamePlay.currentHealth > 0)
			myTimer -= Time.deltaTime;

		//if (GamePlay.isPause || Level1Cleared.isLevelCleared) {
			if (GamePlay.isPause) {
			Time.timeScale =0;
				}


		if (myTimer > 0) {
		
			isInMyTimer= true;
			minutes = (int)myTimer / 60;
			seconds =(int) myTimer % 60;
			fraction =(int)(myTimer * 100) % 100; 
		}
		if(myTimer < 0 || myTimer == 0){

			//Time.timeScale =0;

		//	patrolling.enabled = false; 
			//SplineInterpolator1 .enabled =false;
			//fpsController.enabled =false;
			//isGameOver1 =true;

			PlayerPrefs.SetInt("gameover", 1);
			PlayerPrefs.Save();

		}
	
	}

	void OnGUI(){
		GUI.skin = G_OverSkin;

		if (isInMyTimer) {

			textTime = string.Format("{0:00}:{1:00}:{2:00}", minutes, seconds, fraction);
			//Debug.Log(textTime);
		//	print(textTime);
		//	GUI.Label(,style);
			GUI.Label(new Rect(Screen.width*0.45f, Screen.height*0f, Screen.width*0.2f,Screen.height*0.4f), textTime,style);
				}
	/*	if(isGameOver){
		//	GamePlay.isPause =true;
			isGameOver1 =true;
			Time.timeScale =0;
		//	#if UNITY_EDITOR || UNITY_WEBPLAYER || UNITY_STANDALONE_WIN || UNITY_STANDALONE_OSX
		//	gunView.SetActive(false);
		//	fpsController.enabled = false;
		//	fpsInputController.enabled = false;
		//	gunHandle.enabled = false;
		//	#endif

		//	GUI.DrawTexture (new Rect (Screen.width * 0.28f, Screen.height * 0.20f, Screen.width * 0.45f, Screen.height * 0.14f), "Game Over");
			
			//GUI.DrawTexture (new Rect (Screen.width * 0.38f, Screen.height * 0.25f, Screen.width * 0.3f, Screen.height * 0.1f), "Game Over");
			// restart the game 
			if (GUI.Button (new Rect (Screen.width * 0.33f, Screen.height * 0.5f, Screen.height * 0.1f, Screen.height * 0.4f), "",G_OverSkin.customStyles[1])) {//, G_OverSkin.customStyles [0])) {
				GamePlay.isPause =false;
				Time.timeScale =1;
				//gunView.SetActive(false);
			//	fpsController.enabled = false;
			//	fpsInputController.enabled = false;
			//	gunHandle.enabled = false;
			/*	#if UNITY_EDITOR || UNITY_WEBPLAYER || UNITY_STANDALONE_WIN || UNITY_STANDALONE_OSX
				fpsController.enabled = true;
				fpsInputController.enabled = true;
				gunHandle.enabled = true;
				#endif
				Application.LoadLevel (Application.loadedLevel);
			
				
			}// restart the game 
			// Resume the game 
			if (GUI.Button (new Rect (Screen.width * 0.44f, Screen.height * 0.5f, Screen.height * 0.1f, Screen.height * 0.4f), "",G_OverSkin.customStyles[2])) {//, G_OverSkin.customStyles [0])) {
				GamePlay.isPause =false;
				Time.timeScale =1;
			/*	#if UNITY_EDITOR || UNITY_WEBPLAYER || UNITY_STANDALONE_WIN || UNITY_STANDALONE_OSX
				fpsController.enabled = true;
				fpsInputController.enabled = true;
				gunHandle.enabled = true;
				#endif
				Application.LoadLevel (1);
				
				
			}// restart the game 

			
			
			// menu the game 
			if (GUI.Button (new Rect (Screen.width * 0.55f, Screen.height * 0.5f, Screen.height * 0.1f, Screen.height * 0.4f), "",G_OverSkin.customStyles[3])) {//, G_OverSkin.customStyles [0])) {
				//	AudioListener.volume = 1.0f;
				Time.timeScale =1;
				Application.LoadLevel (0);

		} 

		}*/


	}
}
