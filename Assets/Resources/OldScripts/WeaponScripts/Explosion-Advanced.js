var explosionRadius = 5.0;
var explosionPower = 10.0;
var explosionDamage = 100.0;
var explosionTimeout = 2.0;
var destryObject : boolean = true;
var explosionSounds : AudioClip[];

function Start () {
	PlaySounds();
	var explosionPosition = transform.position;

	// Apply damage to close by objects first
	var colliders : Collider[] = Physics.OverlapSphere (explosionPosition, explosionRadius);
	for (var hit in colliders) {
		// Calculate distance from the explosion position to the closest point on the collider
		var closestPoint = hit.ClosestPointOnBounds(explosionPosition);
		var distance = Vector3.Distance(closestPoint, explosionPosition);

		// The hit points we apply fall decrease with distance from the explosion point
		var hitPoints = 1.0 - Mathf.Clamp01(distance / explosionRadius);
		hitPoints *= explosionDamage;

		// Tell the rigidbody or any other script attached to the hit object how much damage is to be applied!
		hit.SendMessageUpwards("ApplyDamage", hitPoints, SendMessageOptions.DontRequireReceiver);
		hit.SendMessageUpwards("PlayerDamage", hitPoints, SendMessageOptions.DontRequireReceiver);
		hit.SendMessageUpwards("Exploasion", hitPoints, SendMessageOptions.DontRequireReceiver);
	}

	// Apply explosion forces to all rigidbodies
	// This needs to be in two steps for ragdolls to work correctly.
	// (Enemies are first turned into ragdolls with ApplyDamage then we apply forces to all the spawned body parts)
	colliders = Physics.OverlapSphere (explosionPosition, explosionRadius);
	for (var hit in colliders) {
		if (hit.rigidbody)
			hit.rigidbody.AddExplosionForce(explosionPower, explosionPosition, explosionRadius, 3.0);
	}
	
	// stop emitting particles
	if (particleEmitter) {
        particleEmitter.emit = true;
		yield WaitForSeconds(0.5);
		particleEmitter.emit = false;
    }
	
    // destroy the explosion after a while
	if(audio && explosionSounds.length > 0){
		yield WaitForSeconds(audio.clip.length);
		Destroy (gameObject);
	}else{
		if(destryObject)
		Destroy (gameObject, explosionTimeout);
	}
}

function ApplyForce (body : Rigidbody) {
	yield WaitForSeconds (.4);
	var direction = body.transform.position - transform.position;
	body.AddForceAtPosition(direction.normalized, transform.position);
}

function PlaySounds () {
	if(explosionSounds.length > 0){
		audio.clip = explosionSounds[Random.Range(0, explosionSounds.length)];
		audio.Play();
	}
}	