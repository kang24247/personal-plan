// 这个时候在引入图片的地方会报：找不到模块“./assets/imgs/22kb.png”\
// 或其相应的类型声明，需要添加一个图片的声明文件
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module '*.less'
declare module '*.css'