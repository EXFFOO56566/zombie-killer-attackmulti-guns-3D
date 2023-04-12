var lookAtCamera : Camera ; 

function Update (){
    var v: Vector3  = lookAtCamera.transform.position  - transform.position ;
    v.x = v.z = 0.0;
    transform.LookAt (lookAtCamera.transform.position  - v);
}