using UnityEngine;
using System.Collections;

public class LoadUI : MonoBehaviour {
	public Color backgroundColor = Color.black;
	public Color textColor = Color.blue;
	public string message = "Loading...";
	public Texture BG; 

	//private float SW = Screen.width;
//	private float SH = Screen.height;
	
	void Start() {
		Camera.main.backgroundColor = backgroundColor;
	}
	
	void OnGUI() {
		//cache and update GUI settings
		Color cachedColor = GUI.contentColor;
		GUI.contentColor = textColor;
		
		//draw label
		float width = 60f;
		float height = 20f;
		float left = Screen.width / 2 - width;
		float top = Screen.height / 2 - height;
		Rect rect = new Rect(left, top, width, height);
		GUI.Label (rect, message);
		
		//restore GUI settings
		GUI.contentColor = cachedColor;

		//GUI.DrawTexture(Rect(SW*0, SH*0 , SW*1, SH*1),BG);
	}
}
