module.exports={
    configureWebpack:{
        resolve:{
            alias:{
                'assets':'@/assets' ,
                'network':'@/network' ,
                'utils':'@/utils' ,
                'components':'@/components' ,
                'views':'@/views' 
            }
        }
    },
    publicPath: './'
}