uniform vec3 uHeightColor;
uniform vec3 uDepthColor;

varying float vElevation;

void main() {
    vec3 color = mix(uHeightColor, uDepthColor, vElevation * 2.0 + 0.5);

    gl_FragColor = vec4(color, 1.0);
}