///////////////////////////////////////////////////////////////////////
//                                                   41 Post                                       //
// Created by DimasTheDriver in May/12/2011                                      //
// Part of 'Unity: Scaling the GUI based on the screen resolution' post. //
// Available at:      http://www.41post.com/?p=3816                             //
/////////////////////////////////////////////////////////////////////

//a GUISkin object to draw the GUI image
public var guiSkin:GUISkin;

//the GUI scale ratio
private var guiRatio:float;

//the screen width
private var sWidth:float;

//A vector3 that will be created using the scale ratio
private var GUIsF:Vector3;
	
//At initialization
function Awake()
{
	//get the screen's width
	sWidth = Screen.width;
	//calculate the rescale ratio
	guiRatio = sWidth/1920;
	//create a rescale Vector3 with the above ratio
	GUIsF = new Vector3(guiRatio,guiRatio,1);
}
	
//Draws GUI elements
function OnGUI() 
{
	//scale and position the GUI element to draw it at the screen's top left corner
	GUI.matrix = Matrix4x4.TRS(new Vector3(GUIsF.x,GUIsF.y,0),Quaternion.identity,GUIsF);
	//draw GUI on the top left
	GUI.Label(new Rect(20,20,258,89),"",guiSkin.customStyles[0]);
	
	//scale and position the GUI element to draw it at the screen's bottom right corner
	GUI.matrix = Matrix4x4.TRS(new Vector3(Screen.width - 258*GUIsF.x,Screen.height - 89*GUIsF.y,0),Quaternion.identity,GUIsF);
	//draw GUI on the bottom right
	GUI.Label(new Rect(-20,-20,258,89),"",guiSkin.customStyles[0]);	
		
	//scale and position the GUI element to draw it at the screen's bottom left corner
	GUI.matrix = Matrix4x4.TRS(new Vector3(GUIsF.x,Screen.height - 89*GUIsF.y,0),Quaternion.identity,GUIsF);
	//draw GUI on the bottom left
	GUI.Label(new Rect(20,-20,258,89),"",guiSkin.customStyles[0]);
		
	//scale and position the GUI element to draw it at the screen's top right corner
	GUI.matrix = Matrix4x4.TRS(new Vector3(Screen.width - 258*GUIsF.x,GUIsF.y,0),Quaternion.identity,GUIsF);
	//draw GUI on the top right
	GUI.Label(new Rect(-20,20,258,89),"",guiSkin.customStyles[0]);
}

