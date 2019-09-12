import app from './pixiapp'

const loader = app.loader;

const loadResourses = (callback: any)=>{
    app.loader.add('ground', 'assets/images/ground.png')
        .load(callback);
}

export { loadResourses, loader as default }
