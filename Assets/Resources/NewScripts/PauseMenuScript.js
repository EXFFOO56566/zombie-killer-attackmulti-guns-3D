#pragma strict
//@script ExecuteInEditMode()
// script from     http://forum.unity3d.com/threads/74127-UnifyCommunity-PauseMenu


var skin:GUISkin;
private var gldepth = -0.5;
private var startTime = 0.1;
var nativeVerticalResolution = 1200.0;
var scaledResolutionWidth = nativeVerticalResolution / Screen.height * Screen.width;
var mat:Material;
private var tris = 0;
private var verts = 0;
private var savedTimeScale:float;
private var pauseFilter;
private var showfps:boolean;
private var showtris:boolean;
private var showvtx:boolean;
private var showfpsgraph:boolean;
var lowFPSColor = Color.red;
var highFPSColor = Color.green;
var lowFPS = 30;
var highFPS = 50;
//var start : GameObject;
var url = "WebPlayer.html";
var statColor:Color = Color.yellow;
var GuiColor:Color = Color.white;

var credits:String[]=[

    "Credits:",

    "armedunity.com",

    "bbb",

    "aaa"] ;

var crediticons:Texture[];

enum Page { None,Main,Options,Credits }

var currentPage:Page;
private var fpsarray:int[];
private var fps:float;

 

function Start() {

    fpsarray = new int[scaledResolutionWidth];
    Time.timeScale = 1.0;
    PauseGame();
}

 

function OnPostRender() {

    if (showfpsgraph && mat != null) {

        GL.PushMatrix ();

        GL.LoadPixelMatrix();

        for (var i = 0; i < mat.passCount; ++i)

        {

            mat.SetPass(i);

            GL.Begin( GL.LINES );

            for (var x=0; x<fpsarray.length; ++x) {

                GL.Vertex3(x,fpsarray[x],gldepth);

            }

        GL.End();

        }

        GL.PopMatrix();
        ScrollFPS();
    }
}

 

function ScrollFPS() {

    for (var x=1; x<fpsarray.length; ++x) {
        fpsarray[x-1]=fpsarray[x];
    }

    if (fps < 1000) {
        fpsarray[fpsarray.length-1] = fps;
    }
}

 

static function IsDashboard() {

    return Application.platform == RuntimePlatform.OSXDashboardPlayer;

}

 

static function IsBrowser() {

    return (Application.platform == RuntimePlatform.WindowsWebPlayer || Application.platform == RuntimePlatform.OSXWebPlayer);

}

 

function LateUpdate () {

    if (showfps || showfpsgraph) {
        FPSUpdate();
    }

    if (Input.GetKeyDown("escape")) {

        switch (currentPage) {

            case Page.None: PauseGame(); break;

            //case Page.Main: UnPauseGame(); break;

            default: currentPage = Page.Main;

        }
    }
}

 

function OnGUI () {

    if (skin != null) {
        GUI.skin = skin;
    }

    //Our GUI is laid out for a 1920 x 1200 pixel display (16:10 aspect). The next line makes sure it rescales nicely to other resolutions.
    GUI.matrix = Matrix4x4.TRS (Vector3(0, 0, 0), Quaternion.identity, Vector3 (Screen.height / nativeVerticalResolution, Screen.height / nativeVerticalResolution, 1)); 

    ShowStatNums();

    if (IsGamePaused()) {
        GUI.color = GuiColor;

        switch (currentPage) {
            case Page.Main: PauseMenu(); break;

            case Page.Options: ShowToolbar(); break;

            case Page.Credits: ShowCredits(); break;
	
        }
    }   
}


private var toolbarInt:int=0;
private var toolbarStrings: String[]= ["Audio","Graphics","Stats","System"];


function ShowToolbar() {

    BeginPage(800,250);
    toolbarInt = GUILayout.Toolbar (toolbarInt, toolbarStrings);

    switch (toolbarInt) {

        case 0: VolumeControl(); break;

        case 3: ShowDevice(); break;

        case 1: Qualities(); QualityControl(); break;

        case 2: StatControl(); break;
    }
    EndPage();
}

 

function ShowCredits() {

    BeginPage(600,600);

    for (var credit in credits) {
        GUILayout.Label(credit);
    }

    for (var credit in crediticons) {
        GUILayout.Label(credit);
    }

    EndPage();
}

 

function ShowBackButton() {

    if (GUI.Button(Rect(10,10,150,80),"Back")) {
        currentPage = Page.Main;
    }
}

 

 

function ShowDevice() {
	
    GUILayout.Label ("Unity player version "+Application.unityVersion);

    GUILayout.Label("Graphics: "+SystemInfo.graphicsDeviceName+" "+

    SystemInfo.graphicsMemorySize+"MB    "+

    SystemInfo.graphicsDeviceVersion+"   "+

    SystemInfo.graphicsDeviceVendor);

    GUILayout.Label("Shadows: "+SystemInfo.supportsShadows);

    GUILayout.Label("Image Effects: "+SystemInfo.supportsImageEffects);

    GUILayout.Label("Render Textures: "+SystemInfo.supportsRenderTextures);
	

}

 

function Qualities() {

    switch (QualitySettings.currentLevel) {

        case QualityLevel.Fastest:

        GUILayout.Label("Fastest");

        break;

        case QualityLevel.Fast:

        GUILayout.Label("Fast");

        break;

        case QualityLevel.Simple:

        GUILayout.Label("Simple");

        break;

        case QualityLevel.Good:

        GUILayout.Label("Good");

        break;

        case QualityLevel.Beautiful:

        GUILayout.Label("Beautiful");

        break;

        case QualityLevel.Fantastic:

        GUILayout.Label("Fantastic");

        break;
    }
}

 

function QualityControl() {

    GUILayout.BeginHorizontal();

    if (GUILayout.Button("Decrease")) {
        QualitySettings.DecreaseLevel();
    }

    if (GUILayout.Button("Increase")) {
        QualitySettings.IncreaseLevel();
    }
    GUILayout.EndHorizontal();
}

function VolumeControl() {

    GUILayout.Label("Volume");
    AudioListener.volume = GUILayout.HorizontalSlider(AudioListener.volume,0.0,1.0);
}

function StatControl() {

    GUILayout.BeginHorizontal();
    showfps = GUILayout.Toggle(showfps,"FPS");
    showtris = GUILayout.Toggle(showtris,"Triangles");
    showvtx = GUILayout.Toggle(showvtx,"Vertices");
    showfpsgraph = GUILayout.Toggle(showfpsgraph,"FPS Graph");
    GUILayout.EndHorizontal();
}

function FPSUpdate() {

    var delta = Time.smoothDeltaTime;
    if (!IsGamePaused() && delta !=0.0) {
        fps = 1 / delta;
    }
}

function ShowStatNums() {

    GUILayout.BeginArea(Rect(scaledResolutionWidth-200,20,scaledResolutionWidth/4,nativeVerticalResolution/4));

    if (showfps) {
        var fpsString= fps.ToString ("#,##0 fps");
        GUI.color = Color.Lerp(lowFPSColor, highFPSColor,(fps-lowFPS)/(highFPS-lowFPS));
        GUILayout.Label (fpsString);
    }

    if (showtris || showvtx) {
        GetObjectStats();
        GUI.color = statColor;
    }

    if (showtris) {
        GUILayout.Label (tris+"tri");
    }
    if (showvtx) {
        GUILayout.Label (verts+"vtx");
    }
    GUILayout.EndArea();
}

 //function BeginPage(width,height) {

function BeginPage(width : int, height : int) {
    scaledResolutionWidth = nativeVerticalResolution / Screen.height * Screen.width;
    GUILayout.BeginArea(Rect(scaledResolutionWidth/2 - (width/2), nativeVerticalResolution/2 - (height/2),width,height));
}

 

function EndPage() {

    GUILayout.EndArea();
    if (currentPage != Page.Main) {
        ShowBackButton();
    }
}

 

/*function IsBeginning() {

    return Time.time < startTime;

}*/

 

 

function PauseMenu() {

    BeginPage(500,300);
	
    if (GUILayout.Button ("Continue")) {
        UnPauseGame();
    }

    if (GUILayout.Button ("Options")) {
        currentPage = Page.Options;
    }

    if (GUILayout.Button ("Credits")) {
        currentPage = Page.Credits;
    }

    if (IsBrowser() && GUILayout.Button ("Restart")) {
        Application.OpenURL(url);
    }

    EndPage();
}

 

function GetObjectStats() {

    verts = 0;
    tris = 0;
    var ob = FindObjectsOfType(GameObject);
    for (var obj in ob) {
        GetObjectStats(obj);

    }
}



function GetObjectStats (object : GameObject) { // All variables must be declared properly
    var filters = object.GetComponentsInChildren.<MeshFilter>();
    for (var f : MeshFilter in filters) {
    tris += f.sharedMesh.triangles.Length/3;
    verts += f.sharedMesh.vertexCount;
    }
}


 

function PauseGame() {

    savedTimeScale = Time.timeScale;

    Time.timeScale = 0;

    AudioListener.pause = true;

   // if (pauseFilter) pauseFilter.enabled = true;

    currentPage = Page.Main;
	
	transform.position = new Vector3(0, 1, 0);
	Screen.lockCursor = false;
}

 

function UnPauseGame() {

    Time.timeScale = savedTimeScale;

    AudioListener.pause = false;

    //if (pauseFilter) pauseFilter.enabled = false;

    currentPage = Page.None;

	transform.position = Vector3.zero;
	Screen.lockCursor = true;
}

 

function IsGamePaused() {
    return Time.timeScale == 0;
}

 

function OnApplicationPause(pause:boolean) {

    if (IsGamePaused()) {
        AudioListener.pause = true;
    }
}