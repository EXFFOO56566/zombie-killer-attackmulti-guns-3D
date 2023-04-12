#pragma strict
 
var drawCrosshair = true;
 var fwd : Vector3;
 var cam  : Camera;
 var  OutHit : RaycastHit;
//var crosshairColor = Color.white;   //The crosshair color
 var crosshairColor = Color.cyan;
var width : float = 3;      //Crosshair width
var height : float = 35;     //Crosshair height
 
class spreading{
    var spread = 20.0;          //Adjust this for a bigger or smaller crosshair
    var maxSpread = 60.0;
    var minSpread = 20.0;
    var spreadPerSecond = 30.0;
    var decreasePerSecond = 25.0;
}
 
var spread : spreading;
var weaponManager : WeaponManager;
 
private var tex : Texture2D;
 
private var lineStyle : GUIStyle;
 
function Awake (){
//cam = Camera as GameObject;
fwd = transform.TransformDirection(Vector3.forward);
    tex = Texture2D(1,1);
 
    SetColor(tex, crosshairColor); //Set color
 
    lineStyle = GUIStyle();
    lineStyle.normal.background = tex;
}

function Start(){	
	weaponManager = gameObject.Find("WeaponManager").GetComponent("WeaponManager");
}

 
function Update (){
var hit : RaycastHit;
var fwd = transform.TransformDirection (Vector3.forward);
		if (Physics.Raycast (transform.position, fwd, hit)) {
//		print(hit.collider.tag);
		if(hit.collider.tag == "Enemy" ){
		crosshairColor = Color.red;
		 SetColor(tex, crosshairColor); 
		 
		weaponManager.onenemy();
//     print("Red");
 }else{
 crosshairColor = Color.cyan;
  SetColor(tex, crosshairColor); 
    // print("White");
 }
			var distanceToGround = hit.distance;
		}

/* var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
	var hit : RaycastHit;
	if (Physics.Raycast (ray, hit, 100)) {
		Debug.DrawLine (ray.origin, hit.point);
		print("hit.collider.tag"+hit.collider.tag);
		if(hit.collider.tag == "Enemy"){
     print("Red");
 }else{
     print("White");
 }
	}*/
/*if (Physics.Raycast(cam.transform.position, fwd, OutHit)){
//print("ColorRed");
print("OutHit"+OutHit);
//print("OutHit.transform.tag"+OutHit.transform.tag);
  if(OutHit.transform.tag == "Enemy"){
  print("InnerRed");
 //crosshair01.guiTexture.color = Color(1,0,0,0.5);
 }
 
 else{
 //crosshair01.guiTexture.color = Color(1,1,1,0.5);
 print("ColorWhite");
 }
 }*/
    if(Input.GetButton("Fire1")){
        spread.spread += spread.spreadPerSecond * Time.deltaTime;       //Incremente the spread
        Fire();
    }else{
        spread.spread -= spread.decreasePerSecond * Time.deltaTime;      //Decrement the spread        
    }
 
    spread.spread = Mathf.Clamp(spread.spread, spread.minSpread, spread.maxSpread);  
}
 
function OnGUI (){
    var centerPoint = Vector2(Screen.width / 2.0, Screen.height / 2.0);
 
    if(drawCrosshair){
        GUI.Box(Rect(centerPoint.x - width / 2, centerPoint.y - (height + spread.spread), width, height), "", lineStyle);
        GUI.Box(Rect(centerPoint.x - width / 2, centerPoint.y + spread.spread, width, height), "", lineStyle);
        GUI.Box(Rect(centerPoint.x + spread.spread, (centerPoint.y - width / 2), height , width), "", lineStyle);
        GUI.Box(Rect(centerPoint.x - (height + spread.spread), (centerPoint.y - width / 2), height , width), "", lineStyle);
    }   
}
 
function Fire(){
    //Carry out your normal shooting and stuff
}
 
    //Applies color to the crosshair
function SetColor(myTexture : Texture2D, myColor : Color){
    for (var y : int = 0; y < myTexture.height; ++y){
        for (var x : int = 0; x < myTexture.width; ++x){
            myTexture.SetPixel(x, y, myColor);
        }
    }
 
    myTexture.Apply();
}