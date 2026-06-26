uniform float uTime;
uniform float uTimeFrequency;
uniform float uPositionFrequency;
uniform float uStrength;
uniform float uWrapedTimeFrequency;
uniform float uWrapedPositionFrequency;
uniform float uWrapedStrength;

attribute vec4 tangent;

varying float vWobble;

#include ../includes/simplexNoise4d.glsl

float getWobble(vec3 position)
{
    vec3 wrapedPosition = position;
    wrapedPosition += simplexNoise4d(vec4(
        position * uWrapedPositionFrequency,
        uTime * uWrapedTimeFrequency
    )) * uWrapedStrength;

    return simplexNoise4d(vec4(
        wrapedPosition * uPositionFrequency,      // XYZ
        uTime * uTimeFrequency              // W
    )) * uStrength;
}

void main()
{
    vec3 biTangent = cross(normal, tangent.xyz);

    // Neighbours position
    float shift = 0.01;
    vec3 positionA = csm_Position + tangent.xyz * shift;
    vec3 positionB = csm_Position + biTangent * shift;

    // Wobble
    float wobble = getWobble(csm_Position);
    csm_Position += wobble * normal;
    positionA    += getWobble(positionA) * normal;
    positionB    += getWobble(positionB) * normal;

    // Compute normal
    vec3 toA = normalize(positionA - csm_Position);
    vec3 toB = normalize(positionB - csm_Position);
    csm_Normal = cross(toA, toB);

    // Varyings
    vWobble = wobble / uStrength;
}