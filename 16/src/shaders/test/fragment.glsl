precision mediump float;

uniform sampler2D uTexture;

varying float vElevation;
varying vec2 vUv;

void main() {
    vec4 textureColor = texture2D(uTexture, vUv);

    if(textureColor.r < 0.1 && textureColor.g < 0.1 && textureColor.b < 0.5) {
        discard;
    }

    textureColor.rgb *= vElevation * 2.0 + 0.5;


    gl_FragColor = textureColor;
}