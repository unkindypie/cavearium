import System from "../System";
import EntityContainer from '../EntityContainer';
import * as planck from 'planck-js';

export default class ShiplikeMovementSystem extends System {

    rotateByTorque = (vec: planck.Vec2, body: planck.Body)=>{
        const desiredAngle = -Math.atan2(vec.x, vec.y);

        //чтобы нельзя было раскрутить кораблик слишком сильно
        if(body.getAngularVelocity() > 10){
            body.setAngularVelocity(10);
        }
        if(body.getAngularVelocity() < -10){
            body.setAngularVelocity(-10);
        }

        const nextAngle = body.getAngle() + body.getAngularVelocity() / 3.5;
        let totalRotation = desiredAngle - nextAngle;

        //поиск кратчайшего пути поворота к нужному углу (т.к. можно вертеться в другую сторону и это будет дольше)
        //т.е. если мы хотим повернуться больше, чем на 180 мы переносимся в другую половинку и теперь можно вернутся на меньшее значение
        while ( totalRotation < -180 * .0174533 ) totalRotation += 360 * .0174533;
        while ( totalRotation >  180 * .0174533 ) totalRotation -= 360 * .0174533;

        body.applyTorque( totalRotation < 0 ? -15 : 15 );
    }

    public update(container: EntityContainer): void {
        if(container.constructor.name === 'Tilemap') return;

        for(let id_ in container.component('Shiplike')){
            const id = parseInt(id_);
            if(container.component('DymanicBody')[id]){
                this.rotateByTorque(container.component('Shiplike')[id].desiredAngleVector, container.component('DymanicBody')[id].body);
            }
        }
    }
}