using UnityEngine;
using System;
using System.Collections;
using System.Runtime.InteropServices;

public class AdController : MonoBehaviour {
	public static AndroidJavaObject lbController = null;
	public static readonly int TYPE_DISPLAY = 0;
	public static readonly int TYPE_AUDIO = 1;

	private static void initializeLeadboltController()
	{
		if (lbController == null) {
			AndroidJavaClass jc = new AndroidJavaClass ("com.unity3d.player.UnityPlayer");
			AndroidJavaObject jo = jc.GetStatic<AndroidJavaObject> ("currentActivity");
			lbController = new AndroidJavaObject ("com.unity.wrapper.LeadBoltUnity", jo);
		}
	}

	public static void initAdWithSectionId (string sectId, int adType) {
		initializeLeadboltController ();

		if (adType == TYPE_AUDIO) {
			lbController.Call("initLBAudio", sectId);
		} else {
			lbController.Call("initLB", sectId);
		}
	}
	
	public static void loadAd () {
		if (lbController != null)
		{
			lbController.Call ("loadAd");
		}
	}
	
	public static void setAdditionalDockingMargin (int margin) {

		if (lbController != null)
		{
			lbController.Call ("setAdditionalDockingMargin", margin);
		}
	}

	public static void loadAudioAd () {
		if (lbController != null)
		{
			lbController.Call ("loadAudioAd");
		}
	}

	public static void loadAudioTrack (int interval) {
		if (lbController != null) {
			lbController.Call ("loadAudioTrack",interval);
		}
	}

	public static void loadStartAd (string sectId, string audioId, string reEngageId) {
		initializeLeadboltController ();

		if (lbController != null) {
			lbController.Call ("loadStartAd",sectId,audioId,reEngageId);
		}
	}

	public static void destroyAd () {
		if (lbController != null) {
			lbController.Call ("destroyAd");
		}
	}

	public static void loadReEngagement (string sectId) {
		initializeLeadboltController ();

		if (lbController != null) {
			lbController.Call ("loadReEngagement",sectId);
		}
	}

	public static void loadAdToCache () {
		if (lbController != null) {
			lbController.Call ("loadAdToCache");
		}
	}

	public static void loadAudioAdToCache () {
		if (lbController != null) {
			lbController.Call ("loadAudioAdToCache");
		}
	}

		public static event Action onAdClosedEvent;
		public static event Action onAdLoadedEvent;
		public static event Action onAdFailedEvent;
		public static event Action onAdClickedEvent;
		public static event Action onAdCachedEvent;

		public static event Action onAdFinishedEvent;
		public static event Action onAdProgressEvent;

		void Awake() {
				gameObject.name = "LeadboltController";
				DontDestroyOnLoad (this);
		}

		public void onAdClosed(string message) {
				if (onAdClosedEvent != null)
						onAdClosedEvent();
		}
		public void onAdFailed(string message) {
				if (onAdFailedEvent != null)
						onAdFailedEvent ();
		}
		public void onAdLoaded(string message) {
				if (onAdLoadedEvent != null)
						onAdLoadedEvent ();
		}
		public void onAdClicked(string message) {
				if (onAdClickedEvent != null)
						onAdClickedEvent ();
		}
		public void onAdCached(string message) {
				if (onAdCachedEvent != null)
						onAdCachedEvent ();
		}

		public void onAdFinished(string message) {
				if (onAdFinishedEvent != null)
						onAdFinishedEvent ();
		}
		public void onAdProgress(string message) {
				if (onAdProgressEvent != null)
						onAdProgressEvent ();
		}
}
