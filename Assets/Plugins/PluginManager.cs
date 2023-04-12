using UnityEngine;
using System.Collections;

public class PluginManager
{

		private static AndroidJavaObject jObject, joLeadBolt;


	
		public static void InitializeLeadBoldAdForUnity (string id)
		{
				Debug.Log ("InitializeLeadBoldAdForUnity called");
		
				AndroidJavaClass jc = new AndroidJavaClass ("com.unity3d.player.UnityPlayer"); 
				joLeadBolt = jc.GetStatic<AndroidJavaObject> ("currentActivity");					
				using (AndroidJavaObject ad = new AndroidJavaObject("com.unity.wrapper.LeadBoltUnity", joLeadBolt)) 
						ad.Call ("loadAd", id);	// for Quick Start Ads 454878647
		}
}
