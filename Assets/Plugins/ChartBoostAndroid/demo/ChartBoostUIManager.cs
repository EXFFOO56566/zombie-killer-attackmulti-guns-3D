using UnityEngine;
using System.Collections.Generic;


public class ChartBoostUIManager : MonoBehaviour
{
#if UNITY_ANDROID
	void OnGUI()
	{
		GUI.matrix = Matrix4x4.Scale( new Vector3( 2, 2, 2 ) );
		
		if( GUILayout.Button( "Init" ) )
		{
			//replace the App ID and App Signature below
			//ChartBoostAndroid.init( "YOUR_APP_ID", "YOUR_APP_SIGNATURE" );
			ChartBoostAndroid.init( "4f7b433509b6025804000002", "dd2d41b69ac01b80f443f5b6cf06096d457f82bd" );
			ChartBoostAndroid.onStart();
		}

		
		if( GUILayout.Button( "Cache Interstitial" ) )
		{
			ChartBoostAndroid.cacheInterstitial( null );
		}
		
		
		if( GUILayout.Button( "Check for Cached Interstitial" ) )
		{
			Debug.Log( "has cached interstitial: " + ChartBoostAndroid.hasCachedInterstitial( null ) );
		}
		
	
		if( GUILayout.Button( "Show Interstitial" ) )
		{
			ChartBoostAndroid.showInterstitial( null );
		}

		
		if( GUILayout.Button( "Cache More Apps" ) )
		{
			ChartBoostAndroid.cacheMoreApps();
		}
		
		
		if( GUILayout.Button( "Has Cached More Apps" ) )
		{
			Debug.Log( "has cached more apps: " + ChartBoostAndroid.hasCachedMoreApps() );
		}
		
	
		if( GUILayout.Button( "Show More Apps" ) )
		{
			ChartBoostAndroid.showMoreApps();
		}
	}
#endif
}
