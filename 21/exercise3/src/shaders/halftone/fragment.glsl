uniform vec3 uColor;
uniform vec2 uResolution;
uniform float uShadowRepetition;
uniform vec3 uShadowColor;
uniform float uLightRepetition;
uniform vec3 uLightColor;

varying vec3 vNormal;
varying vec3 vPosition;

#include ../includes/ambientLight.glsl
#include ../includes/directionalLight.glsl

vec3 halftone(
    vec3 color,
    float repetition,
    vec3 direction,
    float low,
    float high,
    vec3 pointColor,
    vec3 normal
)
{
    float intensity = dot(normal, direction);
    intensity = smoothstep(low, high, intensity);

    vec2 uv = gl_FragCoord.xy / uResolution.y;
    uv *= repetition;
    uv = mod(uv, 1.0);

    float point = distance(uv, vec2(0.5));
    point = 1.0 - step(0.5 * intensity, point);

    return mix(color, pointColor, point);
}

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = uColor;

    // Light
    vec3 light = vec3(0.0);

    light += ambientLight(
        vec3(1.0),                  // Light color
        1.0                         // Light intensity
    );

    light += directionalLight(
        vec3(1.0, 1.0, 1.0),
        1.0,
        normal,
        vec3(1.0, 1.0, 0.0),
        viewDirection,
        1.0
    );
    
    color *= light;

    // Halftone Shadow
    color = halftone(
        color,
        uShadowRepetition,
        vec3(0.0, -1.0, 0.0),
        - 0.8,
        1.5,
        uShadowColor,
        normal
    );

    // Halftone Light
    color = halftone(
        color,
        uLightRepetition,
        vec3(1.0, 1.0, 0.0),
        0.5,
        1.5,
        uLightColor,
        normal
    );

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}