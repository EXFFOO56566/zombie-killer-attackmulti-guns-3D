using UnityEngine;
using System.Collections;

public class update_health : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}

	void OnTriggerEnter (Collider other) { 
		if (other.CompareTag ("Player")){
			other.SendMessageUpwards("Medic", 50, SendMessageOptions.DontRequireReceiver);

			//AudioSource.PlayClipAtPoint(sound, transform.position);
			Destroy(gameObject);
		}
	}

	// Update is called once per frame
	void Update () {
	
	}
}
