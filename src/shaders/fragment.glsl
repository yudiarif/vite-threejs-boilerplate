uniform float uTime;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
	gl_FragColor = vec4(vUv,0.0, 1.0);
}