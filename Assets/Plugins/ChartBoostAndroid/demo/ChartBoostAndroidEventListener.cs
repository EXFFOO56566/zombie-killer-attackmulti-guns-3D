using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;


public class ChartBoostAndroidEventListener : MonoBehaviour
{
#if UNITY_ANDROID

	void OnEnable()
	{
		// Listen to all events for illustration purposes
		ChartBoostAndroidManager.didFailToLoadMoreAppsEvent += didFailToLoadMoreAppsEvent;
		ChartBoostAndroidManager.didCacheInterstitialEvent += didCacheInterstitialEvent;
		ChartBoostAndroidManager.didCacheMoreAppsEvent += didCacheMoreAppsEvent;
		ChartBoostAndroidManager.didFinishInterstitialEvent += didFinishInterstitialEvent;
		ChartBoostAndroidManager.didFinishMoreAppsEvent += didFinishMoreAppsEvent;
		ChartBoostAndroidManager.didCloseMoreAppsEvent += didCloseMoreAppsEvent;
		ChartBoostAndroidManager.didFailToLoadInterstitialEvent += didFailToLoadInterstitialEvent;
		ChartBoostAndroidManager.didShowInterstitialEvent += didShowInterstitialEvent;
		ChartBoostAndroidManager.didShowMoreAppsEvent += didShowMoreAppsEvent;
	}


	void OnDisable()
	{
		// Remove all event handlers
		ChartBoostAndroidManager.didFailToLoadMoreAppsEvent -= didFailToLoadMoreAppsEvent;
		ChartBoostAndroidManager.didCacheInterstitialEvent -= didCacheInterstitialEvent;
		ChartBoostAndroidManager.didCacheMoreAppsEvent -= didCacheMoreAppsEvent;
		ChartBoostAndroidManager.didFinishInterstitialEvent -= didFinishInterstitialEvent;
		ChartBoostAndroidManager.didFinishMoreAppsEvent -= didFinishMoreAppsEvent;
		ChartBoostAndroidManager.didCloseMoreAppsEvent -= didCloseMoreAppsEvent;
		ChartBoostAndroidManager.didFailToLoadInterstitialEvent -= didFailToLoadInterstitialEvent;
		ChartBoostAndroidManager.didShowInterstitialEvent -= didShowInterstitialEvent;
		ChartBoostAndroidManager.didShowMoreAppsEvent -= didShowMoreAppsEvent;
	}



	void didFailToLoadMoreAppsEvent()
	{
		Debug.Log( "didFailToLoadMoreAppsEvent" );
	}


	void didCacheInterstitialEvent( string location )
	{
		Debug.Log( "didCacheInterstitialEvent: " + location );
	}


	void didCacheMoreAppsEvent()
	{
		Debug.Log( "didCacheMoreAppsEvent" );
	}


	void didFinishInterstitialEvent( string param )
	{
		Debug.Log( "didFinishInterstitialEvent: " + param );
	}


	void didFinishMoreAppsEvent( string param )
	{
		Debug.Log( "didFinishMoreAppsEvent: " + param );
	}


	void didCloseMoreAppsEvent()
	{
		Debug.Log( "didCloseMoreAppsEvent" );
	}


	void didFailToLoadInterstitialEvent( string location )
	{
		Debug.Log( "didFailToLoadInterstitialEvent: " + location );
	}


	void didShowInterstitialEvent( string location )
	{
		Debug.Log( "didShowInterstitialEvent: " + location );
	}


	void didShowMoreAppsEvent()
	{
		Debug.Log( "didShowMoreAppsEvent" );
	}
			
#endif
}


