import app from './pixiapp'

const loader = app.loader;

const loadResourses = (callback: any)=>{
    console.log('loading resources...');
    app.loader
        .add('ground', 'assets/images/ground.png')
        .add('player', 'assets/images/player.png')
        .on('progress', ()=>{ //вызывается после каждого загруженного ресурса
            console.log(app.loader.progress + '%');
        })
        .load(callback);
}

export { loadResourses, loader as default }
