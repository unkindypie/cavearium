import { Vec2 } from 'planck-js';

//value for scaling pixels to box2d metric system
export let scalar = 0.016; //32 pixels ~= 0.5 meters
export let pHeight = 920; 

export const setScreenHeight = (height: number)=>{
    pHeight = height;
}

export const xToWorld = (xp: number): number=>{
    return xp * scalar;
}
export const xToScreen = (xm: number): number =>{
    return xm / scalar;
}

export const yToWorld = (yp: number): number =>{
    return (pHeight - yp) * scalar;
}
export const yToScreen = (ym: number): number =>{
    return pHeight - ym / scalar;
}

export const toWorld = (xp: number, yp: number): planck.Vec2 => {
    return Vec2(xToWorld(xp), yToWorld(yp))
}

export const toScreen = (vector: planck.Vec2) => {
    return {x: xToScreen(vector.x), y: yToScreen(vector.y)}
}
/*
    вектор должен быть в box2d (чем выше, тем больше у), 
    TODO: возможно можно упростить, если не переворачивать вначале y
*/
export const vectorToB2Angle = (vector: planck.Vec2): number => {
    return -Math.atan2(vector.x, vector.y);
}

export const b2AngleToVector = (angle: number): planck.Vec2 => {
    return Vec2(-Math.sin(angle), Math.cos(angle));
}

//usfull math functions
export const lerp = (v0: number, v1: number, t: number): number => {
    return (1 - t) * v0 + t * v1;
}
