const path = require('path');

module.exports = (env)=>{
    const isProd = env === 'production';

    return {
        entry: './src/index.ts',
        devtool: ( !isProd ?'inline-source-map' : undefined),
        watch: !isProd,
        module: {
            rules: 
            [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: ['/node_modules', '/server/']
                }
            ]
        },
        mode: (isProd? env : 'development'),
        //порядок, в котором читать файлы
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'public')
        },
        devServer: {
            contentBase: path.join(__dirname, '/public/'),
            //для работы client-side routing'а нужно, чтобы сервер выдавал дефолтный index.html на любой запрос
            //и реакт уже сам соображала, что там рисовать по адрессной строке
            historyApiFallback: true,
            //говорю серву, где искать bundle
            //publicPath:'/dist/',
        },
    }
}