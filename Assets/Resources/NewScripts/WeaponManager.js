/**
*  Script written by OMA [www.armedunity.com]
**/


var weaponsInUse : GameObject[];					// used weapons, among which you can switch.
var weaponsInGame : GameObject[];					// all weapons, which could be used in game 
var worldModels : Rigidbody[]; 						// just a prefab which could be instantiated when you drop weapon

	var hit : RaycastHit;
	var distance : float = 2.0;
	var layerMaskWeapon : LayerMask;
	var layerMaskAmmo : LayerMask;
	
	var dropPosition : Transform;
	
	var switchWeaponTime : float = 0.5;
	@HideInInspector
	var canSwitch : boolean = true;
	@HideInInspector
	var showWepGui : boolean = false;
	@HideInInspector
	var showAmmoGui : boolean = false;
	private var equipped : boolean = false;
	private var zooming : boolean = true;
	//@HideInInspector
	//var i : int = 0;
	//@HideInInspector
	var weaponToSelect : int;
	//@HideInInspector
	var setElement : int;
	//@HideInInspector
	var weaponToDrop : int;
	var mySkin : GUISkin;
	var pickupSound : AudioClip;
	private var textFromPickupScript : String = "";
	private var notes : String = "";
	private var note : String = "Press key <E> to pick up Ammo";
	private var note2 : String = "Select appropriate weapon to pick up ammo";
function Awake (){
SelectSniper();

}
function Start (){
	weaponToSelect = 0;
	DeselectWeapon();
}

function SelectSniper()	{
	//Debug.Log("Refile selecr");
	if (weaponsInUse.length >= 1 && canSwitch && weaponToSelect != 0) {
        DeselectWeapon();
		weaponToSelect = 0;
		
		PlayerPrefs.SetInt("weaponToSelect", 0);
		PlayerPrefs.Save();

	}

}

function SelectGun()	{
	//Debug.Log("Gun selecr");
	if (weaponsInUse.length >= 2 && canSwitch && weaponToSelect != 1) {
		DeselectWeapon();
		weaponToSelect = 1;
		
		PlayerPrefs.SetInt("weaponToSelect", 1);
		PlayerPrefs.Save();

	}

}

function SelectScarenew()	{
	//Debug.Log("scarenew selecr");
	 if (weaponsInUse.length >= 3 && canSwitch && weaponToSelect != 2) {
		DeselectWeapon();
		weaponToSelect = 2;
		
		PlayerPrefs.SetInt("weaponToSelect", 2);
		PlayerPrefs.Save();
	}
}

function zoomgun(){
	//for sniper
	if (weaponToSelect == 0 && zooming) {
		var sniperZoomin : SniperScript = weaponsInGame[1].gameObject.transform.GetComponent("SniperScript");
		if(sniperZoomin.active){
			sniperZoomin.sniperzoomin();
			zooming = false;
			}
	}
	else
		{
		var sniperZoomout : SniperScript = weaponsInGame[1].gameObject.transform.GetComponent("SniperScript");
		if(sniperZoomout.active){
			sniperZoomout.sniperzoomout();
			zooming = true;
			}
		
		}
		
	//for GUN
	if (weaponToSelect == 1 && zooming) {
		var Gunzoomin : ShotGunScriptNEW = weaponsInGame[5].gameObject.transform.GetComponent("ShotGunScriptNEW");
			if(Gunzoomin.active){
			Gunzoomin.gunzoomin();
			zooming = false;
			}
		}else
			{
			var Gunzoomout : ShotGunScriptNEW = weaponsInGame[5].gameObject.transform.GetComponent("ShotGunScriptNEW");
			if(Gunzoomout.active){
			Gunzoomout.gunzoomout();
			zooming = true;
			}	
		}
		
	//for sniper2005
	if (weaponToSelect == 2 && zooming) {
		var SniperZoomin : SniperScarenewScript = weaponsInGame[2].gameObject.transform.GetComponent("SniperScarenewScript");
		if(SniperZoomin.active){
			SniperZoomin.sniperzoomin();
			zooming = false;
			}
	}
	else
		{
		var SniperZoomout : SniperScarenewScript = weaponsInGame[2].gameObject.transform.GetComponent("SniperScarenewScript");
		if(SniperZoomout.active){
			SniperZoomout.sniperzoomout();
			zooming = true;
			}
		
		}
		
		
}



function onenemy(){
	//for sniper
	if (weaponToSelect == 0) {
		var mmSniper : SniperScript = weaponsInGame[1].gameObject.transform.GetComponent("SniperScript");
		if(mmSniper.active){
			mmSniper.fireSniper();
			}
		}
		
	//for GUN
	if (weaponToSelect == 1) {
		var shotGun : ShotGunScriptNEW = weaponsInGame[5].gameObject.transform.GetComponent("ShotGunScriptNEW");
			if(shotGun.active){
			shotGun.FireShotgun();
			}
		}
		//for scarenew gun
	if (weaponToSelect == 2) {
		var scarenew : SniperScarenewScript = weaponsInGame[2].gameObject.transform.GetComponent("SniperScarenewScript");
			if(scarenew.active){
			scarenew.fireSniper();
			}
		}
	
	}
function Update () {

	if (Input.GetKeyDown("1") && weaponsInUse.length >= 1 && canSwitch && weaponToSelect != 0) {
        DeselectWeapon();
		weaponToSelect = 0;

	} else if (Input.GetKeyDown("2") && weaponsInUse.length >= 2 && canSwitch && weaponToSelect != 1) {
		DeselectWeapon();
		weaponToSelect = 1;

	} else if (Input.GetKeyDown("3") && weaponsInUse.length >= 3 && canSwitch && weaponToSelect != 2) {
		DeselectWeapon();
		weaponToSelect = 2;

	}
	
	if (Input.GetAxis("Mouse ScrollWheel") > 0 && canSwitch){
		    weaponToSelect++;
		if (weaponToSelect > (weaponsInUse.length - 1)){
		    weaponToSelect = 0;
		}
		DeselectWeapon();
	}
	
	if (Input.GetAxis("Mouse ScrollWheel") < 0 && canSwitch){
		weaponToSelect--;
		if (weaponToSelect < 0){
			weaponToSelect = weaponsInUse.length - 1;
		}
		DeselectWeapon();
	}
	
	var position = transform.parent.position;
	var direction : Vector3 = transform.TransformDirection (Vector3.forward);
	if (Physics.Raycast (position, direction, hit, distance, layerMaskWeapon.value)){

		var prefab : WeaponIndex = hit.transform.GetComponent("WeaponIndex");
		setElement = prefab.setWeapon;
		showWepGui = true;
																											//if you want more than 2 weapons equip at the same time		
		if(weaponsInUse[0] != weaponsInGame[setElement] && weaponsInUse[1] != weaponsInGame[setElement]){ //&& weaponsInUse[2] != weaponsInGame[setElement] && weaponsInUse[3] != weaponsInGame[setElement]){
			equipped = false;
		}else{
			equipped = true;
		}
		
		if(canSwitch){
			if(!equipped && Input.GetKeyDown ("e")){
				DropWeapon(weaponToDrop);
				DeselectWeapon();
				weaponsInUse[weaponToSelect] = weaponsInGame[setElement];
					if(setElement == 8){
						var pickupGOW1 : Pickup = hit.transform.GetComponent("Pickup");
						//addStickGrenades(pickupGOW1.amount);
					}	
				Destroy(hit.collider.transform.parent.gameObject);
				
			}else{	
			
				if(setElement == 8){
					if(Input.GetKeyDown ("e")){
						var pickupGOW : Pickup = hit.transform.GetComponent("Pickup");
						//addStickGrenades(pickupGOW.amount);
						Destroy(hit.collider.transform.parent.gameObject);
					}
				}
			}			
		}
	
	}else{
		showWepGui = false;
	}
	
	if (Physics.Raycast (position, direction, hit, distance, layerMaskAmmo.value)){
		showAmmoGui = true;
		if(hit.transform.CompareTag("Ammo")){
			var pickupGO : Pickup = hit.transform.GetComponent("Pickup");
			
			//ammo for pistols, rifles 
			if (pickupGO.pickupType == PickupType.Magazines) {
				var mags : WeaponScriptNEW = weaponsInUse[weaponToSelect].gameObject.transform.GetComponent("WeaponScriptNEW");
				if(mags != null && mags.firstMode != fireMode.launcher){
					notes = "";
					textFromPickupScript = note;
					if(Input.GetKeyDown ("e")){
						if(mags.ammoMode == Ammo.Magazines){
							mags.magazines += pickupGO.amount;
						}else{
							mags.magazines += pickupGO.amount * mags.bulletsPerMag;
						}	
						audio.clip = pickupSound;
						audio.Play();	
						Destroy(hit.collider.gameObject);
					}	
				}else{
					textFromPickupScript = pickupGO.AmmoInfo;
					notes = note2;
				}
			}
			//ammo for Sniper rifle
			if (pickupGO.pickupType == PickupType.SniperMagazines) {
				var magsSniper : SniperScript = weaponsInUse[weaponToSelect].gameObject.transform.GetComponent("SniperScript");
				if(magsSniper != null){
					notes = "";
					textFromPickupScript = note;
					if(Input.GetKeyDown ("e")){
						magsSniper.magazines += pickupGO.amount;
						audio.clip = pickupSound;
						audio.Play();	
						Destroy(hit.collider.gameObject);
					}	
				}else{
					textFromPickupScript = pickupGO.AmmoInfo;
					notes = note2;
				}	
			}
			//ammo for weapon if second fireMode is luancher
			if (pickupGO.pickupType == PickupType.Projectiles) {
				var projectile : WeaponScriptNEW = weaponsInUse[weaponToSelect].gameObject.transform.GetComponent("WeaponScriptNEW");
				if(projectile != null && projectile.secondMode == fireMode.launcher){
					notes = "";
					textFromPickupScript = note;
					if(Input.GetKeyDown ("e")){
						projectile.projectiles += pickupGO.amount;
						audio.clip = pickupSound;
						audio.Play();	
						Destroy(hit.collider.gameObject);
					}	
				}else{
					textFromPickupScript = pickupGO.AmmoInfo;
					notes = note2;
				}
			}
			//ammo for rocket launcher
			if (pickupGO.pickupType == PickupType.Rockets) {
				var rockets : WeaponScriptNEW = weaponsInUse[weaponToSelect].gameObject.transform.GetComponent("WeaponScriptNEW");
				if(rockets != null && rockets.firstMode == fireMode.launcher){
					notes = "";
					textFromPickupScript = note;
					if(Input.GetKeyDown ("e")){
						rockets.projectiles += pickupGO.amount;
						rockets.EnableProjectileRenderer();
						audio.clip = pickupSound;
						audio.Play();	
						Destroy(hit.collider.gameObject);	
					}	
				}else{
					textFromPickupScript = pickupGO.AmmoInfo;
					notes = note2;
				}	
			}
			//ammo for shotgun
			if (pickupGO.pickupType == PickupType.Shells) {
				var bullets : ShotGunScriptNEW = weaponsInUse[weaponToSelect].gameObject.transform.GetComponent("ShotGunScriptNEW");
				if(bullets != null){
					notes = "";
					textFromPickupScript = note;
					
					if(Input.GetKeyDown ("e")){
						bullets.magazines += pickupGO.amount;
						audio.clip = pickupSound;
						audio.Play();	
						Destroy(hit.collider.gameObject);
					}
				}else{
					textFromPickupScript = pickupGO.AmmoInfo;
					notes = note2;
				}
			}
			//pickup health
			if (pickupGO.pickupType == PickupType.Health) {
				textFromPickupScript = pickupGO.AmmoInfo;
				notes = "";
				if(Input.GetKeyDown ("e")){
					var playerGO = GameObject.Find("Player"); 
					var health : PlayerDamageNew = playerGO.gameObject.transform.GetComponent("PlayerDamageNew");
					health.hitPoints += pickupGO.amount;
					audio.clip = pickupSound;
					audio.Play(); 	
					Destroy(hit.collider.gameObject);
				}
			}
		}	
	
	}else{
		showAmmoGui = false;
	}	
}

/*function addStickGrenades(amount : int){
	yield WaitForSeconds(.5);
	var stickGrenade : GrenadeScript = weaponsInGame[8].gameObject.transform.GetComponent("GrenadeScript");
	stickGrenade.grenadeCount += amount;
	stickGrenade.DrawWeapon();
}
*/
function OnGUI(){
	GUI.skin = mySkin;
	var style1 = mySkin.customStyles[0];
	if(showWepGui){
		if(!equipped){
			GUI.Label(Rect(Screen.width - (Screen.width/1.7),Screen.height - (Screen.height/1.4),800,100),"Press key << E >> to pickup weapon", style1);
		}else{	
			GUI.Label(Rect(Screen.width - (Screen.width/1.7),Screen.height - (Screen.height/1.4),800,100),"Weapon is already equipped");
		}
	}

	if(showAmmoGui){
		GUI.Label(Rect(Screen.width - (Screen.width/1.7),Screen.height - (Screen.height/1.4),800,200), notes + "\n" + textFromPickupScript, style1);
	}	
}

function DeselectWeapon(){
	//Dectivate all weapon
	for (var i : int = 0; i < weaponsInUse.length; i++){
		weaponsInUse[i].gameObject.SendMessage("Deselect", SendMessageOptions.DontRequireReceiver);
		var deactivate : Component[] = weaponsInUse[i].gameObject.GetComponentsInChildren(MonoBehaviour);
		for (var d in deactivate) {
			var dd : MonoBehaviour = d as MonoBehaviour;
			if (dd)
			dd.enabled = false;
		}
		weaponsInUse[i].gameObject.SetActiveRecursively(false);
	}
	Wait();
}

function Wait(){
	canSwitch = false;
	yield WaitForSeconds(switchWeaponTime);
	SelectWeapon(weaponToSelect);
	yield WaitForSeconds(switchWeaponTime);
	canSwitch = true;
}

function SelectWeapon (i : int) {
	//Activate selected weapon
	weaponsInUse[i].gameObject.SetActiveRecursively(true);
	var activate : Component[] = weaponsInUse[i].gameObject.GetComponentsInChildren(MonoBehaviour);
	for (var a in activate) {
		var aa : MonoBehaviour = a as MonoBehaviour;
		if (aa)
		aa.enabled = true;
	}
	weaponsInUse[i].gameObject.SendMessage("DrawWeapon");
	var temp : WeaponIndex = weaponsInUse[i].gameObject.transform.GetComponent("WeaponIndex");
	weaponToDrop = temp.setWeapon;
}

function DropWeapon(index : int){
	
	for (var i : int = 0; i < worldModels.length; i++){
		if (i == index){
			var drop : Rigidbody = Instantiate(worldModels[i], dropPosition.transform.position, dropPosition.transform.rotation);
			drop.AddRelativeForce(0,50,Random.Range(100, 200));
		}
	}
					
}	