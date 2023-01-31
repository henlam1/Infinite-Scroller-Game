precision mediump float;

varying vec4 v_Position;
uniform vec4 circle_Color;

/** 
 *  The size of the quad is 1.00, so the radius of the circle will
 *  always be a constant 0.50.
 */
#define RADIUS 0.50

#define MIN_DISTANCE 0.00
#define MAX_DISTANCE 1.00

/** 
 *  This function calculates the alpha value for the bubbles fragment
 *  color. The alpha value depends on the vertex fragment. 
 *  
 *  @param position - the position of the vertex fragment (v_Position)
 *  @param radius - the radius of the circle
 *  @return - the alpha value of the fragment shader for the given vertex fragment
 */
float bubble_alpha(vec4 position, float radius);

void main(){
	gl_FragColor = vec4(circle_Color);
	gl_FragColor.a = bubble_alpha(v_Position, RADIUS)*gl_FragColor.a;
}

float bubble_alpha(vec4 position, float radius) {
	float dist = distance(vec2(position.x, position.y), vec2(0.0, 0.0));
	if (dist < radius) {
		return smoothstep(MIN_DISTANCE, MAX_DISTANCE, dist);
	}
	return 0.0;
}