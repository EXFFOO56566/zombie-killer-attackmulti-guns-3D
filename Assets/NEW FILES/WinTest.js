#pragma strict

 public var levelToUnlockForTest : int = 0;

 

function Update()
{

    PlayerPrefs.SetInt("SavedLevel", levelToUnlockForTest);

} 